import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource{

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createLogsFile();
    }

    private createLogsFile = () => {

        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        };

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if(fs.existsSync(path)) return;
            fs.writeFileSync(path,  '');
        });

 

    };

    async saveLogs(log: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(log)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJson);

        if(log.level === LogSeverityLevel.LOW) return;

        if(log.level === LogSeverityLevel.MEDIUM){
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        };

    };

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        return content.split('\n').map(log => LogEntity.fromJson(log));


    };


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch(severityLevel){
            case LogSeverityLevel.LOW:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.MEDIUM:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.HIGH:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }



}