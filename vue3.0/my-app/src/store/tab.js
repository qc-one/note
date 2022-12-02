import Cookie from 'js-cookie';

export default {
    namespaced: true,
    state: {
        isCollapse: false,
        tabsList: [{
            path: "/home",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "home/home",
            index: "1",
        }, ], // 面包屑
        menu: []
    },
    mutations: {
        // 常规更新
        updateCommon(state, payload) {
            Object.assign(state, payload);
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            if (val.name !== "home") {
                const index = state.tabsList.findIndex(
                    (i) => i.name === val.name
                );
                if (index === -1) {
                    state.tabsList.push(val);
                }
            }
        },
        // 删除指定的tag数据
        delMenu(state, item) {
            const index = state.tabsList.findIndex(val => val.name === item.name);
            state.tabsList.splice(index, 1)
        },
        // 设置menu的数据
        setMenu(state, val) {
            state.menu = val;
            Cookie.set('menu', JSON.stringify(val));
        },
        // 动态注册路由
        addMenu(state, router) {
            // 判断缓存中是否有数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'));
            state.menu = menu;
            // 组装动态路由的数据
            const menuArr = [];
            console.log(menu, 'iii');
            menu.forEach(item => {
                if (item.children) {
                    item.children.map(i => {
                        i.component = () => import(`../views/${i.url}`);
                        return i;
                    })
                    menuArr.push(...item.children);
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArr.push(item);
                }
            });
            console.log(menuArr, 'mmm');
            menuArr.forEach(item => {
                router.addRoute('Main', item);
            })
        }
    }
}

function fn(o) {
    o.forEach(item => {
        if (item.children) {
            fn(item.children)
        }
        item.abc = item.url
    });
    return o
}