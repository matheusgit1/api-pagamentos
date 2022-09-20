import { Module } from '@nestjs/common';
import { ORMService } from './orm.service';
import { DBClientConfig } from '../postgre.client';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishListEntity } from './entities/wish-list.entity';
import { ProductsExcludedEntity } from './entities/product-excluded.entity';
import { PurchasesEntity } from './entities/purchases.entity';
import { CreditCardEntity } from './entities/credit-cards.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync(DBClientConfig),
    TypeOrmModule.forFeature([
      WishListEntity,
      ProductsExcludedEntity,
      PurchasesEntity,
      CreditCardEntity
    ]),
  ],
  providers: [ORMService],
  exports: [ORMService],
})
export class OrmModule {}
