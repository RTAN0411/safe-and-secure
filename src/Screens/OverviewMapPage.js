import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Settings} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import YearButton from '../components/YearButton';
import Data from '../../assets/Data.json';
import {Feather} from '@expo/vector-icons';
import MapContext from '../Context/MapContext'

/**
 * Styles for each Circle on the map
 */
const redCircle = [3000, '#C11B17', 'rgba(193,27,23,0.7)'];
const orangeCircle = [2500, '#F88017', 'rgba(248,126,23,0.7)'];
const greenCircle = [2000, '#52D017', 'rgba(82,208,23,0.7)'];

/**
 * Filters database to obtain the desired value
 * @param {*} year - The year of the crimes displayed.
 * @param {*} npc - The name of the neighbourhood police centre.
 */
const Processing = ({year, npc}) => {
    const filtered = Data.filter(item => {return(item.year === year && item.level_1 === npc)});
    return(filtered[0].value);
}

/**
 * Displays Overview Maps page for users to see the cases in each division
 */
const OverviewMaps = ({navigation}) => {
    const {mapData} = useContext(MapContext)
    const [currentYear, setCurrentYear] = useState(2020);
    const [centralCircle, setCentralCircle] = useState([]);
    const [clementiCircle, setClementiCircle] = useState([]);
    const [tanglinCircle, setTanglinCircle] = useState([]);
    const [amkCircle, setAmkCircle] = useState([]);
    const [bedokCircle, setBedokCircle] = useState([]);
    const [jurongCircle, setJurongCircle] = useState([]);
    const [woodlandsCircle, setWoodlandsCircle] = useState([]);
    const [centralCases, setCentralCases] = useState(mapData[0]);
    const [clementiCases, setClementiCases] = useState(mapData[1]);
    const [tanglinCases, setTanglinCases] = useState(mapData[2]);
    const [amkCases, setAmkCases] = useState(mapData[3]);
    const [bedokCases, setBedokCases] = useState(mapData[4]);
    const [jurongCases, setJurongCases] = useState(mapData[5]);
    const [woodlandsCases, setWoodlandsCases] = useState(mapData[6]);
    const [button2020, setButton2020] = useState(1);
    const [button2019, setButton2019] = useState(0);
    const [button2018, setButton2018] = useState(0);
    const [button2017, setButton2017] = useState(0);
    const [button2016, setButton2016] = useState(0);
    var woodlandsNo = null;

    const setButton = ({year}) => {
        switch (year){
            case 2020: {
                setButton2020(1)
                setButton2019(0)
                setButton2018(0)
                setButton2017(0)
                setButton2016(0)
                break
            }
            case (2019):{
                setButton2020(0)
                setButton2019(1)
                setButton2018(0)
                setButton2017(0)
                setButton2016(0)
                break
            }
            case (2018):{
                setButton2020(0)
                setButton2019(0)
                setButton2018(1)
                setButton2017(0)
                setButton2016(0)
                break
            }
            case (2017):{
                setButton2020(0)
                setButton2019(0)
                setButton2018(0)
                setButton2017(1)
                setButton2016(0)
                break
            }
            case (2016):{
                setButton2020(0)
                setButton2019(0)
                setButton2018(0)
                setButton2017(0)
                setButton2016(1)
                break
            }
            default: break
        }
    }
/**
 * Creates the circles based on year to be displayed on the map
 * @param {*} year - The year of the crimes displayed.
 * @param {*} npc - The name of the neighbourhood police centre.
 */

    const createCircle = ({year, npc}) => {
        var cases = Processing({year,npc})
        
        if(year != 2020){
            switch (npc){
                case 'Central Police Division - Total':{
                    setCentralCases(cases)
                    if(cases > 400)
                        setCentralCircle(redCircle)
                    else if (cases > 200)
                        setCentralCircle(orangeCircle)
                    else
                        setCentralCircle(greenCircle)
                    break
                }
                case 'Clementi Police Division - Total':{
                    setClementiCases(cases)
                    if(cases > 400)
                        setClementiCircle(redCircle)
                    else if (cases > 200)
                        setClementiCircle(orangeCircle)
                    else
                        setClementiCircle(greenCircle)
                    break
                }
                case 'Tanglin Police Division - Total':{
                    setTanglinCases(cases)
                    if(cases > 400)
                        setTanglinCircle(redCircle)
                    else if (cases > 200)
                        setTanglinCircle(orangeCircle)
                    else
                        setTanglinCircle(greenCircle)
                    break
                }
                case 'Ang Mo Kio Police Division - Total':{
                    setAmkCases(cases)
                    if(cases > 400)
                        setAmkCircle(redCircle)
                    else if (cases > 200)
                        setAmkCircle(orangeCircle)
                    else
                        setAmkCircle(greenCircle)
                    break
                }
                case 'Bedok Police Division - Total':{
                    setBedokCases(cases)
                    if(cases > 400)
                        setBedokCircle(redCircle)
                    else if (cases > 200)
                        setBedokCircle(orangeCircle)
                    else
                        setBedokCircle(greenCircle)
                    break
                }
                case 'Jurong Police Division - Total':{
                    setJurongCases(cases)
                    if(cases > 400)
                        setJurongCircle(redCircle)
                    else if (cases > 200)
                        setJurongCircle(orangeCircle)
                    else
                        setJurongCircle(greenCircle)
                    break
                }
                case 'Woodlands Police Division - Total':{
                    setWoodlandsCases(cases)
                    if(cases > 400)
                        setWoodlandsCircle(redCircle)
                    else if (cases > 200)
                        setWoodlandsCircle(orangeCircle)
                    else
                        setWoodlandsCircle(greenCircle)
                    break
                }
                default:
                    break
            }
        }
        else{
            switch (npc){
                case 'Central Police Division - Total':{
                    cases = mapData[0]
                    setCentralCases(cases)
                    if(cases > 400)
                        setCentralCircle(redCircle)
                    else if (cases > 200)
                        setCentralCircle(orangeCircle)
                    else
                        setCentralCircle(greenCircle)
                    break
                }
                case 'Clementi Police Division - Total':{
                    cases = mapData[1]
                    setClementiCases(cases)
                    if(cases > 400)
                        setClementiCircle(redCircle)
                    else if (cases > 200)
                        setClementiCircle(orangeCircle)
                    else
                        setClementiCircle(greenCircle)
                    break
                }
                case 'Tanglin Police Division - Total':{
                    cases = mapData[2]
                    setTanglinCases(cases)
                    if(cases > 400)
                        setTanglinCircle(redCircle)
                    else if (cases > 200)
                        setTanglinCircle(orangeCircle)
                    else
                        setTanglinCircle(greenCircle)
                    break
                }
                case 'Ang Mo Kio Police Division - Total':{
                    cases = mapData[3]
                    setAmkCases(cases)
                    if(cases > 400)
                        setAmkCircle(redCircle)
                    else if (cases > 200)
                        setAmkCircle(orangeCircle)
                    else
                        setAmkCircle(greenCircle)
                    break
                }
                case 'Bedok Police Division - Total':{
                    cases = mapData[4]
                    setBedokCases(cases)
                    if(cases > 400)
                        setBedokCircle(redCircle)
                    else if (cases > 200)
                        setBedokCircle(orangeCircle)
                    else
                        setBedokCircle(greenCircle)
                    break
                }
                case 'Jurong Police Division - Total':{
                    cases = mapData[5]
                    setJurongCases(cases)
                    if(cases > 400)
                        setJurongCircle(redCircle)
                    else if (cases > 200)
                        setJurongCircle(orangeCircle)
                    else
                        setJurongCircle(greenCircle)
                    break
                }
                case 'Woodlands Police Division - Total':{
                    cases = mapData[6]
                    setWoodlandsCases(cases)
                    if(cases > 400)
                        setWoodlandsCircle(redCircle)
                    else if (cases > 200)
                        setWoodlandsCircle(orangeCircle)
                    else
                        setWoodlandsCircle(greenCircle)
                    break
                }
                default:
                    break
            }
        }
    }

    useEffect(() => {createCircle({year:2020,npc:'Central Police Division - Total'}),
    createCircle({year:2020,npc:'Clementi Police Division - Total'}),
    createCircle({year:2020,npc:'Tanglin Police Division - Total'}),
    createCircle({year:2020,npc:'Ang Mo Kio Police Division - Total'}),
    createCircle({year:2020,npc:'Bedok Police Division - Total'}),
    createCircle({year:2020,npc:'Jurong Police Division - Total'}),
    createCircle({year:2020,npc:'Woodlands Police Division - Total'})}, []);
    
    if(woodlandsCases < 100){
        woodlandsNo = <Text style = {styles.woodlandsNPClow}>{woodlandsCases}</Text>
    }
    else if(woodlandsCases === '-'){
        woodlandsNo = <Text style = {styles.woodlandsNPCblank}>{woodlandsCases}</Text>
    }
    else{
        woodlandsNo = <Text style = {styles.woodlandsNPC}>{woodlandsCases}</Text>
    }
    
    /**
     * This method return the map with all its various components on the screen
     */
    return (
        <View style ={styles.mainView}>
                    
            <MapView 
                initialRegion={{
                    latitude: 1.3521,
                    longitude: 103.8198,
                    latitudeDelta: 0.45,
                    longitudeDelta: 0.45,
                }}
                style ={styles.map}
                scrollEnabled = {false}
                zoomEnabled = {false}
            >
                <Circle 
                    center = {{latitude: 1.2788614578255255, longitude: 103.83987024497543}}
                    radius = {parseInt(centralCircle[0])}
                    strokeColor = {centralCircle[1]}
                    fillColor = {centralCircle[2]}
                />
                <Circle 
                    center = {{latitude: 1.3175993010310953, longitude: 103.76670211243713}}
                    radius = {parseInt(clementiCircle[0])}
                    strokeColor = {clementiCircle[1]}
                    fillColor = {clementiCircle[2]}
                />
                <Circle 
                    center = {{latitude: 1.3123735276639719, longitude: 103.84668619709355}}
                    radius = {parseInt(tanglinCircle[0])}
                    strokeColor = {tanglinCircle[1]}
                    fillColor = {tanglinCircle[2]}
                />
                <Circle 
                    center = {{latitude: 1.3848278158574836, longitude: 103.84510226825778}}
                    radius = {parseInt(amkCircle[0])}
                    strokeColor = {amkCircle[1]}
                    fillColor = {amkCircle[2]}
                />
                <Circle 
                    center = {{latitude: 1.3327460917727163, longitude: 103.93724638545254}}
                    radius = {parseInt(bedokCircle[0])}
                    strokeColor = {bedokCircle[1]}
                    fillColor = {bedokCircle[2]}
                />
                <Circle 
                    center = {{latitude: 1.3514122677615763, longitude: 103.70229272778073}}
                    radius = {parseInt(jurongCircle[0])}
                    strokeColor = {jurongCircle[1]}
                    fillColor = {jurongCircle[2]}
                />
                <Circle 
                    center = {{latitude: 1.4351664066032883, longitude: 103.77903320046464}}
                    radius = {parseInt(woodlandsCircle[0])}
                    strokeColor = {woodlandsCircle[1]}
                    fillColor = {woodlandsCircle[2]}
                />
            </MapView>
            <Text style = {styles.centralNPC}>{centralCases}</Text>
            <TouchableOpacity style = {styles.centralNPC} onPress = {() => navigation.navigate('Drop Pin Map', 
            {division: 'Central Police Division', year: currentYear})}>
                <View/>
            </TouchableOpacity>
            <Text style = {styles.clementiNPC}>{clementiCases}</Text>
            <TouchableOpacity style = {styles.clementiNPC} onPress = {() => navigation.navigate('Drop Pin Map', 
            {division: 'Clementi Police Division', year: currentYear})}>
                <View/>
            </TouchableOpacity>
            <Text style = {styles.tanglinNPC}>{tanglinCases}</Text>
            <TouchableOpacity style = {styles.tanglinNPC} onPress = {() => navigation.navigate('Drop Pin Map', 
            {division: 'Tanglin Police Division', year: currentYear})}>
                <View/>
            </TouchableOpacity>
            <Text style = {styles.amkNPC}>{amkCases}</Text>
            <TouchableOpacity style = {styles.amkNPC} onPress = {() => navigation.navigate('Drop Pin Map', 
            {division: 'Ang Mo Kio Police Division', year: currentYear})}>
                <View/>
            </TouchableOpacity>
            <Text style = {styles.bedokNPC}>{bedokCases}</Text>
            <TouchableOpacity style = {styles.bedokNPC} onPress = {() => navigation.navigate('Drop Pin Map', 
            {division: 'Bedok Police Division', year: currentYear})}>
                <View/>
            </TouchableOpacity>
            <Text style = {styles.jurongNPC}>{jurongCases}</Text>
            <TouchableOpacity style = {styles.jurongNPC} onPress = {() => navigation.navigate('Drop Pin Map', 
            {division: 'Jurong Police Division', year: currentYear})}>
                <View/>
            </TouchableOpacity>
            {woodlandsNo}
            <TouchableOpacity style = {styles.woodlandsNPC} onPress = {() => navigation.navigate('Drop Pin Map', 
                        {division: 'Woodlands Police Division', year: currentYear})}>
                <View/>
            </TouchableOpacity>
            <View style = {styles.btmView}>
                <Text style = {styles.header}>Legend:</Text>
                <Text style = {styles.red}>Red - 400 or more crimes committed</Text>
                <Text style = {styles.orange}>Orange - 201 to 399 crimes committed</Text>
                <Text style = {styles.green}>Green - 200 or less crimes committed</Text>
            </View>
            <Text style ={styles.topText}>Filter by Year:</Text>
            <View style = {styles.yearView}>
                <YearButton year = '2020' pressed = {button2020} updateCircle = {() => {
                    setButton({year:2020}),
                    setCurrentYear(2020),
                    createCircle({year:2020,npc:'Central Police Division - Total'}),
                    createCircle({year:2020,npc:'Clementi Police Division - Total'}),
                    createCircle({year:2020,npc:'Tanglin Police Division - Total'}),
                    createCircle({year:2020,npc:'Ang Mo Kio Police Division - Total'}),
                    createCircle({year:2020,npc:'Bedok Police Division - Total'}),
                    createCircle({year:2020,npc:'Jurong Police Division - Total'}),
                    createCircle({year:2020,npc:'Woodlands Police Division - Total'})
                    }}/>
                <YearButton year = '2019' pressed = {button2019} updateCircle = {() => {
                    setButton({year:2019}),
                    setCurrentYear(2019),
                    createCircle({year:2019,npc:'Central Police Division - Total'}),
                    createCircle({year:2019,npc:'Clementi Police Division - Total'}),
                    createCircle({year:2019,npc:'Tanglin Police Division - Total'}),
                    createCircle({year:2019,npc:'Ang Mo Kio Police Division - Total'}),
                    createCircle({year:2019,npc:'Bedok Police Division - Total'}),
                    createCircle({year:2019,npc:'Jurong Police Division - Total'}),
                    createCircle({year:2019,npc:'Woodlands Police Division - Total'})
                    }}/>
                <YearButton year = '2018' pressed = {button2018} updateCircle = {() => {
                    setButton({year:2018}),
                    setCurrentYear(2018),
                    createCircle({year:2018,npc:'Central Police Division - Total'}),
                    createCircle({year:2018,npc:'Clementi Police Division - Total'}),
                    createCircle({year:2018,npc:'Tanglin Police Division - Total'}),
                    createCircle({year:2018,npc:'Ang Mo Kio Police Division - Total'}),
                    createCircle({year:2018,npc:'Bedok Police Division - Total'}),
                    createCircle({year:2018,npc:'Jurong Police Division - Total'}),
                    createCircle({year:2018,npc:'Woodlands Police Division - Total'})
                    }}/>
                <YearButton year = '2017' pressed = {button2017} updateCircle = {() => {
                    setButton({year:2017}),
                    setCurrentYear(2017),
                    createCircle({year:2017,npc:'Central Police Division - Total'}),
                    createCircle({year:2017,npc:'Clementi Police Division - Total'}),
                    createCircle({year:2017,npc:'Tanglin Police Division - Total'}),
                    createCircle({year:2017,npc:'Ang Mo Kio Police Division - Total'}),
                    createCircle({year:2017,npc:'Bedok Police Division - Total'}),
                    createCircle({year:2017,npc:'Jurong Police Division - Total'}),
                    createCircle({year:2017,npc:'Woodlands Police Division - Total'})
                    }}/>
                <YearButton year = '2016' pressed = {button2016} updateCircle = {() => {
                    setButton({year:2016}), 
                    setCurrentYear(2016),
                    createCircle({year:2016,npc:'Central Police Division - Total'}),
                    createCircle({year:2016,npc:'Clementi Police Division - Total'}),
                    createCircle({year:2016,npc:'Tanglin Police Division - Total'}),
                    createCircle({year:2016,npc:'Ang Mo Kio Police Division - Total'}),
                    createCircle({year:2016,npc:'Bedok Police Division - Total'}),
                    createCircle({year:2016,npc:'Jurong Police Division - Total'}),
                    createCircle({year:2016,npc:'Woodlands Police Division - Total'})}}/>
            </View>
            <TouchableOpacity onPress = {() => {
                setButton({year:2020}),
                setCurrentYear(2020),
                createCircle({year:2020,npc:'Central Police Division - Total'}),
                createCircle({year:2020,npc:'Clementi Police Division - Total'}),
                createCircle({year:2020,npc:'Tanglin Police Division - Total'}),
                createCircle({year:2020,npc:'Ang Mo Kio Police Division - Total'}),
                createCircle({year:2020,npc:'Bedok Police Division - Total'}),
                createCircle({year:2020,npc:'Jurong Police Division - Total'}),
                createCircle({year:2020,npc:'Woodlands Police Division - Total'})
                }}
                style = {styles.iconStyle}>
                <Feather name="refresh-cw" size={30} color="black"/>
            </TouchableOpacity>  
        </View>
    );
};



const styles = StyleSheet.create({
    mainView:{
        flex: 1,
    },
    yearView:{
        position:'absolute',
        flexDirection: 'row',
        top: 55,
        left: 10,
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
    },
    btmView:{
        position:'absolute',
        borderWidth: 0.5,
        top: 480,
        left: 60,
        width: 270,
        backgroundColor: 'white'
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
    map: {
        height: '100%',
    },
    centralNPC:{
        position: 'absolute',
        top: 358,
        left: 201,
        fontSize: 15,
        color: 'black',
        height: 30,
        width: 30
    },
    clementiNPC:{
        position: 'absolute',
        top: 324,
        left: 137,
        fontSize: 15,
        color: 'black',
        height: 30,
        width: 30
    },
    tanglinNPC:{
        position: 'absolute',
        top: 329,
        left: 207,
        fontSize: 15,
        color: 'black',
        height: 30,
        width: 30
    },
    amkNPC:{
        position: 'absolute',
        top: 265,
        left: 206,
        fontSize: 15,
        color: 'black',
        height: 30,
        width: 30
    },
    bedokNPC:{
        position: 'absolute',
        top: 311,
        left: 286,
        fontSize: 15,
        color: 'black',
        height: 30,
        width: 30
    },
    jurongNPC:{
        position: 'absolute',
        top: 294,
        left: 81,
        fontSize: 15,
        color: 'black',
        height: 30,
        width: 30
    },
    woodlandsNPC:{
        position: 'absolute',
        top: 221,
        left: 148,
        fontSize: 15,
        color: 'black',
        height: 30,
        width: 30
    },
    woodlandsNPClow:{
        position: 'absolute',
        top: 221,
        left: 151,
        fontSize: 15,
        color: 'black',
        height: 30,
        width: 30
    },
    woodlandsNPCblank:{
        position: 'absolute',
        top: 221,
        left: 158,
        fontSize: 15,
        color: 'black',
        height: 30,
        width: 30
    },
    header: {
        paddingLeft: 5
    },
    red: {
        paddingLeft: 5,
        color: '#C11B17'
    },
    orange: {
        paddingLeft: 5,
        color: '#F88017'

    },
    green: {
        paddingLeft: 5,
        color: '#52D017'
    },
    iconStyle:{
        position: 'absolute',
        top: 5,
        right: 15
    }
});

export default OverviewMaps;