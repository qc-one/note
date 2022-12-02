import Mock from 'mockjs'

export default {
    getMenu(config) {
        const {
            username,
            password
        } = JSON.parse(config.body);
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [{
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home/index'
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "video-play",
                            url: "Mall/index",
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "用户管理",
                            icon: "user",
                            url: "User/index",
                        },
                        {
                            path: "/other",
                            name: 'Other',
                            label: "其他",
                            icon: "s-tools",
                            url: "Other/index",
                            children: [{
                                    path: "pageone",
                                    name: "page1",
                                    label: "页面1",
                                    icon: "setting",
                                    url: "PageOne/index",
                                    children: [{
                                        path: "pageone",
                                        name: "page3",
                                        label: "页面3",
                                        icon: "setting",
                                        url: "PageOne/index",
                                    }, ],
                                },
                                {
                                    path: "pagetwo",
                                    name: "page2",
                                    label: "页面2",
                                    icon: "setting",
                                    url: "PageTwo/index",
                                },
                            ],
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
            return {
                code: 20000,
                data: {
                    menu: [{
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'home/index'
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "video-play",
                            url: "mallmanage/mallmanage",
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }
    }
}