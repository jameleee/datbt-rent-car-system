import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Rental, RentalStatus } from 'sequelize/models/rental';
import { CarService } from '../car/car.service';
import { Op, Transaction } from 'sequelize';
import {
  ECarStatus,
  ECoupon,
  EPaymenMethod,
  EPaymentStatus,
  ERentalStatus,
} from 'src/utils/enum/database.enum';
import { BaseException } from 'src/common/exception/base-exception';
import { GetAllRentalDto } from './dto/get-all-rental.dto';
import { Paging } from 'src/utils/types/paging.types';
import { Car, CarStatus, CarSteerings, CarTypes } from 'sequelize/models/cars';
import { User } from 'sequelize/models/users';
import { CouponService } from '../coupon/coupon.service';
import { Sequelize } from 'sequelize-typescript';
import { plainToInstance } from 'class-transformer';
import { PaymentService } from '../payment/payment.service';
import { QueuesService } from '../queues/queues.service';
import { Payment } from 'sequelize/models/payment';
import { ServerResponseCode } from 'src/utils/enum/server-response.enum';
import { Coupon } from 'sequelize/models/coupon';

@Injectable()
export class RentalService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Rental)
    private rentalModel: typeof Rental,
    @InjectModel(RentalStatus)
    private rentalStatusModel: typeof RentalStatus,
    private carService: CarService,
    private couponService: CouponService,
    @Inject(forwardRef(() => PaymentService))
    private paymentService: PaymentService,
    private queuesService: QueuesService,
  ) {}

  async create(
    userId: number,
    userEmail: string,
    createRentalDto: CreateRentalDto,
  ) {
    const car = await this.carService.getCarById(createRentalDto.car_id);

    if (car.car_status_id != ECarStatus.Available) {
      throw BaseException.badRequestException({
        title: 'Car is not available for rent',
        message: `The car_id: ${createRentalDto.car_id} is not available for rent`,
      });
    }
    if (!(await this.isCarAvailableForRent(createRentalDto))) {
      throw BaseException.badRequestException({
        message: `The car_id: ${createRentalDto.car_id} is not available for this range of dates`,
      });
    }

    const transaction = await this.sequelize.transaction();

    try {
      const rentalInfo = plainToInstance(Rental, createRentalDto);
      rentalInfo.user_id = userId;
      rentalInfo.rental_status_id = ERentalStatus.Created;

      let price = car.rental_price;

      if (createRentalDto.coupon_code) {
        const coupon = await this.couponService.findOneByCode(
          createRentalDto.coupon_code,
        );
        if (coupon && coupon.expire_time > new Date()) {
          if (coupon.id === ECoupon.PercentageDiscount) {
            price = price - (price * coupon.discount_rate) / 100;
          } else if (
            coupon.id === ECoupon.FlatDiscount ||
            coupon.id === ECoupon.FreeShipping
          ) {
            price = price - coupon.discount_rate;
          }
          rentalInfo.coupon_id = coupon.id;
        } else {
          throw BaseException.badRequestException({
            code: ServerResponseCode.BAD_REQUEST_ERROR_CODE,
            title: 'Coupon is expired',
            message: 'Your coupon code is expired',
          });
        }
      }
      rentalInfo.total_price = price;

      const saved = await rentalInfo.save({ transaction: transaction });
      await this.paymentService.create(
        userId,
        {
          rental_id: saved.id,
          payment_status_id: EPaymentStatus.Processing,
          payment_method_id: EPaymenMethod.Cash,
        },
        transaction,
      );

      await transaction.commit();

      // this.queuesService.sendCreateAnOrderSuccessEmail({
      //   toEmail: userEmail,
      //   rental_id: saved.id,
      //   price: price,
      //   payment_method: EPaymenMethod[1],
      //   rent_date_time: saved.rent_date_time.toISOString(),
      //   rent_location: saved.rent_location,
      //   return_date_time: saved.return_date_time.toISOString(),
      //   return_location: saved.return_location,
      // });

      return await this.findOne(saved.id);
    } catch (error) {
      await transaction.rollback();
      throw BaseException.badRequestException({
        message: error.message,
      });
    }
  }

  async findAll(getAllRentalDto: GetAllRentalDto): Promise<Paging> {
    const result = await this.rentalModel.findAndCountAll({
      include: [
        User,
        Coupon,
        { model: Car, include: [CarStatus, CarSteerings, CarTypes] },
        RentalStatus,
      ],
      group: ['id'],
      offset: +getAllRentalDto.offset,
      limit: +getAllRentalDto.limit,
    });
    return {
      items: result.rows,
      pagingation: {
        total: result.count.length,
        offset: +getAllRentalDto.offset,
        limit: +getAllRentalDto.limit,
      },
    };
  }

  async findOne(id: number, transaction?: Transaction) {
    try {
      const result = await this.rentalModel.findOne({
        include: [
          User,
          Coupon,
          { model: Car, include: [CarStatus, CarSteerings, CarTypes] },
          RentalStatus,
        ],
        where: {
          id: id,
        },
      });
      return result;
    } catch (err) {
      await transaction.rollback();
      throw BaseException.badRequestException({
        message: 'Rental id is not exist',
      });
    }
  }

  async update(
    id: number,
    updateRentalDto: UpdateRentalDto,
    transaction?: Transaction,
  ) {
    try {
      await this.rentalModel.update(
        {
          car_id: updateRentalDto?.car_id,
          coupon_id: updateRentalDto?.coupon_code,
          rental_status_id: updateRentalDto?.rental_status_id,
          total_price: updateRentalDto?.total_price,
          rent_location: updateRentalDto?.rent_location,
          rent_date_time: updateRentalDto?.rent_date_time,
          return_location: updateRentalDto?.return_location,
          return_date_time: updateRentalDto?.return_date_time,
          detail: updateRentalDto?.detail,
        },
        { where: { id: id }, transaction },
      );

      return await this.findOne(id, transaction);
    } catch (err) {
      await transaction.rollback();
      throw BaseException.badRequestException({
        code: ServerResponseCode.BAD_REQUEST_ERROR_CODE,
        message: err.message,
      });
    }
  }

  async remove(id: number, transaction?: Transaction) {
    try {
      await this.rentalModel.destroy({
        where: { id },
        transaction: transaction,
      });
    } catch (err) {
      await transaction.rollback();
      throw BaseException.badRequestException({
        code: ServerResponseCode.BAD_REQUEST_ERROR_CODE,
        message: err.message,
      });
    }
  }

  async isCarAvailableForRent(
    createRentalDto: CreateRentalDto,
  ): Promise<boolean> {
    console.log(createRentalDto.rent_date_time);
    const carRented = await this.rentalModel.findOne({
      include: [
        User,
        Coupon,
        { model: Car, include: [CarStatus, CarSteerings, CarTypes] },
        RentalStatus,
      ],
      where: {
        car_id: createRentalDto.car_id,
        rental_status_id: ERentalStatus.Created,
        [Op.or]: [
          {
            rent_date_time: {
              [Op.between]: [
                createRentalDto.rent_date_time,
                createRentalDto.return_date_time,
              ],
            },
          },
          {
            [Op.and]: [
              {
                rent_date_time: {
                  [Op.lte]: createRentalDto.rent_date_time,
                },
              },
              {
                return_date_time: {
                  [Op.gte]: createRentalDto.return_date_time,
                },
              },
            ],
          },
          {
            return_date_time: {
              [Op.between]: [
                createRentalDto.rent_date_time,
                createRentalDto.return_date_time,
              ],
            },
          },
        ],
      },
    });
    return !carRented;
  }
}
