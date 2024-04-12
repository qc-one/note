import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
import loginApi from './mockData/login'
import permissionApi from './mockData/permission'

// 定义mock请求拦截
Mock.mock('/home/getData', 'get', homeApi.getStaticData);

// 用户列表
Mock.mock('/user/add', 'post', userApi.createUse)
Mock.mock('/user/edit', 'post', userApi.updatedUser)
Mock.mock('/user/delete', 'post', userApi.deleteUser)
Mock.mock(/\/user\/getUser/, userApi.getUserList)

// 登录
Mock.mock(/\/login/, 'post', loginApi.login)
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)