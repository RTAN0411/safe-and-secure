import React, {useEffect, useState} from 'react';
import NewsAPI from '../Api/NewsAPI';

/**
 * Fetches data from various news channels.
 */
export default () => {
    const [newsResults,setNewsResults] = useState([]);
    const [newsErrorMessage,setNewsErrorMessage] = useState('');

    const getArticle = async() =>{
        try{
            const response = await NewsAPI.get("/everything",{
            params:{
                q:"Crime and Singapore",
                sortBy: 'relevancy',
                domains :"channelnewsasia.com, straitstimes.com, todayonline.com, asiaone.com, tnp.sg",
            },
        });
        setNewsResults(response.data.articles);
        }catch{setNewsErrorMessage('Connection Error')}

        console.log(newsErrorMessage)
    };

    useEffect(()=>{getArticle();},[]);

    return[getArticle, newsResults, newsErrorMessage];
}