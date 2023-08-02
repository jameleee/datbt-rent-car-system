import { Column, HasMany, Table } from 'sequelize-typescript';
import { Payment } from './payment';
import { BaseModel } from '../base/base.model';

@Table({ tableName: 'payment_status' })
export class PaymentStatus extends BaseModel {
  @Column({
    allowNull: false,
  })
  status: string;

  @HasMany(() => Payment)
  payments: Payment[];
}
