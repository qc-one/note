module.exports = function (aliasConf, JSContent) {
    const entires = Object.entries(aliasConf)
    console.log('entires', entires, JSContent)
    let lastContent = JSContent;
    entires.forEach((entires) => {
        // JSContent = JSContent.replace(new RegExp(`${key}`, 'g'), value)
        const [alia, path] = entires
        const srcIndex = path.indexOf("/src");
        const realPath = path.slice(srcIndex, path.length)
        console.log('realPath', realPath)
        lastContent = JSContent.replace(alia, path)
    })
    console.log('lastContent', lastContent)
    return lastContent
}