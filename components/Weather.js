import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native'
import SearchBar from './SearchBar'
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index'

export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null)

    const { weather,
            name,
            main: { temp, humidity },
            wind: { speed }
    } = weatherData
    const [{ main }] = weather

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main))
    }, [weatherData])

    function getBackgroundImg(weather) {
        if (weather === 'Snow') return snow
        if (weather === 'Clear') return sunny
        if (weather === 'Rain') return rainy
        if (weather === 'Haze') return haze
        return haze
    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black'
    
    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor='darkgray' /> */}
            <ImageBackground 
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >

                <SearchBar fetchWeatherData={fetchWeatherData} />

                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.cityName}>{name}</Text>
                    <Text style={styles.temp}>{temp} °C</Text>
                    <Text style={styles.weatherDesc}>{main}</Text>
                </View>

                <View style={styles.extraInfo}>

                    <View style={styles.info}>
                        <Text style={styles.infoText}>Humidity: </Text>
                        <Text style={styles.infoText}>{humidity} %</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={styles.infoText}>Wind Speed: </Text>
                        <Text style={styles.infoText}>{speed} m/s</Text>
                    </View>
                
                </View>
                
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    extraInfo: {
        flexDirection: 'column',
        marginTop: 50,
        justifyContent: 'space-between',
        padding: 10
    },
    info: {
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 20,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 10
    },
    infoText: {
        fontSize: 24,
        color: '#fff',
    },
    cityName: {
        fontSize: 30,
        fontWeight: '700'
    },
    temp: {
        fontSize: 60,
        fontWeight: '700'
    },
    weatherDesc: {
        fontSize: 30,
        fontWeight: '700'
    }
})