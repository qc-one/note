export default {
	state:{
		tagsArray: [],//页签组
		catchTagViewList: []//页面缓存列表
	},
	getters:{
		
	},
	mutations:{
		//初始化页签
		init(state){
			state.tagsArray = JSON.parse(localStorage.getItem('tagArray')) || []
			state.catchTagViewList = state.tagsArray.map(v=>{
				if(v.keepAlive){
					return v.name
				}
			})
		},
		//添加页签
		addTagView(state,item){
			//判断是否已经有该标签，有就选中
			let index = null
			state.tagsArray.forEach((v,i)=>{
				if(v.name == item.name){
					index = i
				}
			})
			if(index != null){
				this.commit('selectTagView',index)
			}else{
				this.commit('selectTagView',state.tagsArray.length)
				state.tagsArray.push(item)
				//缓存
				if(item.keepAlive){
					state.catchTagViewList.push(item.name)
				}
				//缓存
				localStorage.setItem('tagArray',JSON.stringify(state.tagsArray))
			}
		},
		//删除页签
		deleteTagView(state,index){
			//删除keep-alive缓存
			let idx = state.catchTagViewList.indexOf(state.tagsArray[index].name)
			state.catchTagViewList.splice(idx,1)
			//删除并选中上一个
			state.tagsArray.splice(index,1)
			//更新缓存
			let tagArray = JSON.parse(localStorage.getItem('tagArray'))
			tagArray.splice(index,1)
			//缓存
			localStorage.setItem('tagArray',JSON.stringify(tagArray))
			if(index > 0){
				this.commit('selectTagView',index-1)
			}
		},
		//选中页签
		selectTagView(state,index){
			state.tagsArray = state.tagsArray.map((v,i)=>{
				if(i == index){
					v.isSelect = true
				}else{
					v.isSelect = false
				}
				return v
			})
			//更新缓存
			localStorage.setItem('tagArray',JSON.stringify(state.tagsArray))
		},
		//关闭所有
		closeAll(state){
			state.tagsArray = []
			localStorage.removeItem('tagArray')
		},
		//关闭其他
		closeOther(state,index){
			state.tagsArray = state.tagsArray.filter((v,i)=>i == index)
			localStorage.setItem('tagArray',JSON.stringify(state.tagsArray))
		}
	},
	actions:{
		
	}
}