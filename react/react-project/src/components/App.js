import React,{Component} from 'react';
import './App.scss';

import {Home,Cars,List,Mine,NotFound,Details} from './index'

import {Route,Switch,Redirect,withRouter} from "react-router-dom"

import NavBar from './commons/NavBar'

class App extends Component{
	
	renderFooter(){
		console.log(this)
		let nonavbar = ['/mine/login']
		let pathname = this.props.location.pathname;
		let hasnav = nonavbar.every((v) => {
			if(v == pathname){
				return false
			}
			return true
		})
		
		return !hasnav || <NavBar/>
//		if(this.props.location.pathname != "/mine"){
//			return <NavBar/>
//		}
	}
	render(){
		let { routes } = this.props
		return (
	    <div className="App">
	    	<Switch>
		    	{
	        	routes.map(item => {
	        		return <Route exact = {item.exact}  path={item.path} component = {item.component}  key = { item.id }/>
	        	})
	        }
		    	<Redirect to="/not-found" />
		    </Switch>
		    
		    {this.renderFooter()}
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
		{ id: 5, path: '/not-found', component: NotFound },
		{ id: 6, path: '/details/:id', component: Details }
	]
	
}

export default withRouter(App);
