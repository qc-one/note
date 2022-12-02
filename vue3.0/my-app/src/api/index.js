import http from '../utils/request'

// 请求首页数据
export const getData = () => {
    return http.get('/home/getData', {})
}
// 请求用户列表
export const getUser = (params) => {
    return http.get('/user/getUser', params)
}
// 新增用户
export const addUser = (data) => {
    return http.post('/user/add', data)
}
// 编辑用户
export const editUser = (data) => {
    return http.post('/user/edit', data)
}
// 删除用户
export const deleteUser = (data) => {
    return http.post('/user/delete', data)
}
// 登录
export const login = (data) => {
    return http.post('/login', data)
}
// 获取用户菜单权限
export const getMenu = (data) => {
    return http.post('/permission/getMenu', data)
}