// import mockJS from "mockjs"
const mockJS = require("mockjs")

const userList = mockJS.mock({
    "list|10": [{
        "id|+1": 1,
        name: "@cname",
        age: "@integer(20, 30)",
        address: "@county(true)",
        avatar: "@image('200x150', '#4A7BF7')",

    }]
})
module.exports = [
    {
        method: "post",
        url: "/api/users",
        response: ({body}) => {
            // body = JSON.parse(body)
            return {
                code: 200,
                msg: "success",
                data: userList
            }
        }
    }
]