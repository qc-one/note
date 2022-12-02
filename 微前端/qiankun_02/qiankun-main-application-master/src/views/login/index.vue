<template>
    <div class="login-container">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">微前端主应用workspace</h3>
            </div>

            <el-form-item prop="userName">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input
                    ref="userName"
                    v-model="loginForm.userName"
                    placeholder="用户名"
                    name="userName"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>

            <el-tooltip
                v-model="capsTooltip"
                content="Caps lock is On"
                placement="right"
                manual
            >
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="密码"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon
                            :icon-class="
                                passwordType === 'password' ? 'eye' : 'eye-open'
                            "
                        />
                    </span>
                </el-form-item>
            </el-tooltip>

            <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.native.prevent="handleLogin"
                >登录</el-button
            >
        </el-form>
    </div>
</template>

<script>
import { setToken } from "@/utils/auth"; // get token from cookie
import { initState } from "@/initQiankunState/index.js";
import { makeAllRouter } from "@/makeAllComponentRouter/index.js";
export default {
    name: "Login",
    data() {
        const validatePassword = (rule, value, callback) => {
            if (value.length < 1) {
                callback(new Error("密码不能低于1位"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                userName: "",
                password: "",
            },
            loginRules: {
                userName: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入用户名",
                    },
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validatePassword,
                    },
                ],
            },
            passwordType: "password",
            capsTooltip: false,
            loading: false,
        };
    },
    mounted() {
        if (this.loginForm.userName === "") {
            this.$refs.userName.focus();
        } else if (this.loginForm.password === "") {
            this.$refs.password.focus();
        }
    },
    methods: {
        checkCapslock(e) {
            const { key } = e;
            this.capsTooltip =
                key && key.length === 1 && key >= "A" && key <= "Z";
        },
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    setTimeout(() => {
                        const res = {
                            name: "steven",
                            username: "steven",
                            authToken: "400e4386-38f1-4d56-ab63-a9b0a2694344dc",
                            menus: [
                                {
                                    name: "手机业务来自子应用url",
                                    id: "sub_app",
                                    url: "http://10.2.51.5:8081/#/suborigin/suborigin",
                                },
                                {
                                    name: "电话业务来自子应用url",
                                    id: "sub_app2",
                                    url: "http://10.2.51.5:8081/#/subattr/subattr",
                                },
                            ],
                        };
                        const result = res;
                        window.localStorage.setItem(
                            "allUserInfo",
                            JSON.stringify(result)
                        );
                        // 初始化乾坤状态
                        initState();
                        // initState之后 window.actionsQiankun一定是存在的 可以放心变更token
                        window.actionsQiankun.setGlobalState({
                            authToken: result.authToken,
                            appName: "WORKSPACE",
                            eventType: "SET_TOKEN",
                        });
                        // 初始化路由
                        makeAllRouter();
                        setToken(result.authToken);
                        this.$router.push({
                            name: "Dashboard",
                        });
                        this.loading = false;
                    }, 1000);
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        margin-left: 10px;

        input {
            background: transparent;
            border: none;
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    height: 100%;
    width: 100%;
    background: url("../../assets/login.jpeg") no-repeat;
    background-size: cover;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }
}
</style>
