<template>
    <el-container class="login-outer">
        <el-main style="display: flex;justify-content: center;align-items: center">
            <el-row class="login-container">
                <el-col class="login-left" :xs="24" :md="8" :lg="8">
                    <el-form size="small">
                        <p class="login-prompt">请登录</p>
                        <el-form-item>
                            <el-input v-model="userAcount" style="width: 300px">
                                <template slot="prepend">帐号</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="password" type="password" style="width: 300px">
                                <template slot="prepend">密码</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="login-btn" type="primary" @click="login">登录</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="text" @click="reg">还没有帐号？</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :md="16" :lg="16" class="login-right hidden-xs-only">
                    <h1>后 台 管 理</h1>
                    <p>五 组</p>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';

    import {mapState, mapActions} from 'vuex';

    export default {
        name: "login",
        data() {
            return {
                userAcount: '',
                password: '',
            }
        },
        computed: {
            ...mapState('app', ['isLogin', 'userType', 'userStatus'])
        },
        methods: {
            reg() {
                this.$router.push('reg')
            },
            async login() {
                await this.async_login({
                    userAcount: this.userAcount,
                    password: this.password
                });
                console.log(this.isLogin, this.userType, this.userStatus);
                if (this.isLogin) {
                    if (this.userType === '0') {
                        this.$alert('登陆成功！', '登录', {
                            confirmButtonText: '确定',
                            callback: this.$router.push('indexPlatform')
                        });
                    } else if (this.userType === '1') {
                        if (this.userStatus === '0') {
                            this.$alert('账号审核中！', '登录', {
                                confirmButtonText: '确定',
                            });
                        } else if (this.userStatus === '1') {
                            this.$alert('登陆成功！', '登录', {
                                confirmButtonText: '确定',
                                callback: this.$router.push('indexStore')
                            });
                        } else if (this.userStatus === '2') {
                            this.$alert('审核失败！请重新注册', '登录', {
                                confirmButtonText: '确定',
                            });
                        }
                    } else {
                        this.$alert('登陆失败！', '登录', {
                            confirmButtonText: '确定',
                        });
                    }
                }
            },
            ...mapActions('app', ['async_login']),
        }
    }
</script>

<style scoped>
    .login-outer {
        height: 100%;
        background: #F3F5F8;
    }

    .login-container {
        position: relative;
        top: -50px;
        display: flex;
        align-items: center;
        width: 1200px;
        min-width: 500px;
        border-radius: 5px;
        box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .login-left {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 350px;
        background: #fff;
    }

    .login-left .el-form {
        text-align: center;
    }

    .login-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 350px;
        background: linear-gradient(rgba(99, 156, 185, 0.92), rgba(99, 156, 185, 0.92)), url("./images/login-bg.jpg") center;
        color: #ffffff;
    }

    .login-right > * {
        margin-left: 50px;
    }

    .login-prompt {
        font-size: 14px;
        margin: 0 0 50px;
        text-align: center;
        color: #aaa;
    }

    .login-btn {
        width: 100% !important;
    }
</style>