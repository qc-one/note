// import svgIcon from './assets/svgs/svg.sv?url'
import svgRaw from './assets/svgs/svg.svg?raw'

// 第一种使用svg的方式
// const img = document.createElement('img');
// img.src = svgIcon;
// document.body.appendChild(img);

// 第二种使用svg的方式
document.body.innerHTML = svgRaw;
const svgEle = document.getElementsByTagName('svg')[0];
svgEle.onmouseenter = function () {
    console.log('鼠标划过')
    this.style.fill = 'red'
}