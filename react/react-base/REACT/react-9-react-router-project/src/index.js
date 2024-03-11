import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './modules/rem'

import { 
	BrowserRouter as Router
} from 'react-router-dom'


ReactDOM.render(
	<Router>
		<App />
	</Router>
, document.getElementById('root'));


registerServiceWorker();
