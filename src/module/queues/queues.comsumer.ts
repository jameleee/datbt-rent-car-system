import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import {
  EMAIL_CREATE_ORDER_SUCCESS,
  EMAIL_QUEUE,
  EMAIL_REGISTER_ACCOUNT_SUCCESS,
  FROM_EMAIL,
  TEMP_CREATE_ORDER_SUCCESS,
  TEMP_REGISTER_ACCOUNT_SUCCESS,
} from 'src/common/constants';

@Processor(EMAIL_QUEUE)
export class QueuesConsumer {
  private readonly logger = new Logger(QueuesConsumer.name);
  private readonly sgMail = require('@sendgrid/mail');

  constructor() {
    this.sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  @Process(EMAIL_REGISTER_ACCOUNT_SUCCESS)
  async registerAccountSuccessJob(job: Job<any>) {
    const email = job.data['toEmail'];
    const msg = {
      from: FROM_EMAIL,
      to: email,
      templateId: TEMP_REGISTER_ACCOUNT_SUCCESS,
    };
    await this.sgMail
      .send(msg)
      .then(() => {
        this.logger.log(`Email sent to ${msg.to} successfully`);
      })
      .catch((error: any) => {
        this.logger.error(`Email sent to ${msg.to} failed: ${error.message}`);
      });
  }

  @Process(EMAIL_CREATE_ORDER_SUCCESS)
  async createAnOrderSuccessJob(job: Job<any>) {
    const email = job.data['toEmail'];
    const rental_id = job.data['rental_id'];
    const price = job.data['price'];
    const payment_method = job.data['payment_method'];
    const rent_date_time = job.data['rent_date_time'];
    const rent_location = job.data['rent_location'];
    const return_date_time = job.data['return_date_time'];
    const return_location = job.data['return_location'];

    const msg = {
      from: FROM_EMAIL,
      to: email,
      template_id: TEMP_CREATE_ORDER_SUCCESS,
      dynamic_template_data: {
        order_id: rental_id,
        total_price: price,
        payment_method: payment_method,
        rental_date: rent_date_time,
        rental_location: rent_location,
        return_date: return_date_time,
        return_location: return_location,
      },
    };
    await this.sgMail
      .send(msg)
      .then(() => {
        this.logger.log(`Email sent to ${msg.to} successfully`);
      })
      .catch((error: any) => {
        this.logger.error(`Email sent to ${msg.to} failed: ${error.message}`);
      });
  }
}
