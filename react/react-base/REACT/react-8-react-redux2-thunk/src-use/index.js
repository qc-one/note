import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.scss';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store = {store} >
        <App />
  </Provider>

, document.getElementById('root'));


registerServiceWorker();
