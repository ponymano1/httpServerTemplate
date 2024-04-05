import winston from "winston";

const level = process.env.LOG_LEVEL || "debug";
const fileName = process.env.LOG_FILE || "app.log";
const errFileName = process.env.ERR_LOG_FILE || "error.log";

export const logger = winston.createLogger({
  level: level,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: fileName }),
    new winston.transports.File({ filename: errFileName, level: "error" }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});


