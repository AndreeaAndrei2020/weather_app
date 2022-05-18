import {
  ADD_POSITION,
  ADD_LOCATION_TEMP,
  ADD_LOCATION_NAME,
} from "../constants";

const initialState = {
  position: { lat: '', lng: '' },
  locationName: "",
  temp: 0,
  curentHour: "",
  locationTemp: "",
  curentWeather: "",
  url: "",
  hourlyWeather: [],
  weather7Days: [],
  descriptionWeather: "",
  iconWeather: "",
};

const selectedLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSITION:
      const { position } = action;
      return { ...state, position };
    case ADD_LOCATION_TEMP:
      const { 
        hourlyWeather, 
        weather7Days, 
        descriptionWeather, 
        iconWeather 
      } = action;

      return {
        ...state,
        hourlyWeather,
        weather7Days,
        descriptionWeather,
        iconWeather,
      };
    case ADD_LOCATION_NAME:
      const { locationName, locationTemp } = action;
      return {
        ...state,
        locationName,
        locationTemp : parseInt(locationTemp),
      };
    default:
      return state;
  }
};
export default selectedLocationReducer;
