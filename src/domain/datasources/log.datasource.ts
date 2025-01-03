import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDataSource{

    abstract saveLogs(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;

}