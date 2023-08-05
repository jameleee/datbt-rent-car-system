import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { CarModule } from './module/car/car.module';
import { UsersModule } from './module/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './module/auth/auth.module';
import { UserToken } from '../sequelize/models/users/user.token.model';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ResponseInterceptor } from './common/interceptors';
import { Car, CarStatus, CarSteerings, CarTypes } from 'sequelize/models/cars';
import { User } from 'sequelize/models/users';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { PaymentModule } from './module/payment/payment.module';
import { RentalModule } from './module/rental/rental.module';
import { CouponModule } from './module/coupon/coupon.module';
import { Coupon, CouponType } from 'sequelize/models/coupon';
import { Rental, RentalStatus } from 'sequelize/models/rental';
import {
  Payment,
  PaymentMethod,
  PaymentStatus,
} from 'sequelize/models/payment';
import { QueuesModule } from './module/queues/queues.module';
import 'dotenv/config';
import { RedisCacheModule } from './module/cache/cache.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: false,
      models: [
        Car,
        CarStatus,
        CarTypes,
        CarSteerings,
        User,
        UserToken,
        Coupon,
        CouponType,
        Rental,
        RentalStatus,
        PaymentMethod,
        PaymentStatus,
        Payment,
      ],
    }),
    RedisCacheModule,
    CarModule,
    UsersModule,
    AuthModule,
    PaymentModule,
    RentalModule,
    CouponModule,
    QueuesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
