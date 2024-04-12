export default {
	data(){
		return {
			preUrl:"",
			
			page:{
				current:1,//当前在第几页
				sizes:[10, 20, 50, 100],//每页显示多少条选择数组
				size:10,//每页显示多少条
				total:0//共几条
			},
			
			multipleSelection: [],
			
			loading:true,
		}
	},
	computed: {
		// 选中记录id组成的数组
		ids() {
			return this.multipleSelection.map(item=>{
				return item.id
			}) 
		}
	},
	created(){
		this.getList()
	},
	methods: {
		showLoading(){
			if(this.loading){
				this.layout.showLoading()
			}
		},
		hideLoading(){
			if(this.loading){
				this.layout.hideLoading()
			}
		},
		// 获取列表
		getList(){
			if(this.preUrl == '') return;
			this.showLoading()
			let url = this.getListUrl();
			this.axios.get(url).then(res=>{
				let data = res.data.data
				//共几条
				this.page.total = data.totalCount
				//赋值给列表
				this.getListResult(data)
				this.hideLoading()
			}).catch(err=>{
				this.hideLoading()
			})
		},
		// 选中
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		//每页多少条
		handleSizeChange(val) {
			this.page.size = val
			this.getList()
		},
		//切换到第几页
		handleCurrentChange(val) {
			this.page.current = val
			this.getList()
		}
	}
}