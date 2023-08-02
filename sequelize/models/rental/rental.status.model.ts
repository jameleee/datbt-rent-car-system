import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from '../base/base.model';

@Table({
  tableName: 'rental_status',
})
export class RentalStatus extends BaseModel {
  @Column({
    allowNull: false,
  })
  status: string;
}
