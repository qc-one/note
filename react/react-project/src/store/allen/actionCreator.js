
import {INCREAMENT,SUBTRACT,CHANGE_BOARDLIST,CHANGE_HOMELIST} from "./const"

//在这里，我们的actionCreator只负责创建action，不需要负责传递action
import axios from 'axios'

export default {
	increament () {
		let action = {
			type:INCREAMENT
		}
		return action
	},
	subtract (){
		return (dispatch) => {
			setTimeout(() => {
	            let num = Math.floor(Math.random()*10)
	            let action = {
	                type: SUBTRACT,
	                num
	            }
	          dispatch( action )
	        }, 500);
		}
	},
	getBoardList () {
		return dispatch => {
			axios.get('/mz/v4/api/billboard/home',{
				params: {__t: Date.now()}
			}).then (res => {
				console.log(res.data.data.billboards)
				dispatch({
					type: CHANGE_BOARDLIST,
					boardlist: res.data.data.billboards
				})
			})	
		}
	},
	changeNum () {
		return {
			type: 'CHANGE_NUM'
		}
	},
	getHomeList () {
		return dispatch => {
			axios.get('/aura/api/recommend/home?page=1&num=8').then (res => {
				dispatch({
					type: CHANGE_HOMELIST,
					homelist: res.data.data.list
				})
			})	
		} 
	}
}
