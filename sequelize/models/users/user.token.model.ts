import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: 'user_tokens',
})
export class UserToken extends Model<UserToken> {
  @ForeignKey(() => User)
  @Column({ primaryKey: true, allowNull: false })
  user_id: number;

  @Column({ allowNull: false })
  token: string;

  @Column
  tokenHash: string;

  @Column({ allowNull: false })
  expiration_time: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => User)
  user: User;
}
