import axios from 'axios'

export const useAxios = axios.create({
    baseURL: 'http://localhost:3000',
    // timeout: 5000,
})
useAxios.interceptors.request.use(config => {
    config.headers["token"] = "xxx"
    return config;
})
useAxios.interceptors.response.use((res) => {
    return res.data;
}, (err) => {
    console.log(err, 'err')
    return Promise.reject(err)
})
