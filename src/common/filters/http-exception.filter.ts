import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '../exception/base-exception';
import { ServerResponseCode } from 'src/utils/enum/server-response.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let statusCode = exception.getStatus();
    let message = exception.message || 'Internal Server Error';

    if (exception instanceof BaseException) {
      response.status(exception.getStatus()).json(exception.getResponse());
    } else {
      switch (true) {
        case exception instanceof HttpException:
          message = exception.message;
          statusCode = exception.getStatus();
          break;
        default:
          message = 'Internal Server Error';
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          break;
      }

      response.status(statusCode).json({
        error: {
          code: ServerResponseCode.COMMON_ERROR_CODE,
          title: 'Server error',
          message: message,
          errors: [],
        },
      });
    }
  }
}
