import config from 'config'
import {s3} from '../configuration'

export const uploadImage = (imageBuffer, {name, mimetype, userName, reviewId, restaurantLocation, restaurantName }) => {
    const bucketName = config.S3Bucket.bucketName;
    const path = `users/${userName}/${restaurantName}-${restaurantLocation}/${reviewId}/images/${name}`
    console.log(path)
    const params = {
        Bucket: bucketName,
        Key: path,
        Body: imageBuffer,
        ContentType: mimetype
    };
    console.log(path)
    console.log(params)
//   https://foodie-s3.s3.amazonaws.com/Latias_M05.png
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        //basic logic for neo4j to insert later
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}