import {
  Injectable,
  HttpServer,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import Stripe from 'stripe';
import { JwtService } from '@nestjs/jwt';
import { ORMService } from '../../infrastructure/orm/orm.service';

@Injectable()
export class PaymentsService {
  customer: Stripe.Customer;
  public constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private jwtService: JwtService,
    private readonly ormService: ORMService,
  ) {}

  public async createPaymentMethod(body: CreatePaymentDto, token: string) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });

    //localiza informações de endereços
    const adress = await this.ormService.getAdressById(user.id, body.adressId);

    //localiza informações de Produto
    const product = await this.ormService.getProductById(body.productId);
    //localiza informações de usuario
    const authUser = await this.ormService.getUserById(user.id);

    const customer: Stripe.Customer = await this.stripeClient.customers.create({
      address: {
        city: adress.co_city,
        country: 'BR',
        line1: adress.co_street,
        line2: adress.co_ref,
        postal_code: adress.co_zip_code,
        state: adress.co_state + ' - ' + adress.co_uf,
      },
      name: user.username,
      email: user.email,
      shipping: {
        address: {
          city: adress.co_city,
          country: 'BR',
          line1: adress.co_street,
          line2: adress.co_ref,
          postal_code: adress.co_zip_code,
          state: adress.co_state + ' - ' + adress.co_uf,
        },
        name: user.username,
        phone: authUser.co_phone,
      },
      balance: Math.round(body.total), //em centavos
      cash_balance: {
        settings: {
          reconciliation_mode: 'automatic',
        },
      },
    });

    //cria efetivamente o metodo de pagamento
    const payment = await this.stripeClient.paymentMethods.create({
      type: 'card',
      card: {
        number: body.creditCard,
        exp_month: body.mouth,
        exp_year: body.expYear,
        cvc: String(body.cvc),
      },
      billing_details: {
        address: {
          city: adress.co_city,
          country: 'BR',
          line1: adress.co_street,
          line2: adress.co_ref,
          postal_code: adress.co_zip_code,
          state: adress.co_state + ' - ' + adress.co_uf,
        },
        name: user.username,
        email: user.email,
        phone: authUser.co_phone,
      },
    });

    await this.ormService.registerSalle({
      userId: user.id,
      productId: product.id,
      quantity: Math.round(body.total / +product.co_product_price),
      details: { customer, payment },
    });

    if (payment.id) {
      await this.ormService.createCreditCard(payment.id, user.id);
      return { customer, payment };
    }

    throw new UnprocessableEntityException('Requisição improcessável');
  }

  // public async createCard(body: CreatePaymentDto, token){
  //   const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
  //     secret: process.env.JWT_SECRET,
  //   });

  //   return await this.createPaymentMethod(body, user, token)
  // }
}
