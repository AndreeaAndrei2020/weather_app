import { ADD_LOCATION } from '../constants'

export const addLocation = (location) => ({ type: ADD_LOCATION, location })

export const getCurrentWeatherData = () => {

    fetch('https://jsonplaceholder.typicode.com/todos/1')
     .then(response => response.json())
     .then(json => console.log(111, json))


    // fetch({
    //     method: 'GET',
    //     url: 'https://weather.com?lat=12312&lng=58u4'
    // }).then((response) => {
    //     console.log(response)
    //     // il salvezi in redux
    // }).catch((err) => console.log(err)) 
}

