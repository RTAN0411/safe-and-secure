import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';

/**
 * Enables user to send SMS to the authorities.
 */
const initiateSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();

    if (isAvailable) {
        const {result} = SMS.sendSMSAsync(
            '+1 555-521-5556' //Emulator phone number, can change to actual phone number
        );
    } else {
        console.log('SMS not working')
    }
};

/**
 * Displays Contact Page to contact the authorities.
 */
const ContactPage = (props) =>{
    return(<View>
        <TouchableOpacity onPress = {()=>initiateSMS()} ><Text style = {styles.labels}>SMS Police</Text></TouchableOpacity>
        <TouchableOpacity onPress = {()=>Linking.openURL('tel: +1 555-521-5556')}><Text style = {styles.labels}>Call Police</Text></TouchableOpacity>
        <TouchableOpacity onPress = {()=>Linking.openURL('tel: +1 555-521-5556')}><Text style = {styles.labels}>Call Ambulance</Text></TouchableOpacity>
        <TouchableOpacity onPress = {()=>Linking.openURL('tel: +1 555-521-5556')}><Text style = {styles.labels}>Call Fire Station</Text></TouchableOpacity> 
    </View>); //Emulator phone number, can change to actual phone number
}

const styles = StyleSheet.create({
    labels:{
        height: 30,
        width: 200,
        marginVertical:40,
        marginHorizontal: 40,
        borderRadius: 6,
        alignSelf: 'center',
        backgroundColor:'blue',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        paddingTop: 5
    },
})
export default ContactPage;