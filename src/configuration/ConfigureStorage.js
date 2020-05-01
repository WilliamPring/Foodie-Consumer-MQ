import config from 'config'
import AWS from 'aws-sdk'
export default class ConfigureStorage {
    constructor() {
        this.accessKeyId = config.S3Bucket.id;
        this.secretAccessKey = config.S3Bucket.secret;

    }
    configure() {
        this._s3 = new AWS.S3({
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey
        });
    }
    getS3() {
        return this._s3;
    }
}