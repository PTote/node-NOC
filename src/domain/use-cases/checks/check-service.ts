import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallBack = () => void;
type ErrorCallBack = (error: string) => void;

export class CheckService {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack,
    ) { }

    async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            this.logRepository.saveLogs( new LogEntity(
                `Service ${url} working`,
                LogSeverityLevel.LOW
            ));

            this.successCallBack();
            return true;

        } catch (error) {
            console.log(`${error}`);

            this.logRepository.saveLogs( new LogEntity(
                `Service ${url} error: ${error}`,
                LogSeverityLevel.HIGH
            ));

            this.errorCallBack(`${error}`);
            return false;
        }

    }

}