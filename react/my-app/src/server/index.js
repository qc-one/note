import express from "express";
import serverRenderer from "./serverRenderer.js";

const PORT = 3000;
const path = require("path");

const app = express();
const router = express.Router();

// 当爬虫的请求进来的时候，把所有请求导向 serverRenderer 路由
router.use("*", serverRenderer);

app.use(router);
app.listen(PORT, () => console.log(`listening on: ${PORT}`));
