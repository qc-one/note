<template>
	<div>
		<button-search ref="buttonSearch"
		placeholder="要搜索的账号" 
		@search="searchEvent">
		    <!-- 左边 -->
			<template #left>
				<el-button type="primary"
				size="mini" @click="isShowModel = true">添加用户</el-button>
				<el-button type="danger" 
				size="mini" @click="deleteAll">批量删除</el-button>
			</template>
			<!-- 高级搜索表单 -->
			<template #form>
				<el-form inline ref="form" :model="form"
				label-width="80px">
					<el-form-item label="账号" class="mb-0">
						<el-input v-model="form.username" 
						placeholder="要搜索的账号"
						size="mini"></el-input>
					</el-form-item>
					<el-form-item label="昵称" class="mb-0">
						<el-input v-model="form.nickname" 
						placeholder="要搜索的昵称"
						size="mini"></el-input>
					</el-form-item>
					<el-form-item label="角色" class="mb-0">
						<el-select v-model="form.role_id" placeholder="请选择角色" size="mini">
						    <el-option
						      v-for="(item,index) in roleList"
						      :key="index"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
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
		      label="头像">
			  <template slot-scope="scope">
				  <img class="avatar" :src="scope.row.avatar" />
			  </template>
		    </el-table-column>
		    <el-table-column
		      prop="nickname"
		      label="昵称">
		    </el-table-column>
		    <el-table-column
		      prop="username"
		      label="账号">
		    </el-table-column>
			<el-table-column
			  label="角色">
			  <template slot-scope="scope">
			  		<div>{{scope.row.role.name}}</div>
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
		 <el-dialog :title="userForm.id!=undefined?'修改用户':'创建用户'" :visible.sync="isShowModel" @close="closeModel" width="700px">
		    <el-form ref="ruleForm" :model="userForm" :rules="rules">
		       <el-form-item label="登录账号" prop="username" placeholder="请填写登录账号">
		         <el-input v-model="userForm.username" clearable style="width:300px"></el-input>
		       </el-form-item>
			   <el-form-item v-if="userForm.id==undefined" label="用户密码" prop="password" placeholder="请填写用户密码">
			     <el-input v-model="userForm.password" clearable type="password" style="width:300px"></el-input>
			   </el-form-item>
			   <el-form-item v-if="userForm.id==undefined" label="确认密码" prop="checkPassword" placeholder="请填写确认密码">
			     <el-input v-model="userForm.checkPassword" clearable type="password" style="width:300px"></el-input>
			   </el-form-item>
			   <el-form-item label="用户昵称" prop="nickname" placeholder="请填写用户昵称">
			     <el-input v-model="userForm.nickname" clearable type="text" style="width:300px"></el-input>
			   </el-form-item>
			   <el-form-item label="用户角色" prop="role_id">
			       <el-select v-model="userForm.role_id" placeholder="请选择用户角色">
			         <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
			       </el-select>
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
			let validatePassword = (rule,value,callback) => {
				if(value===''){
					callback(new Error('请再次输入密码'))
				}else if(value !== this.userForm.password){
					callback(new Error('两次输入密码不一致'))
				}else{
					callback()
				}
			}
			return {
				preUrl: 'user',
				form: {
					username: '',
					nickname: '',
					role_id: '',
					create_time: ''
				},
				tableData: [],
				isShowModel: false,
				userForm: {
					username: '',
					password: '',
					checkPassword: '',
					nickname: '',
					role_id: ''
				},
				rules:{
					username:[
						{ required:true,message:"请输入登录账号",trigger:'blur' }
					],
					password:[
						{ required:true,message:"请输入用户密码",trigger:'blur' }
					],
					checkPassword:[
						{ required:true,validator: validatePassword,trigger:'blur' }
					],
					nickname: [
						{ required:true,message:"请输入用户昵称",trigger:'blur' }
					],
					role_id: [
						{ required:true,message:"请选择角色",trigger:'blur' }
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
			//请求角色列表
			this.axios.get('/api/role/list?page=no').then(res=>{
				this.roleList = res.data.data.list
				this.hideLoading()
			}).catch(err=>{
				this.hideLoading()
			})
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
					this.form.username = e
					this.getList()
				}
				// 高级搜索
				this.getList()
			},
			//清空筛选条件
			clearSearch(){
				this.form = {
					username: '',
					nickname: '',
					create_time: ''
				}
			},
			//关闭弹窗
			closeModel(){
				this.userForm = {
					username: '',
					password: '',
					checkPassword: '',
					nickname: '',
					role_id: ''
				}
			},
			//打开编辑弹窗
			handleEdit(item){
				this.userForm = {
					username: item.username,
					nickname: item.nickname,
					role_id: item.role_id,
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
					this.axios.post(this.userForm.id?'/api/update/user':'/api/create/user',this.userForm).then(res=>{
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
				this.$confirm('您确定要删除该用户？',
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.showLoading()
					this.axios.post('/api/delete/user',{
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
						message:"请选择要操作的用户"
					})
				}
				this.$confirm('您确定要批量删除用户？',
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.showLoading()
					this.axios.post('/api/delete/user/all',{
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
