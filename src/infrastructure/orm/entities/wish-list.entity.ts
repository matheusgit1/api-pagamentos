import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

@Entity({ name: 'tb_wish_list' })
@Injectable()
export class WishListEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid', {
    name: 'co_product_id',
    nullable: false,
  })
  productId?: string;

  @Column({ name: 'co_user_id', nullable: false })
  userId?: string;

  @CreateDateColumn({ name: 'co_created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'co_updated_at', select: false })
  updatedAt?: Date;
}
