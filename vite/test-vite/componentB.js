import componentBCss from "./componentB.module.css"

console.log('componentBCss', componentBCss)

const div = document.createElement('div');
div.className = componentBCss.footer;

document.body.appendChild(div)