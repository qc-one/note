


// 获得触发报错的元素
function getLastEvent() {
    let lastEvent = null;
    ['click', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'change'].forEach(function (event) {
        document.addEventListener(event, (e) => {
            lastEvent = e;
        }, {
            capture: true,
            passive: true
        });
    });
    return lastEvent;
}

// 上报错误信息
function tracker(err: any) {
    let url = 'http://127.0.0.1:8090/error';
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(err),
    });
}

export function injectJsError() {
    // 监听js错误
    window.addEventListener("error", function (error) {
        console.log('error', error);
        let err = {
            "kind": "stability", // 大类
            "type": error.type, // 小类
            "errorType": "jsError", // 错误类型
            "url": "", // 页面URL
            "message": error.message, // 类型详情
            "filename": error.filename, // 访问的文件名 
            "timestamp": error.timeStamp, // 访问时间戳
            "position": error.lineno + ':' + error.colno, // 行列信息
            "stack": error.error.stack, // 堆栈信息
            // "selector": getLastEvent(), // 选择器0
        }
        console.log('err', err);
        tracker(err)
    });
}