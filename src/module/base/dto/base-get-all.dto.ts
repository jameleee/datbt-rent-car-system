import { Type } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';

export class BaseGetAllDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  offset: number;
}
