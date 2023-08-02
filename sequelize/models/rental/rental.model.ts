import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Table,
} from 'sequelize-typescript';
import { Car } from '../cars';
import { User } from '../users';
import { RentalStatus } from './rental.status.model';
import { Payment } from '../payment';
import { BaseModel } from '../base/base.model';
import { Coupon } from '../coupon';

@Table({
  tableName: 'rentals',
})
export class Rental extends BaseModel {
  @ForeignKey(() => Car)
  @Column({
    allowNull: false,
  })
  car_id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  user_id: number;

  @ForeignKey(() => Coupon)
  @Column({
    allowNull: false,
  })
  coupon_id: number;

  @ForeignKey(() => RentalStatus)
  @Column({
    allowNull: false,
  })
  rental_status_id: number;

  @Column({
    allowNull: false,
  })
  total_price: number;

  @Column({
    allowNull: false,
  })
  rent_location: string;

  @Column({
    allowNull: false,
  })
  rent_date_time!: Date;

  @Column({
    allowNull: false,
  })
  return_location: string;

  @Column({
    allowNull: false,
  })
  return_date_time: Date;

  @Column({
    allowNull: true,
  })
  detail: string;

  @HasOne(() => Payment)
  payment: Payment;

  @BelongsTo(() => Car)
  car: Car;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Coupon)
  coupon: User;

  @BelongsTo(() => RentalStatus)
  rental_status: RentalStatus;
}
