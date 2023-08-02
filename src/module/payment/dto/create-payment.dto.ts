import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly rental_id: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly payment_status_id: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly payment_method_id: number;
}
