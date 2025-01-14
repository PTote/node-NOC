export enum LogSeverityLevel {

    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'

}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date; 
}
export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(
        options: LogEntityOptions
    ) {
        this.message = options.message;
        this.level = options.level;
        this.origin = options.origin;

        if(options.createdAt){
            this.createdAt = options.createdAt
        }else{
            this.createdAt = new Date()
        }
    }

    static fromJson = (json: string): LogEntity => {
        json = (json === '') ? '{}' : json;
        const {message, level, createdAt, origin} = JSON.parse(json);

        const log = new LogEntity({
            message, 
            level,
            origin,
            createdAt
        });

        return log;

    };

    static fromObject = (object: {[key: string]: any}): LogEntity => {
        const {message, level, createdAt, origin} = object;

        const log = new LogEntity({
            message, level, createdAt, origin
        });

        return log;

    }

}