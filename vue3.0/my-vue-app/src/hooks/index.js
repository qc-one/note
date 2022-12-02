/* 
    生成图片地址
*/
export function getImgSrc(name) {
    return new URL(`/src/assets/images/${name}.png`,
        import.meta.url).href;
}