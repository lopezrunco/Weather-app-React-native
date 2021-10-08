import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Weather from './components/Weather'
import SearchBar from './components/SearchBar'

const API_KEY = "097acbb8da532953b9e059038486c75e"

export default function App() {

    const [weatherData, setWeatherData] = useState(null)
    const [loaded, setLoaded] = useState(true)

    {/* Obtiene los datos del clima usando el nombre de la ciudad como parametro */}
    async function fetchWeatherData(cityName) {
        setLoaded(false)
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`

        /* Se conecta a la API. Si la respuesta esta OK, obtiene los datos y los setea en setWeatherData */
        try {
            const response = await fetch(API)
            
            if(response.status == 200) {
                const data = await response.json()
                setWeatherData(data)
            } else {
                setWeatherData(null)
            }
            setLoaded(true)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchWeatherData('Montevideo')

    }, [])
    
    if(!loaded) {
        return(
            <View style={styles.container}>
                <ActivityIndicator color='gray' size={36} />
            </View>
        )
    } else if(weatherData === null) {
        return (
            <View style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData} />
                <Text style={styles.primaryText}>Can't find the city! Try another one</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4e7fb7',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  primaryText: {
      margin: 20,
      fontSize: 28
  }
})
