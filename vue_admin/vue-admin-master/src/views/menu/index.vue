<template>
	<div class="content">
		<el-button type="primary" size="small" style="margin-bottom: 20px;" @click="isShowModel = true">添加根菜单</el-button>
		<el-tree
		  :data="menuList"
		  node-key="id"
		  default-expand-all>
		  <div style="width:100%;display: flex;justify-content: space-between;" slot-scope="{ node, data }">
			<div>
				<i :class="data.icon" style="margin-right: 10px;"></i>
				{{ data.title }}
			</div>
			<div style="margin-left: 50px;">
				<el-button v-if="data.uid==0" @click.stop="addMenuChild(data.id)" type="primary" size="mini">添加子菜单</el-button>
				<el-button type="success" @click.stop="handleEdit(data)" size="mini">编辑</el-button>
				<el-button type="danger" size="mini" @click.stop="delMenu(data.id)">删除</el-button>
			</div>
		  </div>
		</el-tree>
		<!-- 添加/编辑 -->
		<el-dialog :title="userForm.id!=undefined?'编辑菜单':'创建根菜单'" :visible.sync="isShowModel" @close="closeModel" width="700px">
		   <el-form ref="ruleForm" :model="userForm" :rules="rules" hide-required-asterisk>
		      <el-form-item label="菜单名称" prop="title">
		        <el-input v-model="userForm.title" placeholder="请填写菜单名称" clearable style="width:300px"></el-input>
		      </el-form-item>
			  <el-form-item label="英文标识" prop="en_name">
			    <el-input v-model="userForm.en_name" placeholder="请填写英文标识 例:user_index" clearable style="width:300px"></el-input>
			  </el-form-item>
			  <el-form-item label="菜单图标">
				<el-input v-model="userForm.icon" placeholder="请填写菜单图标" clearable type="text" style="width:300px"></el-input>
			  </el-form-item>
			  <el-form-item label="页面路径">
			  	<el-input v-model="userForm.component" placeholder="请填写页面路径 例:user/index" clearable type="text" style="width:300px"></el-input>
				<span style="color: red;font-size: 13px;margin-left: 15px;">如果下面有子菜单该值不填</span>
			  </el-form-item>
			  <el-form-item label="是否显示">
				  <el-switch
				    v-model="userForm.isShow"
				    active-text="显示"
				    inactive-text="隐藏">
				  </el-switch>
			  </el-form-item>
			  <el-form-item label="是否缓存">
				  <el-switch
					v-model="userForm.keepAlive"
					active-text="缓存"
					inactive-text="不缓存">
				  </el-switch>
			  </el-form-item>
			  <el-form-item label="关闭询问">
				  <el-switch
					v-model="userForm.closeInquiry"
					active-text="开启"
					inactive-text="不开启">
				  </el-switch>
			  </el-form-item>
		   </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShowModel = false">取 消</el-button>
				<el-button type="primary" @click="addMenu">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import common from '@/common/mixins/common.js'
	export default{
		mixins:[common],
		inject:['layout'],
		data(){
			return {
				preUrl: 'menu',
				menuList: [],
				isShowModel: false,
				userForm: {
					uid: 0,
					title: '',
					en_name: '',
					icon: '',
					isShow: true,
					keepAlive: true,
					closeInquiry: true,
					component: ''
				},
				rules:{
					title:[
						{ required:true,message:"请输入菜单名称",trigger:'blur' }
					],
					el_name:[
						{ required:true,message:"请输入菜单标识",trigger:'blur' }
					]
				}
			}
		},
		created(){
			
		},
		methods:{
			// 获取请求列表分页url
			getListUrl(){
				return `/api/${this.preUrl}/list`
			},
			// 请求到列表数据后，赋值给页面
			getListResult(e){
				this.menuList = e
			},
			//关闭弹窗
			closeModel(){
				this.userForm = {
					uid: 0,
					title: '',
					en_name: '',
					icon: '',
					isShow: true,
					keepAlive: true,
					closeInquiry: true,
					component: ''
				}
			},
			//打开编辑弹窗
			handleEdit(item){
				this.userForm = {
					id: item.id,
					title: item.title,
					en_name: item.en_name,
					icon: item.icon,
					isShow: item.isShow==0?true:false,
					keepAlive: item.keepAlive==0?true:false,
					closeInquiry: item.closeInquiry==0?true:false,
					component: item.component
				}
				this.isShowModel = true
			},
			//添加菜单
			addMenu(){
				this.$refs.ruleForm.validate((e)=>{
					if (!e) return;
					// 提交表单
					this.showLoading()
					this.axios.post(this.userForm.id?'/api/update/menu':'/api/create/menu',this.userForm).then(res=>{
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
			//添加子菜单弹窗
			addMenuChild(id){
				this.isShowModel = true
				this.userForm.uid = id
			},
			//删除菜单
			delMenu(id){
				this.$confirm('您确定要删除该菜单？',
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.showLoading()
					this.axios.post('/api/delete/menu',{
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
			}
		}
	}
</script>

<style>
.el-tree-node__content{
	height: 40px;
}
</style>

<style lang="scss" scoped>
.content{
	padding: 0;
}
</style>
