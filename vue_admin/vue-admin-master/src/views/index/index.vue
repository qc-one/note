<template>
	<div class="content">
		<el-row :gutter="20">
		  <el-col :span="6">
			  <el-card>
			    <div slot="header" class="cardHeader">
			      <span>销售额</span>
			      <el-button type="success" size="mini" plain>昨日</el-button>
			    </div>
			    <div class="cardContent">
			      <div class="number">0</div>
				  <div class="ivu">
					  <div class="ivu-item">
						  <div class="ivu-item-text">日同比 100%</div>
						  <i class="el-icon-caret-top caret-top"></i>
					  </div>
					  <div class="ivu-item">
						  <div class="ivu-item-text">周同比 8%</div>
						  <i class="el-icon-caret-bottom caret-bottom"></i>
					  </div>
				  </div>
				  <div class="cardBottom">
					  <div class="cardBottom-text">总销售额</div>
					  <div class="cardBottom-text">8888.8元</div>
				  </div>
			    </div>
			  </el-card>
		  </el-col>
		  <el-col :span="6">
			  <el-card>
				<div slot="header" class="cardHeader">
				  <span>用户访问量</span>
				  <el-button type="success" size="mini" plain>昨日</el-button>
				</div>
				<div class="cardContent">
				  <div class="number">203</div>
				  <div class="ivu">
					  <div class="ivu-item">
						  <div class="ivu-item-text">日同比 100%</div>
						  <i class="el-icon-caret-top caret-top"></i>
					  </div>
					  <div class="ivu-item">
						  <div class="ivu-item-text">周同比 8%</div>
						  <i class="el-icon-caret-bottom caret-bottom"></i>
					  </div>
				  </div>
				  <div class="cardBottom">
					  <div class="cardBottom-text">总访问量</div>
					  <div class="cardBottom-text">11405Pv</div>
				  </div>
				</div>
			  </el-card>
		  </el-col>
		  <el-col :span="6">
			  <el-card>
				<div slot="header" class="cardHeader">
				  <span>订单量</span>
				  <el-button type="success" size="mini" plain>昨日</el-button>
				</div>
				<div class="cardContent">
				  <div class="number">203</div>
				  <div class="ivu">
					  <div class="ivu-item">
						  <div class="ivu-item-text">日同比 100%</div>
						  <i class="el-icon-caret-top caret-top"></i>
					  </div>
					  <div class="ivu-item">
						  <div class="ivu-item-text">周同比 8%</div>
						  <i class="el-icon-caret-bottom caret-bottom"></i>
					  </div>
				  </div>
				  <div class="cardBottom">
					  <div class="cardBottom-text">总订单量</div>
					  <div class="cardBottom-text">1075单</div>
				  </div>
				</div>
			  </el-card>
		  </el-col>
		  <el-col :span="6">
			  <el-card>
				<div slot="header" class="cardHeader">
				  <span>新增用户</span>
				  <el-button type="success" size="mini" plain>昨日</el-button>
				</div>
				<div class="cardContent">
				  <div class="number">203</div>
				  <div class="ivu">
					  <div class="ivu-item">
						  <div class="ivu-item-text">日同比 100%</div>
						  <i class="el-icon-caret-top caret-top"></i>
					  </div>
					  <div class="ivu-item">
						  <div class="ivu-item-text">周同比 8%</div>
						  <i class="el-icon-caret-bottom caret-bottom"></i>
					  </div>
				  </div>
				  <div class="cardBottom">
					  <div class="cardBottom-text">总用户</div>
					  <div class="cardBottom-text">11405人</div>
				  </div>
				</div>
			  </el-card>
		  </el-col>
		</el-row>
		<el-row>
		  <el-col :span="24">
			  <el-card class="echarContent">
			    <div slot="header" class="echar-top">
			      <div class="echar-top-left">
					  <div class="icon-box">
						  <i class="iconfont icontongji"></i>
					  </div>
					  <div>订单</div>
				  </div>
			      <div class="echar-top-right">
					  <div class="btn-text">30天</div>
					  <div class="btn-text">周</div>
					  <div class="btn-text">月</div>
					  <div class="btn-text">年</div>
				  </div>
			    </div>
			    <div class="echar-content">
			      <div ref="order" style="width: 100%;height: 400px;"></div>
			    </div>
			  </el-card>
		  </el-col>
		</el-row>
		<el-row style="display: flex;flex-wrap: nowrap;">
			<el-col :span="16">
				<el-card class="echarContent">
					<div slot="header" class="echar-top">
						<div class="echar-top-left">
						  <div class="icon-box">
							  <i class="iconfont iconyonghu"></i>
						  </div>
						  <div>用户</div>
						</div>
					</div>
					<div class="echar-content">
						<div ref="user" style="width: 100%;height: 400px;"></div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="8" style="margin-left: 30px;">
				<el-card class="echarContent">
					<div slot="header" class="echar-top">
						<div class="echar-top-left">
						  <div class="icon-box">
							  <i class="iconfont icongoumai"></i>
						  </div>
						  <div>购买用户统计</div>
						</div>
					</div>
					<div class="echar-content">
						<div ref="userBuy" style="width: 100%;height: 400px;"></div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import echarts from "echarts"
	export default{
		// activated(){
		// 	if(this.$route.meta.isUseCache==false){
		// 		//刷新
		// 	}
		// },
		// beforeRouteLeave (to, from, next) {
		//     if (to.name == 'List') {
		//         to.meta.isUseCache = false
		//     }        
		//     next()
		// }
		mounted() {
			// 订单统计
			this.drawOrder()
			// 用户统计
			this.drawUser()
			// 用户购买统计
			this.drawUserBuy()
		},
		methods:{
			drawOrder(){
				let order = echarts.init(this.$refs.order)
				order.setOption({
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [
						{
							type: 'category',
							data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
							axisTick: {
								alignWithLabel: true
							}
						}
					],
					yAxis: [
						{
							type: 'value'
						}
					],
					series: [
						{
							name: '直接访问',
							type: 'bar',
							barWidth: '60%',
							data: [10, 52, 200, 334, 390, 330, 220]
						}
					]
				})
			},
			drawUser(){
				let user = echarts.init(this.$refs.user)
				user.setOption({
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line',
						smooth: true
					}]
				})
			},
			drawUserBuy(){
				let userBuy = echarts.init(this.$refs.userBuy)
				userBuy.setOption({
					title: {
						text: '某站点用户访问来源',
						subtext: '纯属虚构',
						left: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
					},
					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							data: [
								{value: 335, name: '直接访问'},
								{value: 310, name: '邮件营销'},
								{value: 234, name: '联盟广告'},
								{value: 135, name: '视频广告'},
								{value: 1548, name: '搜索引擎'}
							],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	padding: 0;
}
.cardHeader{
	display: flex;
	justify-content: space-between;
}
.cardContent{
	.number{
		color: #515A6E;
		font-weight: bold;
		font-size: 30px;
	}
	.ivu{
		display: flex;
		align-items: center;
		margin-top: 10px;
		.ivu-item{
			display: flex;
			margin-right: 15px;
			align-items: center;
			.ivu-item-text{
				color: #515A6E;
				font-size: 14px;
				margin-right: 5px;
			}
			.caret-top{
				color: #ED4013;
			}
			.caret-bottom{
				color: #1DBE6B;
			}
		}
	}
	.cardBottom{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		border-top: 1px solid #E7EAEC;
		padding-top: 10px;
		.cardBottom-text{
			color: #515A6E;
			font-size: 14px;
		}
	}
}
.echarContent{
	margin-top: 20px;
	.echar-top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.echar-top-left{
			display: flex;
			align-items: center;
			.icon-box{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 30px;
				height: 30px;
				border-radius: 50%;
				background: #E5F6FF;
				margin-right: 10px;
				i{
					font-size: 14px;
					color: #1A90FF;
				}
			}
		}
		.echar-top-right{
			display: flex;
			.btn-text{
				margin-left: 10px;
				&:hover{
					cursor: pointer;
				}
			}
		}
	}
}
</style>
