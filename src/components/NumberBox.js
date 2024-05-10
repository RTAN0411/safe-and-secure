import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

/**
 * Number input box
 */
const NumberBox = ({placeholder, length, term, onTermChange}) => {
    return (
        <View style = {styles.backgroundStyle}>
            <TextInput 
                keyboardType = 'numeric'
                maxLength={length}
                style = {styles.textStyle}
                placeholder = {placeholder}
                value = {term}
                onChangeText = {newTerm => onTermChange(newTerm)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 10,
        backgroundColor: '#E5E4E2',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection:  'row'
    },
    textStyle:{
        paddingLeft: 10,
        borderRadius: 20,
        flex: 1,
        fontSize: 20
    }
});

export default NumberBox;