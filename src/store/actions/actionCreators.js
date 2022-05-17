import {
  ADD_POSITION,
  ADD_LOCATION_NAME,
  ADD_LOCATION_TEMP,
  WEEK_DAYS,
} from "../constants";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const FORECAST_WEATHER_URL = `${BASE_URL}/onecall`;
const CURRENT_WEATHER_URL = `${BASE_URL}/weather`;
const APP_ID = "98c355d73f22c6eb33c4bc0bd22031fe";

export const addPosition = (position,ok) => ({ type: ADD_POSITION, position , ok });

export const getCurrentWeatherData = (lat, lon, dispatch) => {
  fetch(
    `${FORECAST_WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID}`
  )
    .then((response1) => response1.json())
    .then((response1) => {
      fetch(
        `${CURRENT_WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID}`
      )
        .then((response2) => response2.json())
        .then((response2) => {
          const {
            name: locationName,
            main: { temp: locationTemp },
          } = response2;

          dispatch({ type: ADD_LOCATION_NAME, locationName, locationTemp });

          const descriptionWeather = response1.hourly[0].weather[0].main;
          const iconWeather = `http://openweathermap.org/img/w/${response1.hourly[0].weather[0].icon}.png`;

          // weather for the next 5 hours
          const hourlyWeather = [];
          response1.hourly.forEach((item, index) => {
            if (index > 4) return;

            const hourDateObj = new Date(item.dt*1000).toLocaleTimeString('it-IT').slice(0,5)
            hourlyWeather.push({
              id: hourDateObj,
              hourlyWeather: hourDateObj,
              temp: parseInt(item.temp),
              urlIcon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
              main: item.weather[0].main,
            });
          });

          const weather7Days = []
          response1.daily.forEach((item, index) => {
            if (index > 4) return;
            const dayDateObj = new Date(
              item.dt * 1000 + response1.timezone_offset * 1000
            ).getDay();
            
            weather7Days.push({
              id: (index+1)*6,
              name: WEEK_DAYS[dayDateObj].substring(0, 3),
              tempMin: parseInt(item.temp.min),
              tempMax: parseInt(item.temp.max),
              urlIcon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
            });
          });

          dispatch({
            type: ADD_LOCATION_TEMP,
            hourlyWeather,
            weather7Days,
            descriptionWeather,
            iconWeather,
          });
        });
    })
    .catch((error) => console.error("Error", error));
};
