import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { GetAllCouponDto } from './dto/get-all-coupon.dto';
import { Paging } from 'src/utils/types/paging.types';
import { Public, Roles } from 'src/common/constants';
import { Role } from 'src/utils/enum/role.enum';
import { RtGuard } from 'src/common/guards';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query() getAllCouponDto: GetAllCouponDto): Promise<Paging> {
    return this.couponService.findAll(getAllCouponDto);
  }

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.couponService.findOneByCode(code);
  }

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(+id, updateCouponDto);
  }

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(+id);
  }
}
