import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { plainToInstance } from 'class-transformer';
import { Coupon } from 'sequelize/models/coupon';
import { InjectModel } from '@nestjs/sequelize';
import { BaseException } from 'src/common/exception/base-exception';
import { GetAllCouponDto } from './dto/get-all-coupon.dto';
import { Paging } from 'src/utils/types/paging.types';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon)
    private readonly couponsModel: typeof Coupon,
  ) {}

  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    try {
      const newCoupon = plainToInstance(Coupon, createCouponDto);
      return await newCoupon.save();
    } catch (error) {
      if (error?.parent?.code === 'ER_DUP_ENTRY') {
        throw BaseException.badRequestException({
          message: 'Coupon is already exist',
        });
      }
      throw BaseException.internalServerException({
        message: error.message,
      });
    }
  }

  async findAll(getAllCouponDto: GetAllCouponDto): Promise<Paging> {
    const result = await this.couponsModel.findAndCountAll({
      offset: +getAllCouponDto.offset,
      limit: +getAllCouponDto.limit,
    });
    return {
      items: result.rows,
      pagingation: {
        total: result.count,
        offset: +getAllCouponDto.offset,
        limit: +getAllCouponDto.limit,
      },
    };
  }

  async findOneByCode(code: string): Promise<Coupon> {
    const coupon = await this.couponsModel.findOne({ where: { code: code } });
    if (!coupon) {
      throw BaseException.badRequestException({
        message: 'Coupon is not exist',
      });
    }
    if (!this.isCouponAvailable(coupon)) {
      throw BaseException.badRequestException({
        message: 'Coupon is not available',
      });
    }
    return coupon;
  }

  async findOneById(id: number) {
    const coupon = await this.couponsModel.findOne({ where: { id: id } });
    if (!coupon) {
      throw BaseException.badRequestException({
        message: 'Coupon id is not exist',
      });
    }
    if (!this.isCouponAvailable(coupon)) {
      throw BaseException.badRequestException({
        message: 'Coupon is not available',
      });
    }
    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    await this.findOneById(id);
    return await this.couponsModel.update(updateCouponDto, { where: { id } });
  }

  async remove(id: number) {
    await this.couponsModel.destroy({ where: { id: id } });
  }

  private async isCouponAvailable(coupon: Coupon): Promise<boolean> {
    return coupon.expire_time < new Date();
  }
}
