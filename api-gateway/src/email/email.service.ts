import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class EmailService {
    constructor(@InjectQueue('emailQueue') private queue: Queue) { }

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        await this.queue.add('sendEmail', { to, subject, text });
    }
}