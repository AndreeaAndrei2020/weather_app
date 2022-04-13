import { act } from 'react-dom/test-utils'
import { ADD_LOCATION, ADD_TEMP } from '../constants'

const selectedLocationReducer = (state = { location: { lat: '', lng: '' }, nameLocation: '', temp: 0, curentHour: '', curentWeather: '', url: '', hourlyWeather: [], weather7Days: [], descriptionWeather: '', iconWeather: '' }, action) => {
    switch (action.type) {
        case ADD_LOCATION:
            return { ...state, location: action.location }
        case ADD_TEMP:
            return { ...state, hourlyWeather: action.hourlyWeather, weather7Days: action.weather7Days, descriptionWeather: action.descriptionWeather, iconWeather: action.iconWeather }
        case 'ADD_NAME_LOCATION':
            return {
                ...state, nameLocation: action.nameLocation
            }
        default:
            return state
    }
}
export default selectedLocationReducer
