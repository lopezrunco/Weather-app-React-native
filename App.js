import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const API_KEY = "097acbb8da532953b9e059038486c75e"

export default function App() {

  const [weatherData, setWeatherData] = useState(null)
  const [loaded, setLoaded] = useState(true)

  {/* Obtiene los datos del clima usando el nombre de la ciudad como parametro */}
  async function fetchWeatherData(cityName) {
    setLoaded(false)
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`

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
    fetchWeatherData('Mumbai')
    console.log(weatherData)
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
