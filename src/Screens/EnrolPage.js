import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Alert, Linking, View, LogBox } from 'react-native';
import Checkbox from 'expo-checkbox';
import * as firebase from 'firebase';

LogBox.ignoreAllLogs();

/**
 * Displays Enrolment Page for users to enroll into neighbourhood watch program.
 */
const EnrolPage = () => {
    const [textInputName, setTextInputName] = useState('');
    const [textInputNRIC, setTextInputNRIC] = useState('');
    const [textInputPC, setTextInputPC] = useState('');
    const [textInputNumber, setTextInputNumber] = useState('');
    const [agree1, setAgree1] = useState(false);
    const [agree2, setAgree2] = useState(false);

    const writeData = () => {
        try{
            firebase.database().ref('users/' + textInputNRIC).set({
                Name: textInputName,
                NRIC: textInputNRIC,
                PostalCode: textInputPC,
                PhoneNumber: textInputNumber
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
            Alert.alert('Please enter your name');
            return;
        }

        if (!textInputNRIC.trim()) {
            Alert.alert('Please enter your NRIC/FIN');
            return;
        }

        if (textInputNRIC.trim().length != 9 || 
            !isNaN(textInputNRIC.charAt(0)) ||
            !isNaN(textInputNRIC.charAt(8)) ||
            isNaN(textInputNRIC.substr(1,7))) {
            Alert.alert('Please enter a valid NRIC/FIN');
            return;
        }
        
        if (!textInputPC.trim()) {
            Alert.alert('Please enter your postal code');
            return;
        }

        if (textInputPC.trim().length != 6) {
            Alert.alert('Please enter a valid postal code');
            return;
        }

        if (!textInputNumber.trim()) {
            Alert.alert('Please enter your phone number');
            return;
        }

        if (textInputNumber.trim().length != 8 || (textInputNumber.charAt(0) != 9 && textInputNumber.charAt(0) != 8)) {
            Alert.alert('Please enter a valid phone number');
            return;
        }

        if (!agree1 || !agree2) {
            Alert.alert('Please agree to the Terms & Conditions');
            return;
        }

        Alert.alert('Sign up form submitted successfully');
        writeData()
        setTextInputName('')
        setTextInputNRIC('')
        setTextInputPC('')
        setTextInputNumber('')
        setAgree1(false)
        setAgree2(false)
    };

    return(
        <ScrollView style={styles.regform}>
            <Text style={styles.header1}>Neighbourhood Watch Signup</Text>
            <Text style={styles.desc1}>Are you keen to patrol your neighbourhood? {"\n"}
              Keep an eye out for your vicinity? {"\n"}
              If you are, join us today!</Text>
            <Text style={styles.desc2}>For more information, click{" "}  
            <Text style={styles.link} onPress={ ()=>Linking.openURL('https://www.police.gov.sg/Community/Community-Programmes/Neighbourhood-Watch-Zone') } >
                here
            </Text>
            <Text>.</Text>
            </Text>

            <Text style={styles.header3}>Name</Text>
            <TextInput style={styles.textinput} 
                        placeholder="Enter your name..."
                        value = {textInputName}
                        onChangeText={
                            term => setTextInputName(term)}
                        underlineColorAndroid={'transparent'}/>

            <Text style={styles.header3}>NRIC/ FIN</Text>
            <TextInput style={styles.textinput} 
                        placeholder="Enter your NRIC/FIN..."
                        maxLength = {9}
                        value = {textInputNRIC}
                        onChangeText={
                            term => setTextInputNRIC(term)} 
                        underlineColorAndroid={'transparent'}/>
            
            <Text style={styles.header3}>Postal Code</Text>
            <TextInput style={styles.textinput} 
                        placeholder="Enter your postal code..."
                        keyboardType={'numeric'} 
                        maxLength = {6}
                        value = {textInputPC}
                        onChangeText={
                            term => setTextInputPC(term)}
                        underlineColorAndroid={'transparent'}/>
            
            <Text style={styles.header3}>Phone Number</Text>
            <TextInput style={styles.textinput} 
                        placeholder="Enter your phone number..."
                        keyboardType={'numeric'} 
                        maxLength = {8}
                        value = {textInputNumber}
                        onChangeText={
                            term => setTextInputNumber(term)}
                        underlineColorAndroid={'transparent'}/>

            <Text style={styles.header2}>Terms & Conditions</Text>
            
            <View style={styles.termssection}>  
                <Checkbox style={styles.checkbox}
                        value = {agree1}
                        onValueChange = {setAgree1} />
                <Text style={styles.terms}>My participation as a neighbourhood watcher is voluntary and I am wholly responsible for my own safety when responding to cases.</Text>
            </View>
            
            <View style={styles.termssection}> 
                <Checkbox style={styles.checkbox}
                        value = {agree2}
                        onValueChange = {setAgree2} />
                <Text style={styles.terms}>By submitting this form to sign up for the Neighbourhood Watch, I agree that Safe & Secure may collect, use and disclose my personal data, as provided above under the PDPA Act.</Text>
            </View>        

            <TouchableOpacity
                    style={styles.button}
                    onPress = {checkTextInput}>
                <Text style={styles.inbutton}> Sign up </Text>
            </TouchableOpacity>
            
            <Text>{"\n"}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    regform: {
        alignSelf: 'stretch',
        flex: 1,
        padding: 25,
    },

    header1: {
        fontSize: 24,
        color: '#000',
        paddingBottom: 5,
        marginBottom: 10,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },

    desc1: {
        fontSize: 15,
        color: '#000',
        paddingBottom: 10,
    },
    
    desc2: {
        fontSize: 12,
        color: '#000',
        flexWrap: 'wrap',
        paddingBottom: 20,
    },
    
    link: {
        fontSize: 12,
        color: '#0000FF',
        textDecorationLine: 'underline',
        paddingBottom: 20,
    },

    header3: {
        fontWeight: 'bold',
        fontSize: 17,
    },

    textinput: {
        alignSelf: 'stretch',
        width: '100%',
        height: 40,
        marginBottom: 30,
        color:'#000',
        borderBottomColor: '#000080',
        borderBottomWidth: 1,
    },

    checkbox: {
        margin: 1,
    },

    termssection: {
        flexDirection: "row",
        marginBottom: 20,
    },

    header2: {
        fontSize: 24,
        color: '#000', 
        marginBottom: 5,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },

    terms: {
        fontSize: 13,
        color: '#000',
        paddingBottom: 10,
        paddingLeft: 10,
        flexShrink: 1,
    },

    button: {
        backgroundColor: '#000080',
        color: "#fff",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12
    },

    inbutton: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
});

export default EnrolPage;