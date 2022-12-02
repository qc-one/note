// 当前环境
let env =
    import.meta.env.MODE || 'prod';
let EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: 'http://127.0.0.1:5173/api'
    },
    test: {
        baseApi: '//test.futur.com/api',
        mockApi: 'https://www.fastmock.site/mock/2123123123'
    },
    prod: {
        baseApi: '//future.com/api',
        mockApi: 'https://www.fastmock.site/mock/2123123123'
    }
}

export default {
    env,
    mock: false,
    ...EnvConfig[env]
}