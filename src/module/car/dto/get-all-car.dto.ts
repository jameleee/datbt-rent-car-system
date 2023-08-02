import { PartialType } from '@nestjs/mapped-types';
import { BaseGetAllDto } from 'src/module/base/dto/base-get-all.dto';

export class GetAllCarDto extends PartialType(BaseGetAllDto) {}
