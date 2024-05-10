import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import * as Linking from 'expo-linking';

/**
 * Displays YouTube videos in a thumbnail list.
 */
const VideoList = ({ results }) => {
    return (
        <View>
            <FlatList data={results} keyExtractor={(result) => result.etag} renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => Linking.openURL(`http://www.youtube.com/watch?v=${item.id.videoId}`)}>
                        <View style={styles.view}>
                            <Image style={styles.image} source={{ uri: item.snippet.thumbnails.medium.url }} />
                            <Text>{item.snippet.title} </Text>
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

export default VideoList;