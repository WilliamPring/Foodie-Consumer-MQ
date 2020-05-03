import config from 'config'
import {s3} from '../configuration'
import axios from 'axios'
import https from 'https'
import {createImage} from '../query/index'
import moment from 'moment'
export const apiClient = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})


export const uploadImage = async (imageBuffer, {name, mimetype, userName, reviewId, restaurantLocation, restaurantName }) => {
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
//
try {

    s3.upload(params, async function(err, data) {
        if (err) {
            throw err;
        }

        const input = {
            reviewId: reviewId,
            takeAt: moment().format("YYYY-MM-DD"),
            url: data.Location
        }
        const imageData = await createImage(input)
        console.log(imageData)
        //basic logic for neo4j to insert later
        console.log(`File uploaded successfully. ${data.Location}`);
    });

} catch(e) {
    console.log(e)
}

}