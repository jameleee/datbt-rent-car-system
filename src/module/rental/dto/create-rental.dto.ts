import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import { IsAfterDate } from 'src/utils/date.utils';

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
  @MinDate(new Date())
  readonly rent_date_time: Date;

  @IsString()
  @IsNotEmpty()
  return_location: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @IsAfterDate('rent_date_time')
  readonly return_date_time: Date;

  @IsString()
  @IsOptional()
  readonly detail?: string;
}
