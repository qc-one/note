<template>
	<div>
		<el-alert
			title="这里是一个数字滚动组件"
			type="info"
			:closable="false">
		</el-alert>
		<div class="card">
			<count-to :startVal='startVal' :endVal='endVal' :duration='duration'></count-to>
		</div>
		<table class="el-table el-table--border">
			<thead>
				<tr>
				  <td>参数</td>
				  <td>说明</td>
				  <td>类型</td>
				  <td>默认值</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>startVal</td>
					<td>开始值</td>
					<td>Number</td>
					<td>0</td>
				</tr>
				<tr>
					<td>endVal</td>
					<td>结束值</td>
					<td>Number</td>
					<td>2017</td>
				</tr>
				<tr>
					<td>duration</td>
					<td>持续时间，以毫秒为单位</td>
					<td>Number</td>
					<td>3000</td>
				</tr>
				<tr>
					<td>autoplay</td>
					<td>自动播放</td>
					<td>Boolean</td>
					<td>true</td>
				</tr>
				<tr>
					<td>decimals</td>
					<td>要显示的小数位数</td>
					<td>Number</td>
					<td>0</td>
				</tr>
				<tr>
					<td>decimal</td>
					<td>十进制分割</td>
					<td>String</td>
					<td>.</td>
				</tr>
				<tr>
					<td>separator</td>
					<td>分隔符</td>
					<td>String</td>
					<td>,</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import countTo from 'vue-count-to'
	export default{
		name: 'assembly_number_index',
		components:{
			countTo
		},
		data(){
			return {
				startVal: 0,
				endVal: 2020,
				duration: 3000
			}
		}
	}
</script>

<style scoped lang="scss">
.card{
	margin-top: 15px;
	width: 200px;
	text-align: center;
	padding: 15px 0;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	border: 0;
}
.el-table{
	margin-top: 20px;
	td{
		text-align: center;
	}
}
</style>
