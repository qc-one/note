import componentACss from "./componentA.module.css"
import componentALess from "./componentA.module.less"

console.log('componentALess', componentALess)

console.log('componentACss', componentACss)

const div = document.createElement('div');
div.className = componentACss.footer;

document.body.appendChild(div)