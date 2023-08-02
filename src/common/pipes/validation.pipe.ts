import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BaseException } from '../exception/base-exception';
import { ServerResponseCode } from 'src/utils/enum/server-response.enum';

@Injectable()
export class AppValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw BaseException.badRequestException({
        code: ServerResponseCode.BAD_REQUEST_ERROR_CODE,
        title: 'Internal Server Error',
        message: 'An unexpected error has been occurred',
        errors: errors.map((error) => ({
          code: ServerResponseCode.VALIDATION_ERROR_CODE,
          field: error.property,
          message: Object.values(error.constraints)[0].toString(),
        })),
      });
    }
    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
