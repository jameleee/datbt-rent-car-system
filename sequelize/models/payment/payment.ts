import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { User } from '../users';
import { PaymentStatus } from './payment.status';
import { PaymentMethod } from './payment.method';
import { Rental } from '../rental';
import { BaseModel } from '../base/base.model';

@Table({ tableName: 'payments' })
export class Payment extends BaseModel {
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  user_id: number;

  @ForeignKey(() => Rental)
  @Column({
    allowNull: false,
  })
  rental_id: number;

  @ForeignKey(() => PaymentStatus)
  @Column({
    allowNull: false,
  })
  payment_status_id: number;

  @ForeignKey(() => PaymentMethod)
  @Column({
    allowNull: false,
  })
  payment_method_id: number;

  @Column
  payment_date: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Rental)
  rental: Rental;

  @BelongsTo(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @BelongsTo(() => PaymentStatus)
  paymentStatus: PaymentStatus;
}
