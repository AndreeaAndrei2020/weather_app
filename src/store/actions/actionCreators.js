import {
  ADD_POSITION,
  ADD_LOCATION_NAME,
  ADD_LOCATION_TEMP,
  WEEK_DAYS,
} from "../constants"

const BASE_URL = "https://api.openweathermap.org/data/2.5"
const FORECAST_WEATHER_URL = `${BASE_URL}/onecall`
const CURRENT_WEATHER_URL = `${BASE_URL}/weather`
const APP_ID = "98c355d73f22c6eb33c4bc0bd22031fe"

export const addPosition = (position) => ({ type: ADD_POSITION, position })

export const getCurrentWeatherData = async (lat, lon, dispatch) => {
  try {
    const response1 = await fetch(`${FORECAST_WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID}`)
    const response1Json = await response1.json()
    const response2 = await fetch(`${CURRENT_WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID}`)
    const response2Json = await response2.json()
    function setWeatherData() {

      const {
        name: locationName,
        main: { temp: locationTemp },
      } = response2Json

      dispatch({ type: ADD_LOCATION_NAME, locationName, locationTemp })

      const descriptionWeather = response1Json.hourly[0].weather[0].main
      const iconWeather = `http://openweathermap.org/img/w/${response1Json.hourly[0].weather[0].icon}.png`

      // weather for the next 5 hours
      const hourlyWeather = []
      const moment = require('moment')

      const timezoneInMinutes = response1Json.timezone_offset / 60
      const currentTime = moment().utcOffset(timezoneInMinutes).format("h:mm A")
      const currentHour = currentTime.slice(0, 2)
      const integerHour = parseInt(currentHour)

      response1Json.hourly.forEach((item, index) => {

        if (index > 4) return

        const currentH = integerHour + index
        const meridiem = currentTime.slice(currentTime.length - 2, currentTime.length)
        const currentHour = `${currentH} ${meridiem}`
        const hourDateObj = new Date(item.dt * 1000).toLocaleTimeString('it-IT').slice(0, 5)

        hourlyWeather.push({
          id: hourDateObj,
          hourlyWeather: currentHour,
          temp: parseInt(item.temp),
          urlIcon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
          main: item.weather[0].main,
        })
      })

      const weather7Days = []
      response1Json.daily.forEach((item, index) => {
        if (index > 4) return;
        const dayDateObj = new Date(
          item.dt * 1000 + response1Json.timezone_offset * 1000
        ).getDay()

        weather7Days.push({
          id: dayDateObj,
          name: WEEK_DAYS[dayDateObj].substring(0, 3),
          tempMin: parseInt(item.temp.min),
          tempMax: parseInt(item.temp.max),
          urlIcon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
        })
      })

      dispatch({
        type: ADD_LOCATION_TEMP,
        hourlyWeather,
        weather7Days,
        descriptionWeather,
        iconWeather,
      })
    }
    setWeatherData()
  }
  catch (error) { console.error("Error", error) }
}
