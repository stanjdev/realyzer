// import { combineReducers, createStore } from 'redux';
// import ValuesReducer from './ValuesReducer';

// const rootReducer = combineReducers({
//   values: ValuesReducer
// })

// const store = createStore(rootReducer)

// store.subscribe(() => {
//   // console.log(store.getState())
// })

// export default store;





















// SESSION STORAGE version 
/* 
"sessionstorage is not defined warning in nextjs redux react" 
sessionStorage is a Browser thing. so you get this warning 
on the server-side because the browser isn't mounted yet 
on refresh. It works localhost-wise, but may crash my 
server on deploy. Just a note.
*/

import { combineReducers, createStore } from 'redux';
import ValuesReducer from './ValuesReducer';

// Session Storage
function saveToSessionStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('values', serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromSessionStorage() {
  try {
    const serializedState = sessionStorage.getItem('values');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}


const rootReducer = combineReducers({
  values: ValuesReducer
})

const persistedValues = loadFromSessionStorage();


const store = createStore(
  rootReducer,
  persistedValues
);

store.subscribe(() => {
  // console.log(store.getState())
  saveToSessionStorage(store.getState());
});

export default store;