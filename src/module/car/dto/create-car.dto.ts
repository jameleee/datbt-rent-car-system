import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  car_type_id: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  car_steerings_id: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  car_status_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  gasonline: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  rental_price: number;

  @IsString()
  licence_plates: string;
}
