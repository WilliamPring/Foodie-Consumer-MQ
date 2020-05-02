import {apiClient} from '../common/utils'
import {get} from 'lodash'
import config from 'config'
const graphqlUrl = config.get('graphqlUrl');


const createReviewImage = `
mutation($input: ImageInput!) {
  CreateReviewImage(input: $input) {
    url
    caption
    }
  }
`


const createImage = (input) => apiClient
        .post(graphqlUrl, {
            query: createReviewImage,
            variables: {
              input
            }
        }).then(({data}) => get(data, 'data.CreateReviewImage', null))

export default createImage;