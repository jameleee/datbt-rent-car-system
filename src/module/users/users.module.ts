import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserToken } from '../../../sequelize/models/users/user.token.model';
import { User } from 'sequelize/models/users';
import { QueuesModule } from '../queues/queues.module';

@Module({
  imports: [SequelizeModule.forFeature([User, UserToken]), QueuesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
