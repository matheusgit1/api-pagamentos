import { Controller, Post, Body, UseGuards, Req, Delete } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../infrastructure/jwt/jwt-auth.guard';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('/v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create/payment')
  public async createPayment(
    @Body() body: CreatePaymentDto,
    @Req() req: Request,
  ) {
    return await this.paymentsService.createPaymentMethod(
      body,
      req.headers.authorization,
    );
  }
}
