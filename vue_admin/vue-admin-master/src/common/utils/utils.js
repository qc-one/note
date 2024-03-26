//签名算法Post
const createSignForPost = (param) => {
	//对象转参数数组
	let arr = objectToArray(param)
	//排序
	arr.sort()
	//组合排序后的字符串
	let sign_str = arr.sort().join('&') 
	return M.hexMD5(sign_str)
}

//获取url的参数并转为对象
const geturl = (url) => {
    var ret = {};
    var queryStr=url.replace(/^[^\?#]*\??/g,'').replace(/#DIALOG_.*$/g,'');
    queryStr.replace(/([^=&]+)=([^&]*)/g, function (a, b, c) {
        b = decodeURIComponent(b);
        c = decodeURIComponent(c);
        ret[b] = c;
        ret[b.toLowerCase()] = c;
    });
    return ret;
}

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

//时间戳格式化
const formatDateTime = (date = 0, fmt = 'yyyy-MM-dd hh:mm:ss') => {
	date = new Date(+date)
	 if (/(y+)/.test(fmt)) {
	   fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	 }
	 let o = {
	   'M+': date.getMonth() + 1,
	   'd+': date.getDate(),
	   'h+': date.getHours(),
	   'm+': date.getMinutes(),
	   's+': date.getSeconds()
	};
	for (let k in o) {
	  if (new RegExp(`(${k})`).test(fmt)) {
	    let str = o[k] + '';
	    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
	  }
	}
	return fmt;
}
import M from './md5.js'
export default {
	createSignForGet,
	createSignForPost,
	formatDateTime
}