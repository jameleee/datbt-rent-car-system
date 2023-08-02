import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { BaseException } from '../exception/base-exception';
import { ServerResponseCode } from 'src/utils/enum/server-response.enum';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(60000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() =>
            BaseException.timeoutFoundException({
              code: ServerResponseCode.TIME_OUT_ERROR_CODE,
              title: 'Server Timeout Error',
              message: err.message,
            }),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
