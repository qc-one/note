<template>
    <div>
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="isCollapse">
            <MenuTree :menuData="menuList"></MenuTree>
        </el-menu>
    </div>
</template>
<script>
    import MenuTree from "./MenuTree.vue";
    export default {
        name: 'Aside',
        components: {
            MenuTree
        },
        data() {
            return {
                isCollapse: false,
                menuList: [{
                        path: '/',
                        name: 'home',
                        label: '首页',
                        icon: 's-home',
                        url: 'home/home',
                        index: '1'
                    },
                    {
                        index: '2',
                        path: '/mal',
                        name: 'mall',
                        label: '商品管理',
                        icon: 'video-play',
                        url: 'mallmanage/mallmanage'
                    },
                    {
                        index: '3',
                        path: '/user',
                        name: 'user',
                        label: '用户管理',
                        icon: 'user',
                        url: 'usermanage/usermanage'
                    },
                    {
                        index: '4',
                        // path: '/',
                        // name: 'home',
                        label: '其他',
                        icon: 'location',
                        // url: 'home/home'
                        children: [{
                                index: '5',
                                path: '/page1',
                                name: 'page1',
                                label: '页面1',
                                icon: 'setting',
                                url: 'other/pageone'
                            },
                            {
                                index: '6',
                                path: '/page2',
                                name: 'page2',
                                label: '页面2',
                                icon: 'setting',
                                url: 'other/pagetwo'
                            }
                        ]
                    }
                ]
            }
        },
        created() {
            console.log('Aside');
        },
        methods: {
            handleOpen() {},
            handleClose() {}
        },
    }
</script>