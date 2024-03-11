
import './index.scss'
import React, {Component} from 'react'
import { NavBar, Icon } from 'antd-mobile';
import Banner from './Banner'

import axios from 'axios'
class Detail extends Component {
	
	constructor (props) {
		super(props)
		
		this.state = {
			data:{},
			desc: ''
		}
	}
	
	componentWillMount () {
		//获取初始数据
		axios.get('/aura/api/item',{
			params: {id: this.props.match.params.id}
		}).then(res => {
			this.setState({data: res.data.data})
		})
		//描述
		axios.get('/aura/api/item/desc',{
			params: {id: this.props.match.params.id}
		}).then(res => {
			this.setState({desc: '<p>哈哈哈</p>'})
		})
	}
	
	
	
	renderContent () {
		let { data, desc } = this.state
		if ( !data.id ) return '';
		
		return (
			<div>
				<Banner banners = {data.skuList[0].images}/>
				<div dangerouslySetInnerHTML={{ __html: desc }}></div>
			</div>
		)
		
	}
	
	render () {
		console.log(this.props.match.params.id)
		return (
			<div className = "page-header detail">
				 <NavBar
			      mode="dark"
			      icon={<Icon type="left" />}
			      onLeftClick={() => this.props.history.go(-1)}
			  
			    >详情</NavBar>
			    
			    {this.renderContent()}
			</div>
		)
	}
	
}

export default Detail
