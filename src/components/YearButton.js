import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

/**
 * Displays buttons for users to filter crimes by year.
 * @param {*} year - The selected year of crimes to display.
 */
const YearButton = ({year, pressed, updateCircle}) => {
    if(pressed){
        return (
            <TouchableOpacity style = {styles.selectedTouchStyle} onPress = {updateCircle}>
                <Text style = {styles.selectedTextStyle}>{year}</Text>
            </TouchableOpacity>
        );
    }
    else{
        return (
            <TouchableOpacity style = {styles.touchStyle} onPress = {updateCircle}>
                <Text style = {styles.textStyle}>{year}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    touchStyle: {
        height: 30,
        width: 73,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        borderColor: '#151B54',
        alignItems: 'center'
    },
    selectedTouchStyle: {
        height: 30,
        width: 73,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#151B54',
        borderColor: '#151B54',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 18,
        color: '#151B54',
        fontWeight: 'bold'
    },
    selectedTextStyle: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
});

export default YearButton;
