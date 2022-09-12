import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

@Entity({ name: 'tb_credit_card' })
@Injectable()
export class CreditCardEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid', { name: 'co_user_id', nullable: false })
  userId?: string;

  @Column({ name: 'co_credit_card_id', nullable: false })
  creditCardId?: string;

  @CreateDateColumn({ name: 'co_created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'co_updated_at', select: false })
  updatedAt?: Date;
}
