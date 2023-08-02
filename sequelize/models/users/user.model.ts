import { Column, DataType, HasOne, Table } from 'sequelize-typescript';
import { UserToken } from './user.token.model';
import { Role } from 'src/utils/enum/role.enum';
import { BaseModel } from '../base/base.model';

@Table({ tableName: 'users' })
export class User extends BaseModel {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.ENUM(Role.ADMIN, Role.USER),
    allowNull: false,
    defaultValue: Role.USER,
  })
  role: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column
  avatar_url: string;

  @HasOne(() => UserToken)
  user_token: UserToken;
}
