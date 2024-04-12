<template>
	<div class="content">
		<div class="header">
			<!-- <img class="header-logo" src="../../assets/logo.jpg" /> -->
			<div class="header-title">龙宝宝营销管理平台</div>
		</div>
		<!-- <canvas id="canvas" class="canvas"></canvas> -->
		<div class="login-form">
			<div class="login-form-top">
				<div class="title">{{loginMode ? '密码登录' : '扫码登录'}}</div>
				<div class="qrcode-btn">
					<template v-if="loginMode">
						<img class="qrcode" src="../../assets/qrcode.jpg" @click="loginMode=false" />
						<img class="sqrcode" src="../../assets/sqrcode.jpg" />
					</template>
					<template v-else>
						<img class="qrcode" src="../../assets/computer.jpg" @click="loginMode=true" />
						<img class="sqrcode" src="../../assets/password.jpg" />
					</template>
				</div>
			</div>
			<template v-if="loginMode">
				<el-form ref="ruleForm" :model="form" :rules="rules" style="margin-top: 40px;">
					<el-form-item prop="username">
						<el-input type="text" v-model="form.username" clearable placeholder="请输入登录账号"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" v-model="form.password" clearable placeholder="请输入登录密码"></el-input>
					</el-form-item>
					<el-button type="primary" class="w-100" :loading="loading" @click="submit">{{loading? '登录中...' : '立即登录'}}</el-button>
				</el-form>
			</template>
			<template v-else>
				<div class="qrcode-box">
					<img class="qrcode-img" src="../../assets/1.jpg" />
					<div class="qrcode-bottom">
						<div class="iconfont iconsaoma ico"></div>
						<div class="ico-right">
							<div class="ico-right-text">打开 微信 扫一扫</div>
							<div class="ico-right-text">登录</div>
						</div>
					</div>
				</div>
			</template>
			<div class="login-form-bottom">
				<div v-if="loginMode" class="text">忘记密码</div>
				<div class="text">免费注册</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bgimg from '@/assets/user-now-bg.png'
	export default{
		data(){
			return {
				ctx: {}, //canvas对象
				form: {
					username: '',
					password: ''
				},
				rules:{
					username:[
						{ required:true,message:"请输入登录账号",trigger:'blur' }
					],
					password:[
						{ required:true,message:"请输入用户密码",trigger:'blur' }
					]
				},
				loginMode: true,//默认密码登录
				loading: false,
				cachRout: [],//路由缓存
				rout: [{
					path: '/',
					name: 'layout',
					redirect: {name:'index'},
					component: () => import('../../views/layout.vue'),
					children: [{
						meta: {
							keepAlive: true, //是否缓存当前组件
						},
						path: '/index',
						name: 'index',
						component: () => import('../../views/index/index.vue')
					}]
				}]
			}
		},
		created(){
			//回车监听
			this.keyupSubmit()
		},
		mounted(){
			// this.initDraw()
			// window.onresize = () => {
			// 	return (() => {
			// 		document.getElementById("canvas").width = document.documentElement.clientWidth
			// 		document.getElementById("canvas").height = document.documentElement.clientHeight
			// 		this.initDraw()
			// 	})()
			// }
		},
		methods:{
			// initDraw(){
			// 	this.ctx = document.getElementById("canvas").getContext('2d')
			// 	let img = new Image()
			// 	img.src = bgimg
			// 	img.onload = () => {
			// 		this.ctx.drawImage(img, 0 , 0, this.ctx.canvas.width,this.ctx.canvas.height)
			// 	}
			// 	document.getElementById("canvas").addEventListener('mousemove',()=>{})
			// }
			
			//回车监听
			keyupSubmit(){
			  document.onkeydown=e=>{
			    let _key=window.event.keyCode;
			    if(_key===13){
			      this.submit()
			    }
			  }
			},
			//登录
			submit(){
				this.$refs.ruleForm.validate((e)=>{
					if (!e) return;
					// 提交表单
					this.loading = true
					this.axios.post('/api/login',this.form,{token:false}).then(res=>{
						// 存储到vuex
						let data = res.data.data
						// 存储到本地存储
						this.$store.commit('login',data)
						// 成功提示
						this.$message('登录成功')
						this.loading = false
						// 动态设置路由
						this.addRoutes(data.menu)
						// 跳转后台首页
						this.$router.replace({name: 'index'})
					}).catch(res=>{
						this.loading = false
					})
				})
			},
			//动态设置路由
			addRoutes(menu){
				//递归
				this.pushItem(menu)
				//缓存
				window.sessionStorage.setItem('router',JSON.stringify(this.cachRout))
				this.$router.addRoutes(this.rout);
			},
			//递归
			pushItem(menu){
				menu.forEach(v=>{
					if(v.children && v.children.length > 0){
						this.pushItem(v.children)
					}else{
						let obj = {
							path: '/' + v.en_name.replace('_','/'),
							name: v.en_name,
							meta: {
								title: v.title,
								keepAlive: v.keepAlive,
								closeInquiry: v.closeInquiry,
								isSelect: true
							}
						}
						if(v.component){
							obj['component'] = () => import(`../../views/${v.component}.vue`)
						}
						this.rout[0].children.push(obj)
						//添加缓存数据
						let obj2 = {
							path: '/' + v.en_name.replace('_','/'),
							name: v.en_name,
							meta: {
								title: v.title,
								keepAlive: v.keepAlive,
								closeInquiry: v.closeInquiry,
								isSelect: true
							}
						}
						if(v.component){
							obj2['component'] = v.component
						}
						this.cachRout.push(obj2)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;
	&::before{
		content: '';
		width: 100%;
		height: 100%;
		background: url(../../assets/user-now-bg.png);
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		top: 0;
		left: 0;
	}
	.canvas{
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
	}
	.header{
		position: absolute;
		display: flex;
		align-items: center;
		padding: 20px 30px;
		.header-logo{
			width: 60px;
			height: 60px;
		}
		.header-title{
			font-size: 28px;
			color: #FFFFFF;
			font-weight: bold;
		}
	}
	.login-form{
		width: 450px;
		height: 430px;
		background: #FFFFFF;
		position: absolute;
		top: 50%;
		margin-top: -280px;
		right: 150px;
		border-radius: 6px;
		padding: 30px 30px 0 30px;
		.login-form-top{
			display: flex;
			justify-content: space-between;
			.title{
				color: #303133;
				font-size: 17px;
			}
			.qrcode-btn{
				width: 40px;
				height: 40px;
				position: relative;
				.qrcode{
					width: 100%;
					height: 100%;
					&:hover{
						cursor: pointer;
					}
				}
				.sqrcode{
					position: absolute;
					width: 66px;
					height: 29px;
					top: 50%;
					margin-top: -16px;
					left: -68px;
				}
			}
		}
		.qrcode-box{
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			margin-top: 30px;
			.qrcode-img{
				width: 190px;
				height: 190px;
			}
			.qrcode-bottom{
				display: flex;
				justify-content: center;
				align-items: center;
				.ico{
					font-size: 30px;
					color: #3F9EFF;
					margin-right: 20px;
				}
				.ico-right{
					display: flex;
					flex-direction: column;
					.ico-right-text{
						font-size: 12px;
					}
				}
			}
		}
		.login-form-bottom{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-top: 20px;
			.text{
				color: #606266;
				margin-left: 15px;
				font-size: 14px;
			}
			&:hover{
				cursor: pointer;
			}
		}
	}
}
</style>