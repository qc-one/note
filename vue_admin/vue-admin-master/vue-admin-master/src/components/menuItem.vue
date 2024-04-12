<template>
	<div>
		<el-submenu :index="item.en_name">
			<template slot="title">
				<i :class="item.icon"></i>
				<span>{{item.title}}</span>
			</template>
			<div v-for="(ite,ind) in item.children" :key="ind">
				<template v-if="ite.isShow">
					<template v-if="ite.children && ite.children.length > 0">
					    <menu-item :item="ite"></menu-item>
					</template>
					<template v-else>
						<el-menu-item :index="ite.en_name">
						  <i :class="ite.icon"></i>
						  <span slot="title">{{ite.title}}</span>
						</el-menu-item>
					</template>
				</template>
			</div>
		</el-submenu>
	</div>
</template>

<script>
export default{
	name: 'menuItem',
	props:{
		item: {
			type: Object,
			default: {}
		}
	}
}
</script>

<style>
</style>
