import * as React from 'react';
import { Text, View , Button, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo ,Feather, AntDesign} from '@expo/vector-icons';
import {MapProvider} from './src/Context/MapContext'
import OverviewMapPage from './src/Screens/OverviewMapPage';
import InformationPage from './src/Screens/InformationPage';
import EnrolPage from './src/Screens/EnrolPage';
import ContactPage from './src/Screens/ContactPage';
import FormPage from './src/Screens/FormPage';
import LogInPage from './src/Screens/LoginPage';
import DropPinMapPage from './src/Screens/DropPinMapPage';
import * as firebase from 'firebase';

try {
  firebase.initializeApp({
    apiKey: "AIzaSyDzlXPAbO_MnmnkKNGObAb9ZEZ4FAQ-IWs",
    authDomain: "safeand-f61bd.firebaseapp.com",
    projectId: "safeand-f61bd",
    storageBucket: "safeand-f61bd.appspot.com",
    messagingSenderId: "734166664993",
    appId: "1:734166664993:web:120a2abc67deca2a776060",
    measurementId: "G-GK7K7K66QR"
  });
} catch(err){
  console.log('firebase error')
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Displays tabs in the bottom toolbar.
 */
const MyTabs = () => {
  return(
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#C11B17',
      inactiveTintColor: '#FFFFFF',
      activeBackgroundColor: '#151B54',
      inactiveBackgroundColor: '#151B54',
   }}>
    <Tab.Screen name = 'Map' 
    component = {OverviewMapPage}
    options={{
      tabBarLabel: 'Map',
      tabBarIcon: ({ color, size }) => (
        <Feather name="map" color={color} size={size} />
      ),
    }}/>
    <Tab.Screen name = 'Form' component = {FormPage}
    options={{
      tabBarLabel: 'Report',
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="notification" color={color} size={size} />
      ),
    }}/>
    <Tab.Screen name = 'Information' component = {InformationPage}
    options={{
      tabBarLabel: 'Information',
      tabBarIcon: ({ color, size }) => (
        <Entypo name="news" color={color} size={size} />
      ),
    }}/>
    <Tab.Screen name = 'Enrolment' component = {EnrolPage}
    options={{
      tabBarLabel: 'Enrolment',
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="form" color={color} size={size} />
      ),
    }}/>
    <Tab.Screen name = 'Contact' component = {ContactPage}
    options={{
      tabBarLabel: 'Contact',
      tabBarIcon: ({ color, size }) => (
        <Feather name="phone-call" color={color} size={size} />
      ),
    }}/>
  </Tab.Navigator>
  );
}

/**
 * Displays all pages and components in the app.
 */
const AuthStack = () => {
  return(
    <Stack.Navigator>
    <Stack.Screen name = 'Log In' component = {LogInPage} 
      options = {{title: 'Log In', headerStyle: {backgroundColor: '#151B54'}, 
      headerTintColor: '#fff', headerTitleStyle: {alignSelf:'center'}}}/>

    <Stack.Screen name = 'Safe and Secure' component = {MyTabs} 
      options = {
        ({navigation}) => (
        {
          headerTitle: 'Safe and Secure', headerStyle: {backgroundColor: '#151B54'}, headerLeft: null,
          headerTintColor: '#fff', headerTitleStyle: {alignSelf:'center', left: 25},
          headerRight: () => (
            <TouchableOpacity 
              style = {{right: 10}} 
              onPress = {() =>
                Alert.alert(
                  "Log Out", "\nAre you sure you want to log out now?\n\n",
                [
                    {text: "Cancel", },
                    {text: "Confirm", 
                        onPress: () => {firebase.auth().signOut(),
                                        navigation.reset({ index: 0, routes: [{ name: 'Log In' }], }),
                                        console.log("logging out...")}, },
                ],
                {cancelable: true})
                }>
              <Feather name="log-out" size={28} color="#fff"/>
            </TouchableOpacity>
           )
          })
        }/>

    <Stack.Screen name = 'Drop Pin Map' component= {DropPinMapPage} 
      options = {{title: 'Safe and Secure', headerStyle: {backgroundColor: '#151B54'}, 
      headerTintColor: '#fff', headerTitleStyle: {paddingLeft: 50}}}/>
    </Stack.Navigator>
  ); 
}

export default function App() {
  return (
    <MapProvider>
      <NavigationContainer>
        <AuthStack/>
      </NavigationContainer>
    </MapProvider>
    
  )
  
}