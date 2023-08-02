import { Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { BullModule } from '@nestjs/bull';
import { QueuesConsumer } from './queues.comsumer';
import 'dotenv/config';
import { EMAIL_QUEUE } from 'src/common/constants';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: EMAIL_QUEUE,
    }),
  ],
  providers: [QueuesService, QueuesConsumer],
  exports: [QueuesService],
})
export class QueuesModule {}
