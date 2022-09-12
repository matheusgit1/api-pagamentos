import { NotFoundException, BadRequestException } from '@nestjs/common';
import { WishListEntity } from './entities/wish-list.entity';
import { PurchasesEntity } from './entities/purchases.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ORMService {
  constructor(
    @InjectRepository(WishListEntity)
    private readonly ormServiceWishList: Repository<WishListEntity>,

    @InjectRepository(WishListEntity)
    private readonly ormServicePurchase: Repository<PurchasesEntity>,
  ) {}

  public async insertInWishList(
    productId: string,
    userId: string,
  ): Promise<void> {
    const sql = `
      insert into tb_wish_list (co_product_id, co_user_id) values($1,$2)
    `;
    const inWishList = await this.ormServiceWishList.query(sql, [
      productId,
      userId,
    ]);
    return inWishList;
  }

  public async removeFromWisListt(
    productId: string,
    userId: string,
  ): Promise<void> {
    const sql = `
      delete from tb_wish_list where co_product_id = $1 and co_user_id = $2
    `;
    await this.ormServiceWishList.query(sql, [productId, userId]);
    return;
  }

  public async insertOneInPurchase(
    purchase: {
      productId: string;
      installments: number;
      amount: number;
    },
    userId: string,
  ) {
    const product = await this.ormServiceWishList.query(
      'select * from tb_product where id = $1',
      [purchase.productId],
    );
    // return await this.ormServiceWishList.query('select * from tb_wish_list where co_user_id = $1',[userId])
    if (product.length === 0) {
      throw new NotFoundException('Produto não econtrado');
    }

    if (!product[0].co_is_product_active || product[0].co_product_stocks <= 0) {
      throw new BadRequestException(
        'Produto não está disponivel para comercialização ou sem estoques',
      );
    }

    if (+product[0].co_product_stocks - purchase.amount < 0) {
      throw new BadRequestException('Sem estoque para demanda');
    }

    const sql = `
      insert into tb_purchases (
        co_product_id,
        co_product_name,
        co_product_price,
        co_product_description,
        co_product_categories,
        co_product_main_categories,
        co_product_installments,
        co_produdct_installment_price,
        co_product_images,
        co_user_id,
        co_product_discount,
        co_product_marc,
        co_product_conditions,
        co_product_features,
        co_product_seller,
        co_product_seller_id,
        co_five_stars,
        co_four_stars,
        co_three_stars,
        co_two_stars,
        co_one_stars,
        co_zero_stars,
        co_purchase_total,
        co_purchase_amount
      ) values (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18,
        $19,
        $20,
        $21,
        $22,
        $23,
        $24
      )
    `;
    await this.ormServicePurchase.query(sql, [
      product[0].id,
      product[0]?.co_product_name,
      +product[0]?.co_product_price,
      product[0]?.co_product_description,
      product[0]?.co_product_categories,
      product[0]?.co_product_main_categories,
      3,
      79.66,
      product[0]?.co_product_images,
      userId,
      +product[0]?.co_product_discount,
      product[0]?.co_product_marc,
      product[0]?.co_product_conditions,
      JSON.stringify(product[0]?.co_product_features[0]),
      product[0]?.co_product_seller,
      product[0]?.co_user_id,
      product[0]?.co_five_stars,
      product[0]?.co_four_stars,
      product[0]?.co_three_stars,
      product[0]?.co_two_stars,
      product[0]?.co_one_stars,
      product[0]?.co_zero_stars,
      purchase.amount * +product[0]?.co_product_price,
      purchase.amount,
    ]);

    await this.ormServicePurchase.query(
      `
      update tb_product set co_product_stocks = (
        select tp.co_product_stocks
        from tb_product tp
        where tp.id = $1) - $2
      where id = $3
    `,
      [purchase.productId, purchase.amount, purchase.productId],
    );

    return;
  }

  public async createCreditCard(creditCardId: string, userID: string) {
    const newCreditCard = await this.ormServicePurchase.query(
      `
      insert into tb_credit_card (
        co_user_id,
        co_credit_card_id
        ) values (
          $1,
          $2
        )
      `,
      [userID, creditCardId],
    );

    return;
  }

  public async getUserById(userId: string) {
    const user = await this.ormServicePurchase.query(
      `
      select co_phone from tb_user where id = $1
    `,
      [userId],
    );
    return user[0];
  }

  public async getAdressById(userId, adressId) {
    const adress = await this.ormServicePurchase.query(
      `
      select * from tb_adress where co_user_id = $1 and id = $2
    `,
      [userId, adressId],
    );
    return adress[0];
  }

  //localiza informações de Produto
  public async getProductById(productId) {
    const product = await this.ormServicePurchase.query(
      `
      select * from tb_product where id = $1
    `,
      [productId],
    );
    return product[0];
  }

  public async registerSalle(body: {
    userId: string;
    productId: string;
    quantity: number;
    details: any;
  }) {
    await this.ormServicePurchase.query(
      `
      insert into tb_transactions (
        co_user_id,
        co_product_id,
        co_product_quatity,
        co_transaction_details
      ) values (
        $1,
        $2,
        $3,
        $4
      )
    `,
      [
        body.userId,
        body.productId,
        body.quantity,
        JSON.stringify(body.details),
      ],
    );

    return;
  }
}
