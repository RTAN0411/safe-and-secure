import React, {useState, useContext} from 'react';
import {TextInput, ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert, Image, LogBox} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import findNearestNPC from '../components/FindNearestNPC'
import MapContext from '../Context/MapContext';
import * as Location from 'expo-location';
import * as firebase from 'firebase';

LogBox.ignoreAllLogs();

const fakeLocation = {latitude: 1.3447375617129493, longitude: 103.6873639335757} //NTU
/**
 * Displays form for users to report a crime.
 */
export default function FormPage(){
    const [nearestNPC, setNearestNPC] = useState('');
    const {addCase} = useContext(MapContext)
    const [textInputName, setTextInputName] = useState('');
    const [textInputDesc, setTextInputDesc] = useState('');
    const [chosenCrimeType, setChosenCrimeType] = useState('');
    const [miscCrimeType, setMiscCrimeType] = useState('');
    const [image, setImage] = useState(null);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    var whatISaw = [];
    var whereISaw = null;

    const writeData = ({crimeType}) => {
        try{
            firebase.database().ref('reports/' + textInputName).set({
                Name: textInputName,
                Desc: textInputDesc,
                Location: `${latitude}, ${longitude}`,
                CrimeType: crimeType
            })
        } catch(err) {
            console.log(err);
        }
    }

    /**
     * This method verifies that the compulsory inputs have been entered
     * @returns void
     */
    const checkTextInput = () => {
        if (!textInputName.trim()) {
            Alert.alert('Please Enter Your Name');
            return;
        }

        if (chosenCrimeType == 'Others' && miscCrimeType == ''){
            Alert.alert('Please Specify the Type of Crime');
            return;
        }

        if (!textInputDesc.trim()) {
            Alert.alert('Please Enter Some Description');
            return;
        }

        if (latitude === 0 && longitude === 0) {
            Alert.alert('Please Enter Your Location');
            return;
        }

        if (chosenCrimeType == 'Others'){
            writeData({crimeType: miscCrimeType})
        } 
        else{
            writeData({crimeType: chosenCrimeType})
        }

        
        Alert.alert('Report submitted successfully'); 
        setTextInputName('')
        setTextInputDesc('')
        setImage(null)
        addCase({npc: nearestNPC})
        setChosenCrimeType('')
        setNearestNPC('')
        setLatitude(0)
        setLongitude(0)
    };
     /**
      * This method launches the camera to get images they want to upload
      */ 
    const launchCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            videoMaxDuration: 5,
          });
  
          if (!result.cancelled) {
              setImage(result.uri);
            }
    };
    /**
      * This method allows users to select the image they want
      */
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
          }
    };

    const pickLocation = async () => {
        var status = await Location.requestPermissionsAsync();
        if (status.status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }
        
        const location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
    }

    if(image === null){
        whatISaw =  <View style={styles.buttonsection}>      
                        <TouchableOpacity
                                style={styles.button}
                                onPress={() => pickImage()}
                                key = 'pickButton'>
                            <Text style={styles.inbutton}> Choose Image </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => launchCamera()}
                            key = 'cameraButton'>
                            <Text style={styles.inbutton}> Take Photo </Text>
                        </TouchableOpacity>
                    </View>
    }
    else{
        whatISaw = <View style={styles.imagesection}>
                        <TouchableOpacity 
                                style= {{alignSelf:"center"}} 
                                onPress ={()=>pickImage()}
                                key = 'picture'>
                            <Image source={{ uri: image }} style={{ width: 100, height: 100, alignSelf: 'center' }} />
                        </TouchableOpacity>
                   </View>
    }

    if(latitude === 0 && longitude === 0){
        whereISaw = <TouchableOpacity style = {styles.locationButton} onPress = {async() => {pickLocation(),
            setNearestNPC(findNearestNPC({latitude: fakeLocation.latitude, longitude: fakeLocation.longitude}))}}>
                        <Text style = {styles.inbutton}>Add Location</Text>
                    </TouchableOpacity>
    }
    else{
        whereISaw = [<Text key = 'text' style = {{fontSize: 15, alignSelf: 'center'}} onPress = {async() => {pickLocation(),
            setNearestNPC(findNearestNPC({latitude: fakeLocation.latitude, longitude: fakeLocation.longitude}))}}>
                        {latitude}, {longitude}
                    </Text>,
                    <TouchableOpacity style = {styles.locationButton} key = 'button'>
                        <Text style = {styles.inbutton}>Change Location</Text>
                    </TouchableOpacity>]
    }

    return(
        <ScrollView style={styles.repform}>
            <Text style={styles.header1}>Report A Crime</Text>

            <Text style={styles.header2}>NAME{'    '}</Text>  
            <TextInput style={styles.textinput} 
                        placeholder="Your Name (Required)"
                        value = {textInputName}
                        onChangeText={
                            (value) => setTextInputName(value)}
                        maxLength={300}
                        multiline = {true}
                        autoCapitalize = 'none'
                        underlineColorAndroid={'transparent'}/>

            <Text style={styles.header2}>WHAT I SAW{'\n'}</Text>      
     
            {whatISaw} 
                
                <Text style={styles.header2}>WHAT HAPPENED{'    '}</Text> 
                <TextInput style={styles.textinput2} 
                            multiline = {true}
                            maxLength = {300}
                            placeholder="Description (Required) (Not more than 300 words)"
                            value = {textInputDesc}
                            onChangeText={
                                (value) => setTextInputDesc(value)} 
                            autoCapitalize = 'none'
                            underlineColorAndroid={'transparent'}/>

                <Text style={styles.header2}>I SAW THIS AT{'    '}</Text>  
                
                {whereISaw}

                <Text style={styles.header2}>TYPE OF CRIME{'    '}</Text> 
                <Picker
                    style={styles.picker}
                    selectedValue={chosenCrimeType}
                    onValueChange={(itemValue, itemIndex) => setChosenCrimeType(itemValue)}>
                    <Picker.Item label="Illegal Money Lending" value="Illegal Money Lending" />
                    <Picker.Item label="Major Incidents/ Crisis" value="Major Incidents/ Crisis" />
                    <Picker.Item label="Respond to Appeal for Witnesses" value="Appeal - Witnesses" />
                    <Picker.Item label="Respond to Appeal for Next-of-Kin" value="Appeal - Next-of-Kin" />
                    <Picker.Item label="Respond to Appeal for Missing Persons" value="Appeal - Missing Persons" />
                    <Picker.Item label="Scams" value="Scams" />
                    <Picker.Item label="Secret Societies/ Gangs" value="Secret Societies/ Gangs" />
                    <Picker.Item label="Traffic Matters" value="Traffic Matters" />
                    <Picker.Item label="Vice/ Gambling" value="Vice/ Gambling" />
                    <Picker.Item label="Others" value="Others" />
                </Picker>
                {chosenCrimeType == "Others" &&
                            <TextInput style={styles.textinput} 
                                            placeholder="Type of Crime (Required)"
                                            onChangeText={
                                                (value) => setMiscCrimeType(value)} 
                                            underlineColorAndroid={'transparent'}/>
                }

                <TouchableOpacity style={styles.button} onPress = {() => checkTextInput()}>
                    <Text style = {styles.inbutton}>Submit</Text>
                </TouchableOpacity>
                <Text>{"\n"}</Text>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    repform: {
        alignSelf: 'stretch',
        flex: 2,
        padding: 25,
    },

    header1: {
        fontSize: 24,
        color: '#000',
        paddingBottom: 5,
        marginBottom: 30,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },

    header2: {
        fontWeight: 'bold',
        fontSize: 17,
    },

    textinput: {
        alignSelf: 'stretch',
        width: '100%',
        height: 40,
        marginBottom: 20,
        color:'#000',
        borderBottomColor: '#000080',
        borderBottomWidth: 1,
    },

    textinput2: {
        alignSelf: 'stretch',
        width: '100%',
        height: 80,
        marginBottom: 20,
        color:'#000',
        borderBottomColor: '#000080',
        borderBottomWidth: 1,
    },

    buttonsection: {
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: 'space-around'
    },

    imagesection: {
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: 'space-around'
    },

    button: {
        backgroundColor: '#000080',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: 'center'
    },
    locationButton: {
        backgroundColor: '#000080',
        borderRadius: 5,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignSelf: 'center',
        alignItems: 'center'
    },

    inbutton: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    picker: {
        height: 50, 
        width: '100%',
        color: '#000'
    }
})