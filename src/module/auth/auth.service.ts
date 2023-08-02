import { fetch } from 'node-fetch';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UsersService } from 'src/module/users/users.service';
import { JwtPayload, Tokens } from './types';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import 'dotenv/config';
import { User } from 'sequelize/models/users';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signupLocal(dto: CreateUserDto): Promise<Tokens> {
    const userData = await this.userService.findUserByUserName(dto.username);
    if (userData) throw new ForbiddenException('Account has been created');

    const user = await this.userService.createUser(dto);

    const tokens = await this.generateTokens(user.id, user.username);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(dto: CreateAuthDto): Promise<Tokens> {
    const user = await this.userService.findUserByUserName(dto.username);

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    console.log(passwordMatches);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.generateTokens(user.id, user);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    return await this.userService.logout(userId);
  }

  async generateAccessToken(payload: JwtPayload): Promise<string> {
    const opts: JwtSignOptions = {
      secret: process.env.JWT_AT_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
    };

    return this.jwtService.signAsync(payload, opts);
  }

  async generateRefreshToken(payload: JwtPayload): Promise<string> {
    const opts: JwtSignOptions = {
      secret: process.env.JWT_RT_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
    };

    return this.jwtService.signAsync(payload, opts);
  }

  async generateTokens(userId: number, user: User): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      username: user.username,
      role: [user.role],
      email: user.email,
    };

    const [at, rt] = await Promise.all([
      this.generateAccessToken(jwtPayload),
      this.generateRefreshToken(jwtPayload),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.userService.findUserById(userId);
    const userToken = await this.userService.getUserTokenByUserId(userId);
    if (!userToken || !userToken.tokenHash) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await bcrypt.compare(rt, userToken.tokenHash);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.generateTokens(user.id, user);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(rt, salt);
    await this.userService.addOrUpdateUserAccessToken(userId, rt, hash);
  }
}
