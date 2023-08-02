import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car, CarStatus, CarSteerings, CarTypes } from 'sequelize/models/cars';

@Module({
  imports: [
    SequelizeModule.forFeature([Car, CarSteerings, CarStatus, CarTypes]),
  ],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
