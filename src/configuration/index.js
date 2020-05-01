import ConfigureLogger from './ConfigureLogger'
import ConfigureStorage from './ConfigureStorage'

const loggerInstance = new ConfigureLogger();
const s3StorageInstance = new ConfigureStorage();
s3StorageInstance.configure();

export const s3 = s3StorageInstance.getS3();
export const logger = loggerInstance.logger;