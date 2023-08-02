import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from '../base/base.model';

@Table({ tableName: 'car_steerings' })
export class CarSteerings extends BaseModel {
  @Column({
    allowNull: false,
  })
  steering: string;
}
