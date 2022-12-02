import axios from 'axios';
import config from '../config'
import {
    ElMessage
} from 'element-plus'
import {
    Service
} from '@element-plus/icons-vue';

const NETWORK_ERROR = "网络请求异常，请稍后重试";
const instance = axios.create({
    baseURL: config.baseApi, // 通用请求地址前缀
    timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (req) {
    // 在发送请求之前做些什么
    const headers = req.headers;
    const {
        token = ""
    } = localStorage.getItem('userInfo') || {};
    if (!headers.Authorization) headers.Authorization = 'Bearer' + '123'
    return req;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (res) {
    // 对响应数据做点什么
    let {
        code,
        data,
        msg
    } = res.data;
    if (code === 200) {
        return data
    } else {
        // 网络请求错误
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR);
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 封装核心函数
function request(options) {
    options.method = options.method || 'get';
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }
    // 对mock的处理
    let isMock = config.mock;
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock;
    }
    // 对线上环境处理
    if (config.env === 'prod') {
        instance.defaults.baseURL = config.baseApi;
    } else {
        instance.defaults.baseURL = isMock ? config.mocApi : config.baseApi;
    }
    return instance(options)
}

export default request