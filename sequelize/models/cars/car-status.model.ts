import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from '../base/base.model';

@Table({ tableName: 'car_status' })
export class CarStatus extends BaseModel {
  @Column({
    allowNull: false,
  })
  status: string;

  @Column({
    allowNull: false,
  })
  description: string;
}
