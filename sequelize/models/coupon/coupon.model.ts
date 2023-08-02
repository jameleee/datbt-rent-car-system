import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { CouponType } from './coupon.type.model';
import { BaseModel } from '../base/base.model';
import { Rental } from '../rental';

@Table({ tableName: 'coupons' })
export class Coupon extends BaseModel {
  @Column({
    allowNull: false,
    unique: true,
  })
  code: string;

  @ForeignKey(() => CouponType)
  @Column({
    allowNull: false,
  })
  discount_type_id: number;

  @Column({
    allowNull: false,
  })
  discount_rate: number;

  @Column({
    allowNull: false,
  })
  expire_time: Date;

  @Column({
    allowNull: false,
  })
  is_active: boolean;

  @Column({
    allowNull: false,
  })
  description: string;

  @HasMany(() => Rental)
  rentals: Rental[];

  @BelongsTo(() => CouponType)
  couponType: CouponType;
}
