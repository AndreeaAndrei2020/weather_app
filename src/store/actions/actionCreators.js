import { ADD_LOCATION } from '../constants'

export const addLocation = (location) => ({ type: ADD_LOCATION, location, x: 9 })

export const getCurrentWeather = (lat, lon, dispatch) => {
     console.log("Dq")
     fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&appid=98c355d73f22c6eb33c4bc0bd22031fe')
          .then(response => response.json())
          .then(response => { console.log('jssss', response) })
          .catch(err => console.log("not"))
}

export const getCurrentWeatherData = (lat, lon, dispatch) => {

     fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&appid=98c355d73f22c6eb33c4bc0bd22031fe')
          .then(response1 => response1.json())
          .then(response1 => {

               fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=98c355d73f22c6eb33c4bc0bd22031fe')
                    .then(response2 => response2.json())
                    .then(response2 => {
                         console.log(11111, response2)
                         var nameLocation = ''
                         nameLocation = response2.name
                         dispatch({ type: 'ADD_NAME_LOCATION', nameLocation })
                    })


               console.log(22222, response1)
               var hourlyWeather = []
               var descriptionWeather = response1.hourly[0].weather[0].main
               var iconWeather = 'http://openweathermap.org/img/w/' + response1.hourly[0].weather[0].icon + '.png'

               ///weather for the next 5 hours
               for (var i = 0; i <= 4; i++) {

                    var js = response1.hourly[i]
                    let x = {}
                    var gy = new Date(js.dt * 1000 + (response1.timezone_offset * 1000))

                    x['id'] = i
                    x['hour'] = gy.getHours()
                    x['temp'] = parseInt(js.temp)
                    x['urlIcon'] = 'http://openweathermap.org/img/w/' + js.weather[0].icon + '.png'
                    x['main'] = js.weather[0].main

                    hourlyWeather.push(x)
               }


               var nr = 1
               var weather7Days = []
               var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
               for (var j = 0; j <= 4; j++) {
                    js = response1.daily[j]

                    let y = {}
                    y['id'] = j + nr
                    nr++
                    y['name'] = days[new Date(js.dt * 1000 + (response1.timezone_offset * 1000)).getDay()].substring(0, 3)

                    y['tempMin'] = parseInt(js.temp['min'])
                    y['tempMax'] = parseInt(js.temp['max'])
                    y['urlIcon'] = 'http://openweathermap.org/img/w/' + js.weather[0].icon + '.png'
                    weather7Days.push(y)
               }

               dispatch({ type: 'ADD_TEMP', hourlyWeather, weather7Days, descriptionWeather, iconWeather  })

          })
          .catch(err => console.log("not"))




}

