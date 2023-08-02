import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRentalDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly car_id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  readonly rental_status_id: number;

  @IsString()
  @IsOptional()
  coupon_code?: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly total_price: number;

  @IsString()
  @IsNotEmpty()
  rent_location: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly rent_date_time: Date;

  @IsString()
  @IsNotEmpty()
  return_location: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly return_date_time: Date;

  @IsString()
  @IsOptional()
  readonly detail?: string;
}
