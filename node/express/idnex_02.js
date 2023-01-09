const express = require("express");
const router = require("./router/index");

const app = express();

app.use(router);

app.listen("80", () => {
    console.log("express serve running at http://127.0.0.1");
})