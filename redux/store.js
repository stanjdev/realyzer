import {combineReducers, createStore } from 'redux';
import ValuesReducer from './ValuesReducer';

const rootReducer = combineReducers({
  values: ValuesReducer
})

const store = createStore(rootReducer)

store.subscribe(() => {
  // console.log(store.getState())
})

export default store;