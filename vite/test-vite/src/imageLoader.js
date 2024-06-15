// 学习加载静态图片资源
// import imgUrl from './assets/images/001.png?raw'
import imgUrl from './assets/images/001.png'

// 服务端在读取图片文件的内容会拿到一个buffer（二进制字符串），图片地址后面加raw参数，告诉服务端不要做任何处理，直接返回图片内容（buffer）。

console.log(imgUrl, 'imgUrl')

const img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img);
