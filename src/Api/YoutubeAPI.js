import axios from 'axios';
const KEY = '' //INSERT YOUR API KEY HERE

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
