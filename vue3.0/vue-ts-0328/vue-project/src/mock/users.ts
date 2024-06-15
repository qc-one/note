import Mock from "mockjs";

// Mock.mock(/.*?\/users/, "get", {
Mock.mock(/.*?\/users/, "get", {
    "code": 0,
    "msg": "success",
    "data|3": [
        {
            "id|+1": 1,
            "name": "@cname",
            "age|21-25": 1,
            "addr": "@county(true)"
        }
    ]
})