//在以前，react组合的会使用.jsx后缀的文件来写

import PropTypes from 'prop-types';
import React, { Component } from 'react'
import './index.scss'

class HelloWorld extends Component {
	
	
	render () {
		return (
			<div data-hello-word >
				Hello World
			</div>
		)
	}
	
}


export default HelloWorld