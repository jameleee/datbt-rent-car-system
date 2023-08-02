import { Module, forwardRef } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  Payment,
  PaymentMethod,
  PaymentStatus,
} from 'sequelize/models/payment';
import { RentalModule } from '../rental/rental.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment, PaymentMethod, PaymentStatus]),
    forwardRef(() => RentalModule),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
