import { Column, HasMany, Table } from 'sequelize-typescript';
import { Payment } from './payment';
import { BaseModel } from '../base/base.model';

@Table({ tableName: 'payment_method' })
export class PaymentMethod extends BaseModel {
  @Column({
    allowNull: false,
  })
  method: string;

  @HasMany(() => Payment)
  payments: Payment[];
}
