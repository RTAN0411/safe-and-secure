import React from 'react'
import {View , Text, StyleSheet } from 'react-native'
import Data from '../../assets/Data.json';
import npcInfo from '../../assets/npcInfo.json';

/**
 * Filters database to obtain the desired value
 * @param {*} year - The year of the crimes displayed.
 * @param {*} npc - The name of the neighbourhood police centre.
 */
const ProcessCases = ({year, npc}) => {
    const filtered = Data.filter(item => {return(item.year === year && item.level_1 === npc)});
    return(filtered[0].value);
}

/**
 * Filters data to obtain the desired information.
 * @param {*} division - The police divison that the npc's jurisdiction is under.
 * @param {*} station - The name of the police centre/station.
 * @param {*} output - The type of npc information to be displayed.
 */
const ProcessInfo = ({division, station, output}) => {
    const divisionFilter = npcInfo.filter(item => {return(item.division === division)});
    const stationFilter = divisionFilter[0].stations.filter(item => {return(item.name === station)})
    try{
        switch(output){
            case "name":{
                return(stationFilter[0].name);
            }
            case "address":{
                return(stationFilter[0].address);
            }
            case "hours":{
                return(stationFilter[0].hours);
            }
            case "phone":{
                return(stationFilter[0].phone);
            }
            default: return null
        }
    }catch(err){
        console.log(err)
        return null
    }
}

/**
 * Displays information of npc and number of crimes in respective years.
 * @param {*} division - The police divison that the npc's jurisdiction is under.
 * @param {*} station - The name of the police centre/station.
 * @param {*} year - The year of the crimes displayed.
 */
const DropPinTab = ({division, station, year}) => {
    if(station === ''){
        return(
            <View style = {styles.viewStyle}>
                <Text style = {styles.blankStyle}> Please select an NPC to view details</Text>
            </View>
        );
    } else {
        return(
            <View style = {styles.viewStyle}>
                <Text style = {styles.headerStyle}>{station}</Text>
                <Text style = {styles.infoStyle}>Operating Hours: {ProcessInfo({division, station, output: "hours"})}</Text>
                <Text style = {styles.infoStyle}>Address: {ProcessInfo({division, station, output: "address"})}</Text>
                <Text style = {styles.infoStyle}>Tel: {ProcessInfo({division, station, output: "phone"})}</Text>
                <Text style = {styles.infoStyle}>Total number of crimes in {year}: {ProcessCases({year, npc: `${division} - ${station}`})}</Text>
            </View>
        );
    }   
}

const styles = StyleSheet.create({
    viewStyle:{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '35%',
        backgroundColor: '#BCC6CC',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingHorizontal: 10,
    },
    headerStyle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#151B54',
        paddingTop: 25,
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    infoStyle:{
        fontSize: 17,        
        color: '#151B54',
        paddingVertical: 2,
        paddingHorizontal: 20
    },
    blankStyle:{
        alignSelf: 'center',
        fontSize: 20,        
        color: '#151B54',
        paddingVertical: 80
    }
});

export default DropPinTab;