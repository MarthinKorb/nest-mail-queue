import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) { }

    @Post()
    async enqueue(@Body() body: { to: string; subject: string; text: string }) {
        await this.emailService.sendEmail(body.to, body.subject, body.text);
        return { message: 'Email has been queued for sending' };
    }

}
