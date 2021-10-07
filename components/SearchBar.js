import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Dimensions } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'

export default function SearchBar({ fetchWeatherData }) {

    const [cityName, setCityName] = useState('')

    return (
        <View style={styles.searchBar}>
            <TextInput 
                placeholder='Enter city name'
                value={cityName}
                onChangeText={(text) => setCityName(text)}
                placeholderTextColor="#000000" 
            />
            <EvilIcons name="search" size={28} color="black" onPress={() => fetchWeatherData(cityName)} />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 40,
        marginBottom: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff28',
    }
})