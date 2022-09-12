import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

@Entity({ name: 'tb_product_excluded' })
@Injectable()
export class ProductsExcludedEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'co_product_name', nullable: false })
  name?: string;

  @Column('numeric', { name: 'co_product_price', nullable: false })
  price?: number;

  @Column({ name: 'co_product_description', nullable: true })
  description?: string;
  //some logic here

  @Column({ name: 'co_product_categories', nullable: false, array: true })
  categories?: string;

  @Column({ name: 'co_product_main_categories', nullable: false })
  mainCategories?: string;

  @Column('numeric', {
    name: 'co_product_installments',
    nullable: true,
    default: 0,
  })
  installments?: number;

  @Column({ name: 'co_product_images', nullable: false, array: true })
  images?: string;

  @Column({ name: 'co_user_id', nullable: false })
  userId?: string;

  @Column('numeric', {
    name: 'co_product_discount',
    nullable: true,
    default: 0,
  })
  discount?: number;

  @Column({ name: 'co_product_marc', nullable: true })
  marc?: string;

  @Column({ name: 'co_product_conditions', nullable: true })
  conditions?: string;

  @Column('json', { name: 'co_product_features', nullable: true })
  features?: any;

  @Column('boolean', {
    name: 'co_is_product_active',
    nullable: true,
    default: true,
  })
  isActive?: boolean;

  @Column({
    name: 'co_product_seller',
    nullable: false,
  })
  seller?: string;

  @Column('numeric', {
    name: 'co_product_stocks',
    nullable: false,
    default: 0,
  })
  stocks?: number;

  @Column('numeric', {
    name: 'co_five_stars',
    nullable: true,
    default: null,
    select: false,
  })
  fiveStarts?: number;

  @Column('numeric', {
    name: 'co_four_stars',
    nullable: true,
    default: null,
    select: false,
  })
  fourStarts?: number;

  @Column('numeric', {
    name: 'co_three_stars',
    nullable: true,
    default: null,
    select: false,
  })
  threeStarts?: number;

  @Column('numeric', {
    name: 'co_two_stars',
    nullable: true,
    default: null,
    select: false,
  })
  twoStarts?: number;

  @Column('numeric', {
    name: 'co_one_stars',
    nullable: true,
    default: null,
    select: false,
  })
  oneStarts?: number;

  @Column('numeric', {
    name: 'co_zero_stars',
    nullable: true,
    default: 0,
    select: false,
  })
  zeroStarts?: number;

  @CreateDateColumn({ name: 'co_created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'co_updated_at', select: false })
  updatedAt?: Date;
}
