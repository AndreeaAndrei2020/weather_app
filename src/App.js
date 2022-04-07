import React from 'react';
import './App.css';
// import { useSelector ,useDispatch } from 'react-redux';
// import { bindActionCreators} from 'redux'
// import {actionCreators} from './store/index'
import HomePage from './components/HomePage'

function App() {
  // const state = useSelector((state) => state.account)
  // const dispatch = useDispatch()
  // const {deposit, withdraw} = bindActionCreators(actionCreators,dispatch)

  return (
    <div className="App">
       <HomePage />
    </div>
  );
}

export default App;
