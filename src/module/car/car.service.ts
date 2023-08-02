import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car, CarStatus, CarSteerings, CarTypes } from 'sequelize/models/cars';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { BaseException } from 'src/common/exception/base-exception';
import { ServerResponseCode } from 'src/utils/enum/server-response.enum';
import { GetAllCarDto } from './dto/get-all-car.dto';
import { Paging } from 'src/utils/types/paging.types';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car)
    private carModel: typeof Car,
  ) {}

  async getAllCars(getAllCarDto: GetAllCarDto): Promise<Paging> {
    const result = await this.carModel.findAndCountAll({
      include: [CarTypes, CarSteerings, CarStatus],
      limit: +getAllCarDto.limit,
      offset: +getAllCarDto.offset,
    });

    console.log(result.rows);

    return {
      items: result.rows,
      pagingation: {
        total: result.count,
        limit: +getAllCarDto.limit,
        offset: +getAllCarDto.offset,
      },
    };
  }

  async getCarById(id: number): Promise<Car> {
    const car = await this.carModel.findOne({
      include: [CarTypes, CarSteerings, CarStatus],
      where: {
        id: id,
      },
    });

    if (!car) {
      throw BaseException.notFoundException({
        code: ServerResponseCode.NOT_FOUND_ERROR_CODE,
        title: 'Database not found',
        message: `Database not found at car_id = ${id}`,
      });
    }
    return car;
  }

  async createCar(createCarDto: CreateCarDto) {
    let result: Car;

    try {
      result = await this.carModel.create<Car>({
        car_type_id: createCarDto.car_type_id,
        car_steerings_id: createCarDto.car_steerings_id,
        car_status_id: createCarDto.car_status_id,
        name: createCarDto.name,
        rental_price: createCarDto.rental_price,
        gasonline: createCarDto.gasonline,
        licence_plates: createCarDto.licence_plates,
      });
    } catch (err) {
      console.log(err.original.code);
      if (
        typeof err?.original?.code !== 'undefined' &&
        err.original.code === 'ER_NO_REFERENCED_ROW_2'
      ) {
        throw BaseException.badRequestException({
          code: ServerResponseCode.BAD_REQUEST_ERROR_CODE,
          title: `Cannot add or update a child row`,
          message: err.message,
        });
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.getCarById(result.id);
  }

  async updateCar(id: number, updateCarDto: UpdateCarDto) {
    try {
      await this.carModel.update(
        {
          car_type_id: updateCarDto.car_type_id,
          car_steerings_id: updateCarDto.car_steerings_id,
          car_status_id: updateCarDto.car_status_id,
          name: updateCarDto.name,
          rental_price: updateCarDto.rental_price,
          gasonline: updateCarDto.gasonline,
          licence_plates: updateCarDto.licence_plates,
        },
        {
          where: {
            id: id,
          },
        },
      );
    } catch (err) {
      console.log(err.original.code);
      if (
        typeof err?.original?.code !== 'undefined' &&
        err.original.code === 'ER_NO_REFERENCED_ROW_2'
      ) {
        throw BaseException.badRequestException({
          code: ServerResponseCode.BAD_REQUEST_ERROR_CODE,
          title: `Cannot add or update a child row`,
          message: err.message,
        });
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return await this.getCarById(id);
  }

  async deleteCar(id: number): Promise<void> {
    const car = await this.getCarById(id);
    if (car) {
      await car.destroy();
    }
  }
}
