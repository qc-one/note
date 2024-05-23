document.addEventListener("click", () => {
    console.log("点击了");
});
document.addEventListener("test", () => {
    console.log("自定义事件");
}, {
    once: true
});
const e = new Event('test');
document.dispatchEvent(e);
document.dispatchEvent(e);
document.dispatchEvent(e);
document.dispatchEvent(e);
//# sourceMappingURL=subscribe.js.map