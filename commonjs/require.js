function require(id) {
    const cachedModule = Module._cache[id];
    // 模块是否被加载过，加载过则取出来走缓存
    if (cachedModule) {
        return cachedModule.exports;
    }
    const module = {
        exports: {},
        loaded: false,
    }
    // 对模块进行缓存
    Module._cache[id] = module
    // 这一步执行文件内容
    // 为 true 则加载完成，返回对象
    module.loaded = true
    return module.exports
}