import Mock from 'mockjs'

export default {
    /**
     * 登录
     * @param username，password
     * @return {{code: number, data: {message: string}}}
     */
    login(config) {
        console.log(config);
        const {
            username,
            password
        } = JSON.parse(config.body);
        console.log(username, password);
        return {
            code: 200,
            data: {
                token: Mock.Random.guid(),
                message: '登录成功'
            }
        }
    }
}