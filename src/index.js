import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './containers/appContainer.js';
import SearchCom from './components/Search';
import rootReducer from './reducers'
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(rootReducer);

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Redirect from="/" to="/home" />
      <Route path="/home" component={AppContainer} />
      <Route path="/search" component={SearchCom} />  
    </Router>
  </Provider>   
  ), document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
