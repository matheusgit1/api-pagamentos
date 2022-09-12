import { Module, HttpServer } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishListEntity } from '../../infrastructure/orm/entities/wish-list.entity';
import { ProductsExcludedEntity } from '../../infrastructure/orm/entities/product-excluded.entity';
import { PurchasesEntity } from '../../infrastructure/orm/entities/purchases.entity';
import { JwtModule } from '@nestjs/jwt';
import { ORMService } from '../../infrastructure/orm/orm.service';
import { OrmModule } from '../../infrastructure/orm/orm.module';
import { JwtStrategy } from '../../infrastructure/jwt/jwt.strategy';
import { StripeModule, StripeOptions } from 'nestjs-stripe';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      WishListEntity,
      ProductsExcludedEntity,
      PurchasesEntity,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    OrmModule,
    StripeModule.forRootAsync({
      useFactory: (config: StripeOptions) => ({
        apiKey: process.env.STRIPE_SECRETE_KEY,
        apiVersion: '2022-08-01',
      }),
    }),
  ],
  providers: [PaymentsService, ORMService, JwtStrategy],
  controllers: [PaymentsController],
  exports: [PaymentsService, ORMService],
})
export class PaymentsModule {}
