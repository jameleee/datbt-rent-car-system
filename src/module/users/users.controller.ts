import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetAllUserDto } from './dto/get-all-user.dto';
import { Paging } from 'src/utils/types/paging.types';
import { Public, Roles } from 'src/common/constants';
import { Role } from 'src/utils/enum/role.enum';
import { RtGuard } from 'src/common/guards';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query() getAllUserDto: GetAllUserDto): Promise<Paging> {
    return this.usersService.findAllUsers(getAllUserDto);
  }

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserByIdPublic(+id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: number) {
    console.log(id);
    return this.usersService.removeUser(+id);
  }
}
