import { combineReducers, createStore } from "@reduxjs/toolkit";
import selectedLocation from "./reducers/selectedLocationReducer";

 const reducers = combineReducers({
    selectedLocation
 })

export const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
