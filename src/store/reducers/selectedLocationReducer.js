import {ADD_LOCATION} from '../constants' 

const selectedLocationReducer = (state = { location: { lat: '', lng: '' } }, action) => {
    switch (action.type) {
        case ADD_LOCATION:
            return { ...state, location: action.location }
        default:
            return state
    }
}
export default selectedLocationReducer