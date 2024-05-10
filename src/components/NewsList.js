import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import * as Linking from 'expo-linking';

/**
 * Displays news articles in a list.
 */
const NewsList = ({ results }) => {
    return (
        <View>
            <FlatList data={results} keyExtractor={(result) => result.url} renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => Linking.openURL(item.url)} >
                        <View style={styles.view}>
                            <Image style={styles.image} source={{ uri: item.urlToImage }} />
                            <Text>{item.title} </Text>
                            <Text style={styles.date}>{item.publishedAt.substring(0, 10)} {item.publishedAt.substring(12, 16)} </Text>
                        </View>
                    </TouchableOpacity>
                )
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        marginBottom: 10,
        paddingLeft: 10,
        paddingBottom: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    Text: {
        padding: 10
    },
    image: {
        width: 250,
        height: 120,
        borderRadius: 4,
    },
    date: {
        fontWeight: 'bold',
    }
});

export default NewsList;