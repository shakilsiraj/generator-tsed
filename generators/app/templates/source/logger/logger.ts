import * as winston from "winston";

export var logger = winston.createLogger({
    level: "info",
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});
