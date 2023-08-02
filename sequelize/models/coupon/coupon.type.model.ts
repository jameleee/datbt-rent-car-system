import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from '../base/base.model';

@Table({
  tableName: 'coupon_types',
})
export class CouponType extends BaseModel {
  @Column({
    allowNull: false,
  })
  type: string;
}
