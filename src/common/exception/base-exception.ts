import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  private constructor(options: BaseExceptionResponse, statusCode: HttpStatus) {
    super({ error: options }, statusCode);
  }

  public static badRequestException(options: BaseExceptionResponse) {
    return new BaseException(options, HttpStatus.BAD_REQUEST);
  }

  public static conflictException(options: BaseExceptionResponse) {
    return new BaseException(options, HttpStatus.CONFLICT);
  }

  public static forbiddenException(options: BaseExceptionResponse) {
    return new BaseException(options, HttpStatus.FORBIDDEN);
  }

  public static unauthorizedException(options: BaseExceptionResponse) {
    return new BaseException(options, HttpStatus.UNAUTHORIZED);
  }

  public static notFoundException(options: BaseExceptionResponse) {
    return new BaseException(options, HttpStatus.NOT_FOUND);
  }

  public static timeoutFoundException(options: BaseExceptionResponse) {
    return new BaseException(options, HttpStatus.GATEWAY_TIMEOUT);
  }

  public static internalServerException(options: BaseExceptionResponse) {
    return new BaseException(options, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export interface BaseExceptionResponse {
  code?: string;
  title?: string;
  message?: string;
  errors?: ErrorDetailResponse[];
}

export interface ErrorDetailResponse {
  code: string;
  field: string;
  message: string;
}
