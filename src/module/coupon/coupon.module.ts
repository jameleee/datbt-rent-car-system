import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Coupon, CouponType } from 'sequelize/models/coupon';

@Module({
  imports: [SequelizeModule.forFeature([Coupon, CouponType])],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
