<template>
	<div>
		<button-search ref="buttonSearch"
		placeholder="要搜索的角色" 
		@search="searchEvent">
		    <!-- 左边 -->
			<template #left>
				<el-button type="primary"
				size="mini" @click="isShowModel = true">添加角色</el-button>
				<el-button type="danger" 
				size="mini" @click="deleteAll">批量删除</el-button>
			</template>
			<!-- 高级搜索表单 -->
			<template #form>
				<el-form inline ref="form" :model="form"
				label-width="80px">
					<el-form-item label="角色" class="mb-0">
						<el-input v-model="form.name" 
						placeholder="要搜索的角色"
						size="mini"></el-input>
					</el-form-item>
					<!-- <el-form-item label="权限" class="mb-0">
						<el-select v-model="form.auth_id" placeholder="请选择权限" size="mini">
						    <el-option
						      v-for="(item,index) in authList"
						      :key="index"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
					</el-form-item> -->
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
			  align="center"
		      prop="name"
		      label="角色名称">
		    </el-table-column>
		    <el-table-column
			  align="center"
		      prop="describe"
		      label="角色描述">
		    </el-table-column>
			<el-table-column
			align="center"
			  label="权限">
			  <template slot-scope="scope">
				  <el-tag style="margin-right:10px;" v-for="(item,index) in scope.row.auth" :key="index">{{item.auth.name}}</el-tag>
			  </template>
			</el-table-column>
			<el-table-column
				align="center"
				label="操作">
				<template slot-scope="scope">
					<el-button type="primary" size="mini"
					:disabled="scope.row.id==0?true:false"
					@click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="danger" size="mini"
					:disabled="scope.row.id==0?true:false"
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
		 <el-dialog :title="userForm.id!=undefined?'修改角色':'创建角色'" :visible.sync="isShowModel" @close="closeModel" width="700px">
		    <el-form ref="ruleForm" :model="userForm" :rules="rules">
		       <el-form-item label="角色名称" prop="name" placeholder="请填写角色名称">
		         <el-input v-model="userForm.name" clearable style="width:300px"></el-input>
		       </el-form-item>
			   <el-form-item label="角色描述" prop="describe" placeholder="请填写用户昵称">
			     <el-input v-model="userForm.describe" clearable type="textarea" style="width:300px"></el-input>
			   </el-form-item>
			   <el-form-item label="角色权限" prop="auth_ids">
				   <el-select
				       style="width:300px"
				       v-model="userForm.auth_ids"
				       multiple
				       placeholder="请选择角色权限">
				       <el-option
				         v-for="(item,index) in authList"
				         :key="item.id"
				         :label="item.name"
				         :value="item.id">
				       </el-option>
				   </el-select>
			   </el-form-item>
			   <div class="menu-box">
				   <div class="menu-box-label">角色菜单</div>
				   <div class="menu-box-tree">
					   <el-tree
					     :props="defaultProps"
					     :data="menuList"
						 ref="tree"
						 node-key="id"
					     show-checkbox>
					   </el-tree>
				   </div>
			   </div>
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
				preUrl: 'role',
				defaultProps: {
					children: 'children',
					label: 'title'
				},
				menuList: [],
				form: {
					name: '',
					create_time: ''
				},
				tableData: [],
				isShowModel: false,
				userForm: {
					name: '',
					describe: '',
					auth_ids: ''
				},
				rules:{
					name:[
						{ required:true,message:"请输入权限名称",trigger:'blur' }
					],
					describe:[
						{ required:true,message:"请输入权限描述",trigger:'blur' }
					],
					auth_ids: [
						{ required:true,message:"请选择权限",trigger:'blur' }
					]
				},
				authList: []
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
			//请求权限列表
			this.axios.get('/api/auth/list?page=no').then(res=>{
				this.authList = res.data.data.list
				this.hideLoading()
			}).catch(err=>{
				this.hideLoading()
			})
			//请求菜单列表
			this.axios.get('/api/menu/list').then(res=>{
				this.menuList = res.data.data
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
					create_time: ''
				}
			},
			//关闭弹窗
			closeModel(){
				this.userForm = {
					name: '',
					describe: '',
					auth_ids: ''
				}
			},
			//打开编辑弹窗
			handleEdit(item){
				this.userForm = {
					name: item.name,
					describe: item.describe,
					auth_ids: item.auth.map(v=>v.auth_id),
					id: item.id
				}
				let checkMenus = item.menu.map(v=>v.menu.id)
				//选中菜单
				this.$nextTick(function() {
				    this.$refs.tree.setCheckedKeys(checkMenus)
				})
				this.isShowModel = true
			},
			//创建
			submitForm(){
				this.$refs.ruleForm.validate((e)=>{
					if (!e) return;
					// 提交表单
					this.showLoading()
					this.userForm['menu'] = this.$refs.tree.getCheckedNodes()
					this.axios.post(this.userForm.id?'/api/update/role':'/api/create/role',this.userForm).then(res=>{
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
				this.$confirm('您确定要删除该角色？',
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.showLoading()
					this.axios.post('/api/delete/role',{
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
						message:"请选择要操作的角色"
					})
				}
				this.$confirm('您确定要批量删除角色？',
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.showLoading()
					this.axios.post('/api/delete/role/all',{
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
.menu-box{
	display: flex;
	.menu-box-label{
		margin-left: 10px;
	}
	.menu-box-tree{
		margin-left: 13px;
		padding: 10px 25px 10px 5px;
		border: 1px solid #eee;
	}
}
</style>
