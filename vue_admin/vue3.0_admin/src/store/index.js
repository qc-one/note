import {
    defineStore
} from 'pinia'

// 第一个参数是应用程序中 store 的唯一 id
export const menuStore = defineStore('users', {
    // 其它配置项
    state: () => {
        return {
            menuList: [{
                    path: "/",
                    name: "home",
                    label: "首页",
                    icon: "s-home",
                    url: "home/home",
                    index: "1",
                },
                {
                    index: "2",
                    path: "/mall",
                    name: "mall",
                    label: "商品管理",
                    icon: "video-play",
                    url: "mallmanage/mallmanage",
                },
                {
                    index: "3",
                    path: "/user",
                    name: "user",
                    label: "用户管理",
                    icon: "user",
                    url: "usermanage/usermanage",
                },
                {
                    index: "4",
                    // path: '/',
                    name: "/other",
                    label: "其他",
                    icon: "s-tools",
                    // url: 'home/home'
                    children: [{
                            index: "5",
                            path: "/other/pageone",
                            name: "page1",
                            label: "页面1",
                            icon: "setting",
                            url: "other/pageone",
                            children: [{
                                index: "7",
                                path: "/other/pageone",
                                name: "page3",
                                label: "页面3",
                                icon: "setting",
                                url: "other/pageone",
                            }, ],
                        },
                        {
                            index: "6",
                            path: "/other/pagetwo",
                            name: "page2",
                            label: "页面2",
                            icon: "setting",
                            url: "other/pagetwo",
                        },
                    ],
                },
            ],
        };
    },
    getters: {},
    actions: {

    },
})