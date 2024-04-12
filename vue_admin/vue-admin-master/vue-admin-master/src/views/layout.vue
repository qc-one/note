<template>
	<div @click="rightMenu=false">
		<el-container style="position: absolute;left: 0;top: 0;bottom: 0;right: 0; overflow: hidden;">
			<!-- 左侧菜单 -->
			<el-aside :class="[isCollapse?'menu-close':'menu-open']" style="background: #304156;">
				<!-- LOGO -->
				<div class="logo">
					<div v-if="!isCollapse">管理系统</div>
					<div v-if="isCollapse">
						<i class="el-icon-house"></i>
					</div>
				</div>
				<!-- 菜单 -->
				<el-menu
				  :default-active="activeMenu"
				  :collapse="isCollapse"
				  @select="slideSelect"
				  :show-timeout="200"
				  background-color="#304156"
				  text-color="#bfcbd9"
				  active-text-color="#409EFF">
				  <div v-for="(item,index) in menuList" :key="index">
					  <!-- 判断是否渲染 -->
					  <template v-if="item.isShow">
						  <!-- 判断是否有子项 -->
						  <template v-if="item.children && item.children.length > 0">
							  <!-- 递归渲染 -->
							  <menu-item :item="item"></menu-item>
						  </template>
						  <template v-else>
							  <el-menu-item :index="item.en_name">
								  <i :class="item.icon"></i>
								  <span slot="title">{{item.title}}</span>
							  </el-menu-item>
						  </template>
					  </template>
				  </div>
				</el-menu>
			</el-aside>
			<!-- 右侧区域 -->
			<el-container>
				<!-- 顶部header -->
			    <el-header class="header">
					<div class="header-top">
						<div class="header-top-left">
							<i class="fold-icon" :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']" @click="isCollapse = !isCollapse"></i>
							<!-- 面包屑 -->
							<el-breadcrumb separator="/" style="margin-left: 20px;">
							  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
							  <el-breadcrumb-item :to="{ path: item.path }" v-for="(item,index) in bran" :key="index">
							      {{item.title}}
							  </el-breadcrumb-item>
							</el-breadcrumb>
						</div>
						<!-- 右上角菜单 -->
						<div class="header-top-right">
							<el-menu mode="horizontal"
							@select="handleSelect"
							active-text-color="#303133">
								<el-submenu index="100" popper-class="sub-menu">
									<template slot="title">
										<el-avatar class="mr-2" size="small"
										 :src="user.avatar ? user.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
										<span>{{user.nickname}}</span>
									</template>
									<el-menu-item index="100-1">修改</el-menu-item>
									<el-menu-item index="100-2">退出</el-menu-item>
								</el-submenu>
							</el-menu>
						</div>
					</div>
					<!-- 导航标签 -->
					<div class="header-bottom">
						<div class="tag" :class="[$route.name == 'index' ? 'tag-select' : '']" @click="selectHome" style="padding: 2px 7px;" @contextmenu.prevent="clickRightActive=null,rightMenu=true">
							<div class="spot" v-if="$route.name == 'index'"></div>
							<div class="text">首页</div>
							<!-- 右键菜单 -->
							<div class="right-menu" v-if="clickRightActive==null&&rightMenu">
								<div class="right-menu-item" @click.stop="refresh">刷新</div>
								<div class="right-menu-item" @click.stop="closeAll">关闭其他</div>
							</div>
						</div>
						<div v-for="(item,index) in tagsArray" :key="index" class="tag" :class="[item.isSelect ? 'tag-select' : '']" @click="selectTag(item,index)" @contextmenu.prevent="clickRight(index)">
							<div class="spot" v-if="item.isSelect"></div>
							<div class="text">{{item.title}}</div>
							<div class="close" @click.stop="deleteTag(item,index)">
								<div class="x el-icon-close"></div>
							</div>
							<!-- 右键菜单 -->
							<div class="right-menu" v-if="index==clickRightActive&&rightMenu">
								<div class="right-menu-item" @click.stop="refresh">刷新</div>
								<div class="right-menu-item" @click.stop="deleteTag(item,index)">关闭</div>
								<div class="right-menu-item" @click.stop="closeOther(item,index)">关闭其他</div>
								<div class="right-menu-item" @click.stop="closeAll">关闭所有</div>
							</div>
						</div>
					</div>
				</el-header>
				<!-- 内容区 -->
				<el-main class="content" v-loading="loading">
					<transition name="fade-transform" mode="out-in">
						<keep-alive :include="catchTagViewList">
							<router-view></router-view>
						</keep-alive>
					</transition>
					<!-- 滚动到顶部 -->
					<el-backtop target=".el-main" :bottom="100"> 
						<div style="height: 100%; width: 100%; background-color: #f2f5f6; box-shadow: 0 0 6px rgba(0,0,0, .12); text-align: center;  line-height: 40px; color: #1989fa;">UP</div>
					</el-backtop>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import menus from '@/common/config/menu.js'
import menuItem from '@/components/menuItem.vue'
import { mapState } from 'vuex'
export default {
	provide(){
		return {
			layout: this
		}
	},
	components:{
		menuItem
	},
	data(){
		return {
			isCollapse: false,//是否折叠
			activeMenu: '',//菜单选择项
			bran: [],//面包屑
			loading: false,//页面loading
			clickRightActive: null,//右键的是哪个标签
			rightMenu: false//默认右键菜单不显示
		}
	},
	computed: {
		...mapState({
			user: state => state.user.user,
			menuList: state => state.user.menus,
			tagsArray: state => state.tages.tagsArray,
			catchTagViewList: state => state.tages.catchTagViewList
		})
	},
	watch: {
		'$route'(to, from) {
			// 本地存储
			localStorage.setItem('activeMenu',to.name)
			this.activeMenu = to.name
			//过滤layout和index
			if(to.name != 'index' && to.name != 'layout'){
				//过滤非layout层页面不添加页签
				if(to.meta){
					//添加页签
					this.$store.commit('addTagView',{
						name: to.name,
						title: to.meta.title,
						isSelect: true,
						closeInquiry: to.meta.closeInquiry,
						keepAlive: to.meta.keepAlive
					})
				}
			}else{
				this.$store.commit('selectTagView',null)
			}
			// 加载面包屑导航
			this.getRouterBran()
		}
	},
	created(){
		// 加载面包屑导航
		this.getRouterBran()
		// 初始菜单选中
		this.activeMenu = localStorage.getItem('activeMenu')
		if(this.activeMenu){
			this.$router.push({
				name: this.activeMenu
			})
		}
		// 初始化页签
		this.$store.commit('init')
		// 初始化用户信息
		this.$store.commit('initUser')
	},
	methods:{
		//右上角下拉菜单
		handleSelect(key, keyPath){
			if (key === '100-1') {
				return console.log('修改资料')
			}
			if (key === '100-2') {
				// 退出登录
				return this.logout()
			}
		},
		//显示loading
		showLoading(){
			this.loading = true
		},
		//隐藏loading
		hideLoading(){
			this.loading = false
		},
		//页面刷新
		refresh(){
			this.rightMenu = false
			location.reload()
		},
		//关闭其他
		closeOther(item,index){
			this.selectTag(item,index)
			this.$store.commit('closeOther',index)
			this.rightMenu = false
		},
		//关闭所有
		closeAll(){
			this.$store.commit('closeAll')
			this.$router.push({
				name: 'index'
			})
			this.rightMenu = false
		},
		//页签右键菜单
		clickRight(index){
			this.clickRightActive = index
			this.rightMenu = true
		},
		//选中首页
		selectHome(){
			this.$store.commit('selectTagView',null)
			this.$router.push({
				name: 'index'
			})
		},
		//选中页签
		selectTag(item,index){
			this.$store.commit('selectTagView',index)
			this.$router.push({
				name: item.name
			})
		},
		//页签删除逻辑
		deleteTagLJ(item,index){
			//获取当前选中项的坐标
			let selectIndex = null
			this.tagsArray.forEach((v,i)=>{
				if(v.isSelect){
					selectIndex = i
				}
			})
			this.$store.commit('deleteTagView',index)
			if(this.tagsArray.length==0){
				this.$router.push({
					name: 'index'
				})
			}else{
				//删除的是选中项
				if(index == selectIndex){
					//判断后方是否还有页签
					if(this.tagsArray.length >= (index + 1)){
						this.$router.push({
							name: this.tagsArray[index].name
						})
					}else{
						//这时前方一定有页签
						this.$router.push({
							name: this.tagsArray[index-1].name
						})
					}
				}
			}
		},
		//删除页签
		deleteTag(item,index){
			if(item.closeInquiry){
				this.$alert('您确定要关闭该页面？', '提示', {
				  showCancelButton: true,
				  confirmButtonText: '确定'
				}).then(()=>{
					this.deleteTagLJ(item,index)
				}).catch(()=>{
					this.$message({
						type: 'info',
						message: '取消了操作'
					})
				})
			}else{
				this.deleteTagLJ(item,index)
			}
		},
		//菜单点击
		slideSelect(key){
			this.activeMenu = key;
			// 跳转到指定页面
			this.$router.push({
				name: key
			})
		},
		//加载面包屑
		getRouterBran(){
			let b = this.$route.matched.filter(v=>v.name)
			let arr = []
			b.forEach((v,k)=>{
				// 过滤layout和index
				if (v.name === 'index' || v.name === 'layout') return
				arr.push({
					name: v.name,
					path: v.path,
					title: v.meta.title
				})
			})
			this.bran = arr
		},
		//退出登录
		logout(){
			this.axios.post('/api/logout').then(res=>{
			  this.$message('退出成功')
			  // 清除状态和存储
			  this.$store.commit('logout')
			  // 返回到登录页
			  this.$router.push({name:"login"})
			}).catch(err=>{
			  // 清除状态和存储
			  this.$store.commit('logout')
			  // 返回到登录页
			  this.$router.push({name:"login"})
			})
		}
	}
}
</script>

<style lang="scss">
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.el-menu{
	border-right: 0;
	background: none;
}
.el-submenu .el-menu-item{
	background: #1f2d3d !important;
}
.el-submenu .el-menu-item:hover{
	background: #001528 !important;
}
.el-submenu__title{
	border-bottom: 0 !important;
}
.el-aside{
	transition: width .4s ease-in-out 0s !important;
}
.menu-open{
	width: 210px !important;
}
.menu-close{
	width: 65px !important;
}
.sub-menu{
	.el-menu-item{
		background: #FFFFFF !important;
	}
}
.logo{
	color: #FFFFFF;
	text-align: center;
	padding: 15px 0;
	&:hover{
		cursor: pointer;
	}
}
.el-menu.el-menu--horizontal{
	border-bottom: 0 !important;
}
.header{
	display: flex;
	flex-direction: column;
	box-shadow: 0 1px 4px rgba(0,21,41,.08);
	padding: 0;
	.header-top{
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		.header-top-left{
			display: flex;
			align-items: center;
			.fold-icon{
				font-size: 18px;
				margin-top: -1px;
				&:hover{
					cursor: pointer;
				}
			}
		}
	}
	.header-bottom{
		background: #FFFFFF;
		box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
		padding: 5px 20px;
		display: flex;
		z-index: 999;
		.tag{
			display: flex;
			align-items: center;
			border: 1px solid #d8dce5;
			padding: 2px 7px 2px 11px;
			margin-right: 8px;
			color: #495060;
			position: relative;
			&:hover{
				cursor: pointer;
			}
			.spot{
				width: 9px;
				height: 9px;
				background: #FFFFFF;
				border-radius: 50%;
				margin-right: 5px;
			}
			.text{
				font-size: 14px;
			}
			.close{
				color: #495060;
				font-size: 13px;
				margin-left: 4px;
				width: 16px;
				height: 16px;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				.x{
					margin-top: 1px;
				}
				&:hover{
					cursor: pointer;
					background: #ddd;
				}
			}
			.right-menu{
				position: absolute;
				top: 50%;
				left: 50%;
				background: #FFFFFF;
				box-shadow: 2px 2px 3px 0 rgba(0,0,0,.3);
				border-radius: 3px;
				padding: 4px 0;
				z-index: 999;
				.right-menu-item{
					width: 80px;
					color: #333;
					font-size: 13px;
					padding: 4px 0 4px 13px;
					&:hover{
						cursor: pointer;
						background: #eee;
					}
				}
			}
		}
		.tag-select{
			border: 0;
			background: #42b983;
			color: #FFFFFF;
			.close{
				color: #FFFFFF;
				font-size: 13px;
				margin-left: 4px;
				width: 16px;
				height: 16px;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				.x{
					margin-top: 0;
				}
				&:hover{
					cursor: pointer;
					background: #ddd;
				}
			}
		}
	}
}
.content{
	padding: 50px 20px 20px 20px;
}
.el-loading-mask{
	top: 40px !important;
}
.el-menu--collapse{
	.el-submenu__title{
		span{
			display: none;
		}
	}
}
</style>
