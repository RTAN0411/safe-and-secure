import React, {useEffect, useState} from 'react';
import YoutubeAPI from '../Api/YoutubeAPI';

/**
 * Fetches data from YouTube.
 */
export default () => {
    const [videoResults,setVideoResults] = useState([]);
    const [videoErrorMessage,setVideoErrorMessage] = useState('');

    const getVideo = async() =>{
        try{
            const response = await YoutubeAPI.get("/search",{
            params:{
                q:"crimewatch",
            },
        });
        setVideoResults(response.data.items);
        }catch{setVideoErrorMessage('Connection Error')}

        console.log(videoErrorMessage)
    };

    useEffect(()=>{getVideo();},[]);

    return[getVideo, videoResults, videoErrorMessage];
}