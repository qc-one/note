 
# vue-admin 1.0 说明文档

vue-admin是集权限管理和常用组件库于一体的管理系统框架

由前后端两部分组成，前端基于 ```vue-cli``` 构建，后端采用 ```ThinkPHP6.0``` 框架提供接口服务

实现了市面上大部分管理系统都通用的功能和结构，开发者无需在每次开始一个新项目的时候重复搭建框架结构，只需在此基本结构上编写即可，省时省力。

下面是本框架的结构目录，我将重点介绍其中的一些技术亮点和使用方法，以及框架的一些不足和未来的优化方向。

> [项目地址 点击查看](https://gitee.com/zhangyubk/vue-admin)

```
.
├── common
│   ├── mixins
│   │   └── common.js  混入共享方法
│   └── utils
│       ├── md5.js     MD5算法
│       └── utils.js   常用共享方法
├── components
│   ├── button-search.vue  高级搜索组件
│   └── menuItem.vue       无限分级菜单
├── plugins
│   ├── axios.js
│   └── element.js
├── store
│   ├── index.js
│   └── modules
│       ├── tages.js  页签管理
│       └── user.js   用户信息管理
├── styles
│   ├── element-variables.scss
│   └── variables.scss
└── views
    ├── assembly
    │   ├── number
    │   │   └── index.vue  滚动数字组件
    │   └── richtext
    │       ├── components
    │       │   └── zhangyuTinymce.vue  富文本编辑器组件
    │       └── index.vue
    ├── auth
    │   └── index.vue  选项管理
    ├── index
    │   └── index.vue  首页数据统计
    ├── login
    │   └── index.vue  登录页
    ├── menu
    │   └── index.vue  菜单管理
    ├── role
    │   └── index.vue  角色管理
    └── user
        └── index.vue
	├── layout.vue  框架页
├── App.vue
├── main.js
├── router.js  路由配置
```

## 1. 支持扫码登录

登录界面预留了扫码登录的入口，如果系统需要接入微信体系，那么就可以通过扫码这里的二维码完成登录。

![图片](/public/vueadmin/clickQrcode.jpg)

![图片](/public/vueadmin/Qrcode.jpg)

## 2. Token鉴权和签名校验

为了防止接口被恶意请求，除了登录接口以外，所有的接口在请求的时候需要在 ```header``` 中携带 ```token``` 和 ```sign```

```token``` 是由 ```盐``` 和用户ID拼接后得到的，在后端的代码为

```
sha1(md5(uniqid(md5(KEY.$admin['id']),true))) //不可逆加密
```

然后以 ```token``` 为键，用户信息为值存入 ```Redis``` 中

前后端统一签名算法

```
//生成签名
function createSign($sign_data)
{
	$sign_data['signKey'] = 'VUE-ADMIN';
    ksort($sign_data);
    $sign_data_str = http_build_query($sign_data);
    return md5($sign_data_str);
}
```

```
//签名算法Get
const createSignForGet = (url) => {
	//对象转参数数组
	let arr = objectToArray(geturl(url))
	//排序
	arr.sort()
	//组合排序后的字符串
	let sign_str = arr.sort().join('&') 
	return M.hexMD5(sign_str)
}
//对象转参数数组
const objectToArray = (obj) => {
	let arr = []
	for(let i in obj){
		arr.push(i + '=' + obj[i])
	}
	return arr
}
```

## 3. 全局异常处理

前后端都做了规范化的异常处理，前端通过 ```axios``` 全局响应拦截，后端通过重写异常处理函数来规定返回的异常数据格式。

## 4. mixins混入

本框架将常用的 ```分页``` ```loading``` ```页面列表请求``` 全部写入 ```mixins```,这样每次创建一个新的页面就不需要重复编写这些代码，大大提升了开发效率。

```
mixins:[common]
```

## 5. 依赖注入

在 ```layout``` 页编写弹窗组件，可以在其他组件中跨组件操作。

```
provide(){
	return {
		layout: this
	}
}
inject:['layout']
```

## 6. 公共搜索模块

普通搜索
![图片](/public/vueadmin/search1.jpg)

高级搜索
![图片](/public/vueadmin/search2.jpg)

## 7. 数据库设计

本权限系统共分为6张表，分别为

【用户表】

【角色表】

【角色和权限关联表】

【菜单表】

【菜单和权限关联表】

【权限表】

对应关系如图：

![图片](/public/vueadmin/db.jpg)

## 8. 两个重要算法

#### 1. 单表菜单无限分级
```
//整理成树形结构
public function tree($data,$id=0)
{
	$tree = [];
	foreach($data as $key => $value){
		if($value['uid'] == $id){
			$value['children'] = $this->tree($data,$value['id']);
			// if(!$value['children']){
			// 	unset($value['children']);
			// }
			$tree[] = $value;
		}
	}
	return $tree;
}
```

#### 2. 对比结构新增删除

|  原始   | 修改后  | 操作 |
|  ----  | ----  | ---- |
|  123  | 12345 | 新增45 |
|  123  | 12 | 删除3 |
|  123  | 45 | 新增45删除123 |

```
//更新角色
$roleAuth = app('app\model\RoleAuth');
$old = $roleAuth->where('role_id',$param['id'])->select();
$arr = [];
for($j=0;$j<=count($old)-1;$j++){
	array_push($arr,$old[$j]['auth_id']);
}
$has = [];
$save = [];
for($i=0;$i<=count($param['auth_ids'])-1;$i++){
	if(in_array($param['auth_ids'][$i],$arr)){
		//有就提出来
		array_push($has,$param['auth_ids'][$i]);
	}else{
		//新增
		array_push($save,[
			'role_id' => $param['id'],
			'auth_id' => $param['auth_ids'][$i]
		]);
	}
}
$roleAuth->saveAll($save);
```

## 9. 优化与不足

* 界面做响应式适配
* 三级页面可通过页签打开
* 删除操作进行校验和关联
* 接口进行权限限制
* 账号密码登录接入极验