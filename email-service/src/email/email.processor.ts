import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from './email.service';

@Processor('emailQueue')
export class EmailProcessor extends WorkerHost {
    constructor(private readonly emailService: EmailService) {
        super();
    }

    async process(job: Job<{ to: string; subject: string; text: string }>): Promise<void> {
        const { to, subject, text } = job.data;

        try {
            console.log('Processando job de email:', job.id);
            await this.emailService.sendEmail(to, subject, text);
            console.log(`Email enviado para ${to}`);
        } catch (error) {
            console.error(`Erro ao enviar email para ${to}:`, error);
            throw error; // Para o BullMQ aplicar política de retry, se configurado
        }
    }
}
