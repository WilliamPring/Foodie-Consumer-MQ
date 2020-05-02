import winston from 'winston'

const loggerConfig = {
    handleExceptions: false,
    exitOnError: false,
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console()
    ]
};

export default class ConfigureLogger {
    constructor() {
        this.template = winston.createLogger(loggerConfig)
    }
    get logger() {
        return this.template
    }
}