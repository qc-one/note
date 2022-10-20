<template>
    <div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <!-- <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="false"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <SidebarItem
                    v-for="route in allMenusfull"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu> -->
            <el-menu
                :default-active="activeMenu"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <MenuTree :menuData="allMenusfull"></MenuTree>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import { Scrollbar } from "element-ui";
// import SidebarItem from "./SidebarItem";
// import utils from "@/utils";
// import { constantRoutes } from "@/router/index";
import variables from "@/styles/variables.scss";
import MenuTree from "./MenuTree.vue";

export default {
    components: { MenuTree },
    // components: { SidebarItem },
    data() {
        return {
            allMenusfull: [],
        };
    },
    computed: {
        // ...mapGetters(["sidebar"]),
        // routes() {
        //     return this.$router.options.routes;
        // },
        activeMenu() {
            const route = this.$route;
            const { path } = route;
            return path;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            // return !this.sidebar.opened;
            return true;
        },
    },
    created() {
        this.makeAllDynamicMenus();
        this.makeStaticRouter();
    },
    methods: {
        // fullMenuInfo(element) {
        //     element.path = element.id;
        //     element.meta = {
        //         icon: element.icon || element.privilegeIcon,
        //         title: element.name,
        //     };
        // },
        // fullRouternfo(element) {
        //     const pathSplit = utils.splitUrl(element.url);
        //     const allPath = pathSplit[1];
        //     element.path = allPath;
        //     element.meta = {
        //         title: element.name,
        //     };
        // },
        fullFisrtNoChildren() {
            // fullFisrtNoChildren(element) {
            // const pathSplit = utils.splitUrl(element.url); // ['http://10.2.51.5:8081', '/subattr/subattr']
            // const allPath = pathSplit[1];
            // const splitPath = allPath.split("/");
            // const firstPath = splitPath[1];
            // element.path = `/${firstPath}${element.id}`;
            // element.meta = {
            //     title: element.name,
            // };
            // element.children = [
            //     {
            //         path: allPath,
            //         name: element.id,
            //         meta: { title: element.name, icon: "form" },
            //     },
            // ];
        },
        makeAllDynamicMenus() {
            const allInfoJson =
                window.localStorage.getItem("allUserInfo") || "{}";
            const allUserInfo = JSON.parse(allInfoJson);
            const menus = allUserInfo.menus || [];
            // console.log(menus, "menusmenusmenus");
            // menus的数据结构
            // {
            //         name: "手机业务来自子应用url",
            //         id: "sub_app",
            //         url: "http://10.2.51.5:8081/#/suborigin/suborigin",
            //         children: [
            //             {
            //                 name: "电话业务children",
            //                 id: "sub_app2",
            //                 url: "http://10.2.51.5:8081/#/subattr/subattr",
            //             },
            //             {
            //                 name: "电话业务children",
            //                 id: "sub_app2",
            //                 url: "http://10.2.51.5:8081/#/subattr/subattr",
            //             },
            //         ],
            //     },
            // 正确路由的数据结构
            // 单排
            // for (let firstIndex = 0; firstIndex < menus.length; firstIndex++) {
            //     const firstElement = menus[firstIndex] || {};
            //     this.fullFisrtNoChildren(firstElement);
            // }
            this.allMenusfull = menus;
        },
        makeStaticRouter() {
            // // copy一下 不能破坏路由原始文件
            // const constantRoutesCopy = JSON.parse(
            //     JSON.stringify(constantRoutes)
            // );
            // const menusNoHidden = constantRoutesCopy.filter(
            //     (item) => !item.hidden
            // );
            // this.allMenusfull = [...menusNoHidden, ...this.allMenusfull];
            // console.log(this.allMenusfull, "this.allMenusfull");
        },
    },
};
</script>
