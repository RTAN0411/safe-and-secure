import axios from 'axios';

/**
 * Get the API from online website
 */
export default axios.create({
    baseURL:'https://newsapi.org/v2',
    headers:{
        Authorization: 'Bearer 296d95035b0a4dd3b0df93d1b83096cc'
    }
}) 
