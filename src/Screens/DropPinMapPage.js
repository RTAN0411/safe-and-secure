import React, {useState} from 'react'
import {View , Text, StyleSheet, TouchableOpacity} from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import npcInfo from '../../assets/npcInfo.json';
import DropPinTab from '../components/DropPinTab';

/**
 * Processes information on different police divisions.
 * @param {*} division - The police divison that the npc's jurisdiction is under.
 */
const ProcessInfo = ({division, output}) => {
    const divisionFilter = npcInfo.filter(item => {return(item.division === division)});
    try{
        switch(output){
            case "dLatitude":{
                return(divisionFilter[0].coordinates.latitude);
            }
            case "dLongitude":{
                return(divisionFilter[0].coordinates.longitude);
            }
            case "stations": {
                return(divisionFilter[0].stations);
            }
            default: return null
        }
    }catch(err){
        console.log(err)
        return null
    }
}

/**
 * Displays Drop Pin Page where locations of police stations are shown on map via drop pins.
 */
const DropPinMapPage = ({route}) => {
    const {division, year} = route.params;
    const [activeStation, setActiveStation] = useState('');
    var markers = [];

    for(var i = 0; i < ProcessInfo({division, output: "stations"}).length; i++){
        const stationName = ProcessInfo({division, output: "stations"})[i].name
        markers.push(<Marker key = {i}
        coordinate = {{latitude: ProcessInfo({division, output: "stations"})[i].latitude, 
                       longitude: ProcessInfo({division, output: "stations"})[i].longitude}}
        title = {stationName}
        onPress = {() => setActiveStation(stationName)}
        />)
    }

    return (
        <View style ={styles.mainView}>
            <MapView 
                initialRegion={{
                    latitude: ProcessInfo({division, output: "dLatitude"}),
                    longitude: ProcessInfo({division, output: 'dLongitude'}),
                    latitudeDelta: 0.13,
                    longitudeDelta: 0.13,
                }}
                style ={styles.map}
                zoomEnabled = {false}
                moveOnMarkerPress={false}
            >
                {markers}
            </MapView>
            <Text style = {styles.topText}>{division}</Text>
            <DropPinTab division = {division} station = {activeStation} year = {year} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
    },
    map: {
        height: 613,
    },
    topText:{
        position:'absolute',
        fontSize: 20,
        paddingHorizontal: 5,
        paddingVertical: 2,
        top: 10,
        left: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: '#151B54'
    },
    topText1:{
        position:'absolute',
        fontSize: 20,
        paddingHorizontal: 5,
        paddingVertical: 2,
        top: 50,
        left: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: '#151B54'
    },
    topText2:{
        position:'absolute',
        fontSize: 20,
        paddingHorizontal: 5,
        paddingVertical: 2,
        top: 10,
        right: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: '#151B54'
    },
});

export default DropPinMapPage;