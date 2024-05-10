import React, {useState} from 'react';
import {View , Text, StyleSheet, TouchableOpacity} from 'react-native';
import ProcessNews from '../components/ProcessNews'
import NewsList from '../components/NewsList'
import ProcessYT from '../components/ProcessYT';
import VideoList from '../components/VideoList';
import {useNavigation} from '@react-navigation/native'

/**
 * Displays Information Page. 
 * Contains News and Education Components. 
 */
const InformationPage =() =>{
    const [page, setPage] = useState('News');
    const [getArticle, newsResults, newsErrorMessage] = ProcessNews();
    const [getVideo, videoResults, videoErrorMessage] = ProcessYT();
    const navigation = useNavigation()
    var showPage = null;
    var newsButton = null;  
    var educationButton = null;
    

    if(page === 'News'){
        showPage = [{newsErrorMessage} === '' ? <Text key = 'error' style = {styles.errorText}>{newsErrorMessage}</Text> : null,
                    <NewsList results = {newsResults} title='Latest News' navigation={navigation} key = 'results'/>]
        newsButton = <TouchableOpacity style = {styles.newsButtonPressed} onPress = {() => setPage('News')}>
                        <Text style = {styles.buttonTextSelected}>News</Text>
                    </TouchableOpacity>
        educationButton = <TouchableOpacity style = {styles.educationButtonUnpressed} onPress = {() => setPage('Education')}>
                            <Text style = {styles.buttonText}>Education</Text>
                        </TouchableOpacity>
    }
    else{
        showPage = [{videoErrorMessage} === '' ? <Text key = 'error' style = {styles.errorText}>{videoErrorMessage}</Text> : null,
                    <VideoList results = {videoResults} navigation={navigation} key = 'results'/>]
        newsButton = <TouchableOpacity style = {styles.newsButtonUnpressed} onPress = {() => setPage('News')}>
                        <Text style = {styles.buttonText}>News</Text>
                    </TouchableOpacity>
        educationButton = <TouchableOpacity style = {styles.educationButtonPressed} onPress = {() => setPage('Education')}>
                            <Text style = {styles.buttonTextSelected}>Education</Text>
                        </TouchableOpacity>
    }

    return(
        <View style = {styles.mainView}>
            <View style = {styles.topView}>
                {newsButton}
                {educationButton}
            </View>
            {showPage}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonTextSelected:{
        alignSelf: 'center',
        fontSize: 20,
        color: '#FFFFFF'
    },
    buttonText:{
        alignSelf: 'center',
        fontSize: 20,
        color: '#000000'
    },
    newsButtonUnpressed:{
        alignSelf: 'center',
        height: 33,
        borderWidth: 2,
        borderRightWidth: 1,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: '#FFFFFF',
        borderColor: '#151B54',
    },
    newsButtonPressed:{
        alignSelf: 'center',
        height: 33,
        borderWidth: 2,
        borderRightWidth: 1,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: '#151B54',
        borderColor: '#151B54',
    },
    educationButtonUnpressed:{
        alignSelf: 'center',
        height: 33,
        borderWidth: 2,
        borderLeftWidth: 1,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: '#FFFFFF',
        borderColor: '#151B54',
    },
    educationButtonPressed:{
        alignSelf: 'center',
        height: 33,
        borderWidth: 2,
        borderLeftWidth: 1,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,  
        paddingHorizontal: 5,
        backgroundColor: '#151B54',
        borderColor: '#151B54',
    },
    topView:{
        alignSelf: 'stretch',
        height: 50,
        flexDirection: 'row',
        paddingLeft: 113,
        marginVertical: 5
    },
    mainView: {
        flex: 1
    },
    errorText: {
        alignSelf: 'center',
        fontSize: 20,
        marginVertical: 30
    }
});

export default InformationPage;