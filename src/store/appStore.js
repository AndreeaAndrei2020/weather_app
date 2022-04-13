import { combineReducers, createStore,applyMiddleware  } from "@reduxjs/toolkit";
import selectedLocation from "./reducers/selectedLocationReducer";
import thunk from "redux-thunk"  
 const reducers = combineReducers({
    selectedLocation
 })

export const store = createStore(reducers,applyMiddleware(thunk) )
