import React, { Component } from 'react';
import {
	Route,
	Switch,
	Redirect,
	withRouter
} from 'react-router-dom'
import './stylesheets/App.scss';

import {
	Home, List, Cars, Mine, NotFound
} from './components/pages'

import NavBar from './components/commons/NavBar'

class App extends Component {
  
  
  renderFooter () {
  	if ( this.props.location.pathname !== '/mine' ) {
  		return <NavBar/>
  	}
  }
  
  render() {
  	let { routes } = this.props
    return (
      <div>      
        <Switch>
	        {
	        	routes.map(item => {
	        		return <Route exact = {item.exact}  path={item.path} component = {item.component}  key = { item.id }/>
	        	})
	        }
        	<Redirect to = "/not-found" />
        </Switch>
               
        { this.renderFooter() }
      </div>
    );
  }
  
}
App.defaultProps = {
	
	routes: [
		{ id: 1, path: '/', component: Home, exact: true },
		{ id: 2, path: '/list', component: List },
		{ id: 3, path: '/cars', component: Cars },
		{ id: 4, path: '/mine', component: Mine },
		{ id: 5, path: '/not-found', component: NotFound }
	]
	
}


export default withRouter(App);
