import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const url = req.originalUrl;
    console.log(LoggerMiddleware.name, `Request ${method} ${url} started`);
    res.on('finish', () => {
      console.log(LoggerMiddleware.name, `Request ${method} ${url} completed`);
    });
    next();
  }
}
