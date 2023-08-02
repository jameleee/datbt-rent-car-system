import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  EMAIL_CREATE_ORDER_SUCCESS,
  EMAIL_QUEUE,
  EMAIL_REGISTER_ACCOUNT_SUCCESS,
} from 'src/common/constants';

@Injectable()
export class QueuesService {
  constructor(@InjectQueue(EMAIL_QUEUE) private emailQueue: Queue) {}

  async sendRegisterAccountSuccessEmail(data: { toEmail: string }) {
    await this.emailQueue.add(EMAIL_REGISTER_ACCOUNT_SUCCESS, data);
  }

  async sendCreateAnOrderSuccessEmail(data: {
    toEmail: string;
    rental_id: number;
    price: number;
    payment_method: string;
    rent_date_time: string;
    rent_location: string;
    return_date_time: string;
    return_location: string;
  }) {
    await this.emailQueue.add(EMAIL_CREATE_ORDER_SUCCESS, data);
  }
}
