import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {BrowserRouter} from "react-router-dom"


let reducer =(state,action)=>{
    if(action.type==="lists"){
        return {...state, lists: action.lists}
    }
    if(action.type==="title"){
        return {...state, sortingType: action.sortingType}
    }
    if(action.type==="dueDate"){
        return{...state, sortingType: action.sortingType}
    }
    return state
}

const store = createStore(
    reducer, // reducer
    {lists:[], sortingType:"createdAt"}, // initial state
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )



let content = (<Provider store={store}>
<BrowserRouter>
    <App/>
    </BrowserRouter>
</Provider>)
ReactDOM.render(content, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
