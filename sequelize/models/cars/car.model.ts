import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { CarTypes } from './car-types.model';
import { CarSteerings } from './car-steerings.model';
import { CarStatus } from './car-status.model';
import { BaseModel } from '../base/base.model';

@Table({ tableName: 'cars' })
export class Car extends BaseModel {
  @ForeignKey(() => CarTypes)
  @Column({
    allowNull: false,
  })
  car_type_id: number;

  @BelongsTo(() => CarTypes)
  carType: CarTypes;

  @ForeignKey(() => CarSteerings)
  @Column({
    allowNull: false,
  })
  car_steerings_id: number;

  @BelongsTo(() => CarSteerings)
  carSteerings: CarSteerings;

  @ForeignKey(() => CarStatus)
  @Column({
    allowNull: false,
  })
  car_status_id: number;

  @BelongsTo(() => CarStatus)
  carStatus: CarStatus;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  gasonline: number;

  @Column({
    allowNull: false,
  })
  rental_price: number;

  @Column({
    allowNull: false,
    unique: true,
  })
  licence_plates: string;
}
