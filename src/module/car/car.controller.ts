import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { GetAllCarDto } from './dto/get-all-car.dto';
import { Paging } from 'src/utils/types/paging.types';
import { Public, Roles } from 'src/common/constants';
import { RtGuard } from 'src/common/guards';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/utils/enum/role.enum';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carService.createCar(createCarDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get()
  getAllCars(@Query() getAllCarDto: GetAllCarDto): Promise<Paging> {
    return this.carService.getAllCars(getAllCarDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get(':id')
  getCarById(@Param('id') id: string) {
    return this.carService.getCarById(+id);
  }

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  updateCar(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.updateCar(+id, updateCarDto);
  }

  @Public()
  @UseGuards(RtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCar(@Param('id') id: string) {
    return this.carService.deleteCar(+id);
  }
}
