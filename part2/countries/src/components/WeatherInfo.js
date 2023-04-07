import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const WeatherInfo = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    console.log('fetching weather data...')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeatherData(response.data)
      })
  }, [])

  if (weatherData) {
    return (
      <>
        <h3>Weather in {capital}</h3>
        <div>temperature {weatherData.main.temp} Celsius</div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={`${weatherData.weather[0].description}`}>
        </img>
        <div>wind {weatherData.wind.speed} m/s</div>
      </>
    )
  }
  return <p>loading weather...</p>
}

export default WeatherInfo
