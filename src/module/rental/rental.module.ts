import { Module, forwardRef } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { Rental, RentalStatus } from 'sequelize/models/rental';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModule } from '../car/car.module';
import { CouponModule } from '../coupon/coupon.module';
import { PaymentModule } from '../payment/payment.module';
import { QueuesModule } from '../queues/queues.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Rental, RentalStatus]),
    CouponModule,
    CarModule,
    forwardRef(() => PaymentModule),
    QueuesModule,
  ],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService],
})
export class RentalModule {}
