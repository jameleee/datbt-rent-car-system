import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  discount_type_id: number;

  @Transform(({ value }) => Number(parseFloat(value).toFixed(2)))
  @IsNumber()
  @IsNotEmpty()
  discount_rate: number;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @Transform(({ value }) => new Date(value))
  @IsDateString()
  @MinDate(new Date())
  @IsNotEmpty()
  expire_time: Date;

  @IsString()
  @IsOptional()
  description: string;
}
