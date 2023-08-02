import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/common/constants';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signupLocal(user);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() user: CreateAuthDto) {
    return await this.authService.signinLocal(user);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    console.log(userId);
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
