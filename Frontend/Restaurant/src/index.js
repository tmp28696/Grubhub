import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers/index';
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
//import Provider from react-redux
import {Provider} from 'react-redux';

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//create a store and pass reducer as an argument
const store = createStore(rootReducer,composePlugin(applyMiddleware(promise)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider> 
    , document.getElementById('root')
    );

serviceWorker.unregister();
