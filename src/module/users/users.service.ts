import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserToken } from '../../../sequelize/models/users/user.token.model';
import { FindOptions, UpdateOptions } from 'sequelize';
import { User } from 'sequelize/models/users';
import { BaseException } from 'src/common/exception/base-exception';
import { ServerResponseCode } from 'src/utils/enum/server-response.enum';
import { QueuesService } from '../queues/queues.service';
import { Paging } from 'src/utils/types/paging.types';
import { GetAllUserDto } from './dto/get-all-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(UserToken)
    private userTokenModel: typeof UserToken,
    private readonly queuesService: QueuesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const newUser = new User();
      newUser.email = createUserDto.email;
      newUser.username = createUserDto.username;
      newUser.password = await bcrypt.hash(createUserDto.password, salt);
      newUser.avatar_url = createUserDto.avatar_url;
      const { password, ...result } = (await newUser.save()).get({
        plain: true,
      });

      // await this.queuesService.sendRegisterAccountSuccessEmail({
      //   toEmail: newUser.email,
      // });

      return result;
    } catch (err) {
      if (
        typeof err?.original?.code !== 'undefined' &&
        err.original.code === 'ER_DUP_ENTRY'
      ) {
        throw BaseException.conflictException({
          code: ServerResponseCode.VALIDATION_ERROR_CODE,
          title: 'Validation Error',
          message: err.errors[0].message,
        });
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllUsers(getAllUserDto: GetAllUserDto): Promise<Paging> {
    const result = await this.userModel.findAndCountAll({
      offset: +getAllUserDto.offset,
      limit: +getAllUserDto.limit,
    });
    return {
      items: result.rows,
      pagingation: {
        total: result.count,
        offset: +getAllUserDto.offset,
        limit: +getAllUserDto.limit,
      },
    };
  }

  async findUserByIdPublic(id: number): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.userModel.unscoped().findOne({
      where: {
        id: id,
      },
    });
  }

  async findUserByUserName(username: string): Promise<User | null> {
    return this.userModel.unscoped().findOne<User>({
      where: {
        username: username,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.unscoped().findOne({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const user = await this.userModel.findOne({ where: { id: id } });
      if (!user) {
        throw BaseException.badRequestException({
          message: 'User with this id is not exist',
        });
      }

      user.username = updateUserDto?.username;
      user.email = updateUserDto?.email;

      if (updateUserDto?.password) {
        user.password = await bcrypt.hash(updateUserDto?.password, salt);
      } else {
        throw BaseException.badRequestException({
          code: ServerResponseCode.VALIDATION_ERROR_CODE,
          title: 'Validation Error',
          message: 'Password not found',
        });
      }

      user.avatar_url = updateUserDto?.avatar_url;
      const { password, ...result } = (await user.save()).get({
        plain: true,
      });

      return result;
    } catch (err) {
      if (
        typeof err?.original?.code !== 'undefined' &&
        err.original.code === 'ER_DUP_ENTRY'
      ) {
        throw BaseException.conflictException({
          code: ServerResponseCode.VALIDATION_ERROR_CODE,
          title: 'Validation Error',
          message: err.errors[0].message,
        });
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeUser(id: number): Promise<boolean> {
    const user = await this.findUserById(id);
    console.log(user);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }

  async logout(userId: number): Promise<boolean> {
    const userToken = await this.userTokenModel.findOne({
      where: {
        user_id: userId,
      },
    });
    if (userToken) {
      await userToken.destroy();
      return true;
    }
    return false;
  }

  async getUserTokenByUserId(userId: number): Promise<UserToken> {
    const options: FindOptions = {
      where: { user_id: userId },
    };
    return await this.userTokenModel.findOne<UserToken>(options);
  }

  async addAccessTokenToDB(userId: number, access_token: string, hash: string) {
    const expiration_time: Date = new Date();
    expiration_time.setSeconds(expiration_time.getSeconds() + 15);
    const userToken = new UserToken();
    userToken.user_id = userId;
    userToken.token = access_token;
    userToken.tokenHash = hash;
    userToken.expiration_time = expiration_time;
    await userToken.save();
  }

  async addOrUpdateUserAccessToken(
    userId: number,
    access_token: string,
    hash: string,
  ) {
    const expiration_time: Date = new Date();
    expiration_time.setSeconds(expiration_time.getSeconds() + 60);
    const userTokenInDB = await this.getUserTokenByUserId(userId);
    if (userTokenInDB) {
      const options: UpdateOptions = {
        where: { user_id: userId },
      };
      await this.userTokenModel.update(
        {
          token: access_token,
          tokenHash: hash,
          expiration_time: expiration_time,
        },
        options,
      );
    } else {
      const userToken = new UserToken();
      userToken.user_id = userId;
      userToken.token = access_token;
      userToken.tokenHash = hash;
      userToken.expiration_time = expiration_time;
      await userToken.save();
    }
  }
}
