import axios from 'axios';
const KEY = 'AIzaSyCVIwSL73-rqCC7SWbsWibLFh7mHv3ceoY'

/**
 * Get the API from online website
 */
export default axios.create({
    baseURL:'https://www.googleapis.com/youtube/v3',
    params:{
        key: KEY,
        part: 'snippet',
        maxResults: 10
    }
})
