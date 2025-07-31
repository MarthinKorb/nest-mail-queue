import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        // Configurar o transporter com SMTP ou serviço desejado
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.ethereal.email',
            port: process.env.SMTP_PORT || 587,
            secure: false, // true para 465, false para outras portas
            auth: {
                user: process.env.SMTP_USER || 'usuario@exemplo.com',
                pass: process.env.SMTP_PASS || 'senha',
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
        console.log(`Enviando email para ${to} diretamente`);

        const mailOptions = {
            from: `"Nome Remetente" <${process.env.SMTP_USER || 'usuario@exemplo.com'}>`,
            to,
            subject,
            text,
            // html: '<b>Mensagem em HTML</b>' // opcional
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email enviado:', info.messageId);
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            throw error;
        }
    }
}
