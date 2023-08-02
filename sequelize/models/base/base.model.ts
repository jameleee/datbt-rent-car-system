import {
  Column,
  CreatedAt,
  DefaultScope,
  Model,
  UpdatedAt,
} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: { exclude: ['created_at', 'updated_at', 'password'] },
}))
export class BaseModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  @CreatedAt
  created_at: Date;

  @Column
  @UpdatedAt
  updated_at: Date;
}
