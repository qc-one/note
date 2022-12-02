<template>
    <div class="login-box">
        <el-form
            :model="loginForm"
            :rules="rules"
            class="login-contaioner"
            :inline="true"
            label-width="70px"
            ref="loginForm"
        >
            <h3 class="login_title">系统登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input
                    v-model="loginForm.username"
                    placeholder="请输入账号"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { login, getMenu } from "../../api";
import Cookie from "js-cookie";
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: "",
                password: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入账号",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        // 登录
        submit() {
            this.$refs.loginForm.validate((valid) => {
                console.log(valid, this.loginForm);
                if (valid) {
                    getMenu(this.loginForm).then(({ data }) => {
                        console.log(data, "denglu");
                        if (data.code === 20000) {
                            const { token, menu } = data.data;
                            Cookie.set("token", token);
                            this.$store.commit("tab/setMenu", menu);
                            this.$store.commit("tab/addMenu", this.$router);
                            this.$router.push("/home");
                        } else {
                            this.$message.error(data.data.message);
                        }
                    });
                }
            });
        },
    },
};
</script>
<style lang="less" scoped>
.login-box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding-top: 180px;
    .login-contaioner {
        width: 350px;
        border-radius: 15px;
        background-clip: padding-box;
        margin: 0 auto;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border-radius: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6ca;
        box-sizing: border-box;
        .el-input {
            width: 198px;
        }
        .el-button {
            margin: 10px 0 0 105px;
        }
        .login_title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
    }
}
</style>