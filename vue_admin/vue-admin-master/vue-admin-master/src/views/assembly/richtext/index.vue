<template>
	<div>
		<zhangyuTinymce :content="form.desc" @editorChange="editorChange"></zhangyuTinymce>
	</div>
</template>

<script>
	import zhangyuTinymce from './components/zhangyuTinymce.vue'
	export default {
		name: 'assembly_richtext_index',
		data(){
			return {
				form: {
					desc: ''
				}
			}
		},
		components:{
			zhangyuTinymce
		},
		methods:{
			//监听富文本内容改变
			editorChange(e){
				this.form.desc = e
			}
		}
	}
</script>

<style>
</style>
