import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from '../base/base.model';

@Table({ tableName: 'car_types' })
export class CarTypes extends BaseModel {
  @Column({
    allowNull: false,
  })
  brand: string;

  @Column({
    allowNull: false,
  })
  fuel_type: string;

  @Column({
    allowNull: false,
  })
  seat: number;

  @Column({
    allowNull: false,
  })
  car_image_url: string;
}
