import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

const path = require("path");
const fs = require("fs");

export default (req, res, next) => {
    // 获取当前项目的 HTML 模板文件路径
    const filePath = path.resolve(__dirname, "..", "build", "index.html");

    // 读取该文件
    fs.readFile(filePath, "utf8", (err, htmlData) => {
        if (err) {
            console.error("err", err);
            return res.status(404).end();
        }

        // 借助 react-dom 依赖下的方法将 JSX 渲染成 HTML string
        const html = ReactDOMServer.renderToString(<App />);

        // 将 HTML string 替换到 root 中
        return res.send(
            htmlData.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            )
        );
    });
};
