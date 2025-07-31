import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule { }
