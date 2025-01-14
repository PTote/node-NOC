import { LogEntity, LogEntityOptions, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallBack = () => void;
type ErrorCallBack = (error: string) => void;

export class CheckService {

    private NAME_USE_CASE: string = 'check-service';

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

            const logEntityOptions: LogEntityOptions = {
                level: LogSeverityLevel.LOW,
                message: `Service ${url} working`,
                origin: this.NAME_USE_CASE,
            }

            this.logRepository.saveLogs( new LogEntity(logEntityOptions));

            this.successCallBack();
            return true;

        } catch (error) {
            console.log(`${error}`);

            const logEntityOptions: LogEntityOptions = {
                level: LogSeverityLevel.HIGH,
                message: `Service ${url} error: ${error}`,
                origin: this.NAME_USE_CASE,
            }

            this.logRepository.saveLogs( new LogEntity(
                logEntityOptions
            ));

            this.errorCallBack(`${error}`);
            return false;
        }

    }

}