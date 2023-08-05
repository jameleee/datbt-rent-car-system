import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import {
  Payment,
  PaymentMethod,
  PaymentStatus,
} from 'sequelize/models/payment';
import { RentalService } from '../rental/rental.service';
import { BaseException } from 'src/common/exception/base-exception';
import { GetAllPaymentDto } from './dto/get-all-payment.dto';
import {
  EPaymenMethod,
  EPaymentStatus,
  ERentalStatus,
} from 'src/utils/enum/database.enum';
import { Paging } from 'src/utils/types/paging.types';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { ServerResponseCode } from 'src/utils/enum/server-response.enum';
import { User } from 'sequelize/models/users';
import { Rental } from 'sequelize/models/rental';

@Injectable()
export class PaymentService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Payment) readonly paymentsModel: typeof Payment,
    @InjectModel(PaymentMethod)
    readonly paymentMethodModel: typeof PaymentMethod,
    @Inject(forwardRef(() => RentalService))
    private readonly rentalsService: RentalService,
  ) {}

  async create(
    userId: number,
    createPaymentDto: CreatePaymentDto,
    transaction?: Transaction,
  ) {
    try {
      const payment = new Payment();
      payment.user_id = userId;
      payment.rental_id = createPaymentDto.rental_id;
      payment.payment_method_id = createPaymentDto.payment_method_id;
      payment.payment_status_id = createPaymentDto.payment_status_id;
      await payment.save({ transaction });
    } catch (error) {
      transaction.rollback();
      throw BaseException.badRequestException({
        code: ServerResponseCode.BAD_REQUEST_ERROR_CODE,
        message: error.message,
      });
    }
  }

  async findAll(getAllPaymentDto: GetAllPaymentDto): Promise<Paging> {
    const result = await this.paymentsModel.findAndCountAll({
      include: [PaymentStatus, PaymentMethod, User, Rental],
      offset: +getAllPaymentDto.offset,
      limit: +getAllPaymentDto.limit,
    });
    return {
      items: result.rows,
      pagingation: {
        total: result.count,
        offset: +getAllPaymentDto.offset,
        limit: +getAllPaymentDto.limit,
      },
    };
  }

  async findOne(id: number) {
    const payment = await this.paymentsModel.findOne({
      include: [PaymentStatus, PaymentMethod, User, Rental],
      where: { id: id },
    });
    if (!payment) {
      throw BaseException.badRequestException({
        message: `Payment id: ${id} is not exist`,
      });
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      const result = await this.sequelize.transaction(async (t) => {
        await this.paymentsModel.update(
          {
            rental_id: updatePaymentDto?.rental_id,
            payment_status_id: updatePaymentDto?.payment_status_id,
            payment_method_id: updatePaymentDto?.payment_method_id,
          },
          {
            where: { id: id },
            transaction: t,
          },
        );
        const payment = await this.findOne(id);
        if (
          updatePaymentDto.payment_status_id == EPaymentStatus.Paid &&
          payment.payment_method_id == EPaymenMethod.Cash
        ) {
          await this.paymentsModel.update(
            {
              payment_date: new Date(),
            },
            {
              where: { id: id },
              transaction: t,
            },
          );
          await this.rentalsService.update(
            payment.rental_id,
            {
              rental_status_id: ERentalStatus.CheckedOut,
            },
            t,
          );
        }
        return await this.findOne(id);
      });
      return result;
    } catch (err) {
      throw BaseException.badRequestException({
        code: ServerResponseCode.BAD_REQUEST_ERROR_CODE,
        message: err.message,
      });
    }
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    try {
      await this.sequelize.transaction(async (t) => {
        await this.paymentsModel.destroy({ where: { id }, transaction: t });
        await this.rentalsService.remove(payment.rental_id, t);
      });
    } catch (error) {
      throw BaseException.badRequestException({
        message: error.message,
      });
    }
  }
}
