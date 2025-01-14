import { envs } from '../config/plugins/envs.plugin';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log-implementation.repository';

const logRepository = new LogRepositoryImplementation(
    // new FileSystemDataSource(),
    new MongoLogDataSource(),
);

export class Server {

    public static start() {
        console.log('Server started...');
        console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);

        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs(
        //     ['tote.kev@gmail.com']
        // );

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://googlegggggg.com'
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url);
        //     }
        // );


    }

}