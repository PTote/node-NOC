import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';

interface SendMailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements: Attachement[];
}

interface Attachement{
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        port: 465,
        secure: true,
        host: 'smtp.gmail.com',
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }

    });


    constructor(
        private readonly logRepository: LogRepository
    ){}

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachements = []} = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to, subject, html: htmlBody, attachments: attachements
            });

            const log = new LogEntity({
                level: LogSeverityLevel.LOW,
                message: 'Email sent',
                origin: 'email.service.ts'
            });
            this.logRepository.saveLogs(log);

            console.log(sentInformation);

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.HIGH,
                message: 'Email not sent',
                origin: 'email.service.ts'
            });
            this.logRepository.saveLogs(log);

            console.log(error);
            return false;
        }
    }

    sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h1>Logs de sistema - NOC</h1>
            <p>Ver adjuntos</p>
            `;

        const attachements: Attachement[] = [
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log'
            }
        ];

        this.sendEmail({
            to, subject, htmlBody, attachements
        });
    };

}