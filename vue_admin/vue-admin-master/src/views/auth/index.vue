<template>
	<div>
		<button-search ref="buttonSearch"
		placeholder="要搜索的权限名称" 
		@search="searchEvent">
		    <!-- 左边 -->
			<template #left>
				<el-button type="primary"
				size="mini" @click="isShowModel = true">添加权限</el-button>
				<el-button type="danger" 
				size="mini" @click="deleteAll">批量删除</el-button>
			</template>
			<!-- 高级搜索表单 -->
			<template #form>
				<el-form inline ref="form" :model="form"
				label-width="80px">
					<el-form-item label="权限名称" class="mb-0">
						<el-input v-model="form.name" 
						placeholder="要搜索的权限名称"
						size="mini"></el-input>
					</el-form-item>
					<el-form-item label="权限标识名称" class="mb-0">
						<el-input v-model="form.auth_name" 
						placeholder="要搜索的权限标识名称"
						size="mini"></el-input>
					</el-form-item>
					<el-form-item label="创建时间" class="mb-0">
						<el-date-picker size="small"
						  v-model="form.create_time"
						  type="daterange"
						  range-separator="至"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期"
						  value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
					<el-form-item class="mb-0">
						<el-button type="info" size="mini"
						@click="searchEvent">
							搜索</el-button>
						<el-button size="mini"
						@click="clearSearch">清空筛选条件</el-button>
					</el-form-item>
				</el-form>
			</template>
		</button-search>
		<el-table
		    :data="tableData"
		    border
		    style="width: 100%;margin-top: 20px;"
			@selection-change="handleSelectionChange">
			<el-table-column
				type="selection"
				width="45"
				align="center">
			</el-table-column>
		    <el-table-column
			  prop="name"
		      label="权限名称">
		    </el-table-column>
		    <el-table-column
		      label="权限标识名称">
			  <template slot-scope="scope">
				  <el-tag type="success">{{scope.row.auth_name}}</el-tag>
				  <el-button @click="copy(scope.row.auth_name)" style="margin-left: 15px;" size="small" plain>复制</el-button>
			  </template>
		    </el-table-column>
			<el-table-column
				align="center"
				label="操作">
				<template slot-scope="scope">
					<el-button type="primary" size="mini"
					@click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="danger" size="mini"
					@click="handleDelete(scope.row.id)"
					>删除</el-button>
				</template>
			</el-table-column>
			</el-table>
		 </el-table>
		 <div class="page-footer">
			 <el-pagination
			   :current-page="page.current"
			   :page-sizes="page.sizes"
			   :page-size="page.size"
			   layout="total, sizes, prev, pager, next, jumper"
			   :total="page.total"
			   @size-change="handleSizeChange"
			   @current-change="handleCurrentChange">
			 </el-pagination>
		 </div>
		 <!-- 添加/编辑 -->
		 <el-dialog :title="userForm.id!=undefined?'编辑权限':'创建权限'" :visible.sync="isShowModel" @close="closeModel" width="700px">
		    <el-form ref="ruleForm" :model="userForm" :rules="rules">
		       <el-form-item label="权限名称" prop="name">
		         <el-input v-model="userForm.name" placeholder="请填写权限名称" clearable style="width:300px"></el-input>
		       </el-form-item>
			   <el-form-item label="标识名称" prop="auth_name">
			     <el-input v-model="userForm.auth_name" placeholder="请填写权限标识名称" clearable type="text" style="width:300px"></el-input>
			   </el-form-item>
		    </el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="isShowModel = false">取 消</el-button>
			    <el-button type="primary" @click="submitForm">确 定</el-button>
			</div>
		 </el-dialog>
	</div>
</template>

<script>
	import buttonSearch from "@/components/button-search.vue"
	import common from '@/common/mixins/common.js'
	export default{
		mixins:[common],
		inject:['layout'],
		components: {
			buttonSearch
		},
		data(){
			return {
				preUrl: 'auth',
				form: {
					name: '',
					auth_name: '',
					create_time: ''
				},
				tableData: [],
				isShowModel: false,
				userForm: {
					name: '',
					auth_name: ''
				},
				rules:{
					name:[
						{ required:true,message:"请输入权限名称",trigger:'blur' }
					],
					auth_name:[
						{ required:true,message:"请输入权限标识名称",trigger:'blur' }
					]
				},
				roleList: []
			}
		},
		computed: {
			//高级搜索参数拼接
			params(){
				let str = ''
				for (let key in this.form) {
					let val = this.form[key]
					if(val){
						if(Array.isArray(val)){
							str += `&starttime=${val[0]}`
							str += `&endtime=${val[1]}`
						} else {
							str += `&${key}=${this.form[key]}`
						}
					}
				}
				return str
			}
		},
		created(){
			
		},
		methods:{
			// 获取请求列表分页url
			getListUrl(){
				return `/api/${this.preUrl}/list?current=${this.page.current}&limit=${this.page.size}${this.params}`
			},
			// 请求到列表数据后，赋值给页面
			getListResult(e){
				this.tableData = e.list
			},
			// 搜索事件
			searchEvent(e = false){
				// 简单搜索
				if (typeof e === 'string') {
					this.form.name = e
					this.getList()
				}
				// 高级搜索
				this.getList()
			},
			//清空筛选条件
			clearSearch(){
				this.form = {
					name: '',
					auth_name: '',
					create_time: ''
				}
			},
			//关闭弹窗
			closeModel(){
				this.userForm = {
					name: '',
					auth_name: ''
				}
			},
			//打开编辑弹窗
			handleEdit(item){
				this.userForm = {
					name: item.name,
					auth_name: item.auth_name,
					id: item.id
				}
				this.isShowModel = true
			},
			//创建
			submitForm(){
				this.$refs.ruleForm.validate((e)=>{
					if (!e) return;
					// 提交表单
					this.showLoading()
					this.axios.post(this.userForm.id?'/api/update/auth':'/api/create/auth',this.userForm).then(res=>{
						// 成功提示
						this.$message({
							type: "success",
							message: this.userForm.id ? "修改成功" : "创建成功"
						})
						this.isShowModel = false
						this.hideLoading()
						this.getList()
					}).catch(res=>{
						this.hideLoading()
					})
				})
			},
			//删除单个
			handleDelete(id) {
				this.$confirm('您确定要删除该权限？',
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.showLoading()
					this.axios.post('/api/delete/auth',{
						id:id
					}).then(res=>{
						this.$message({
							type:"success",
							message:"删除成功"
						})
						this.getList()
						this.hideLoading()
					}).catch(err=>{
						this.hideLoading()
					})
				})
			},
			//批量删除
			deleteAll(){
				if (this.ids.length === 0) {
					return this.$message({
						type:"error",
						message:"请选择要操作的权限"
					})
				}
				this.$confirm('您确定要批量删除权限？',
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.showLoading()
					this.axios.post('/api/delete/auth/all',{
						ids:this.ids
					}).then(res=>{
						this.$message({
							type:"success",
							message:"操作成功"
						})
						this.getList()
						this.hideLoading()
					}).catch(err=>{
						this.hideLoading()
					})
				})
			},
			//复制
			copy(auth_name){
				this.$copyText(auth_name).then(v=>{
					this.$message({
						type:"success",
						message:"已复制到剪切板"
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.avatar{
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
.page-footer{
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 15px 0;
	border-top: 1px solid #eee;
}
</style>
