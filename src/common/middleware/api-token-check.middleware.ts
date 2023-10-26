import {
  NestMiddleware,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiTokenPaymentException } from '../exception/api-token-payement.exception';

export class ApiTokenCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['api-token'] !== 'my-token') {
      // you can replace my-token with your auth token that you might have saved in your database

      // throw new BadRequestException('Bad req custom exception');

      // throw new HttpException(
      //   'My exception message',
      //   HttpStatus.PAYMENT_REQUIRED,
      // );

      throw new ApiTokenPaymentException(); // our custom exception
    }
    next();
  }
}
