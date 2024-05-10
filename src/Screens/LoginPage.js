import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import NumberBox from '../components/NumberBox';
import * as firebase from 'firebase';

/**
 * Displays Login Page for verification of new users via phone#.
 */
const LoginPage = ({navigation}) => {
    const recaptchaVerifier = useRef(null);
    const [page, setPage] = useState('phone');
    const [phoneNumber, setPhoneNumber] = useState('0');
    const [verificationId, setVerificationId] = useState(0);
    const [verificationCode, setVerificationCode] = useState(0);
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

    const sendOTP = async () => {
        try {
            console.log(phoneNumber)
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            console.log("Verification code has been sent to your phone.");
            setPage('otp');
        } catch (err) {
            console.log(err.message);
            Alert.alert("Invalid Entry", "\nPlease try again!");
        }
    }

    const confirmOTP = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            console.log("Phone authentication successful")
            navigation.reset({ index: 0, routes: [{ name: 'Safe and Secure' }], })
        } catch (err) {
            console.log(err.message);
            Alert.alert("Invalid Verification Code", "\nPlease try again!");
        }
    }

    if(page === 'phone'){
        return(
            <View>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
                <Text style = {styles.topText}>Enter Phone Number:</Text>
                <NumberBox placeholder = "98765432" length = {8} onTermChange = {number => setPhoneNumber(`+65${number}`)}/>
                <TouchableOpacity style = {styles.confirmButton} 
                onPress = {async () => sendOTP()} >
                    <Text style = {styles.buttonText}>Send Verification Code</Text>
                </TouchableOpacity>
            </View>
        );
    } else if (page === 'otp'){
        return(
            <View>
                <Text style = {styles.topText}>Enter OTP:</Text>
                <NumberBox placeholder = "123456" length = {6} onTermChange = {number => setVerificationCode(number)}/>
                <TouchableOpacity onPress = {async() => confirmOTP()} style = {styles.confirmButton}>
                    <Text style = {styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {async () => sendOTP()} style = {styles.confirmButton}>
                    <Text style = {styles.buttonText}>Resend Verification Code</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => setPage('phone')} style = {styles.confirmButton}>
                    <Text style = {styles.buttonText}>Change Phone Number</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topText:{
        paddingLeft: 15,
        paddingTop: 10,
        fontSize: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        paddingVertical: 5
    },
    confirmButton: {
        marginTop: 20,
        height: 40,
        width: 300,
        backgroundColor: '#151B54',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        alignItems: 'center'
    }
});

export default LoginPage;
