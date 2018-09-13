<template>
    <el-container>
        <el-main style="display: flex;justify-content: center;align-items: center">
            <el-card class="box-card" style="width: 800px;display: flex;flex-direction: column;align-items: center">
                <el-form label-width="80px">
                    <el-form-item label="账号">
                        <el-input v-model="userAcount" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="password" type="password" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-button @click="reg">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex';

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
                            callback: this.$router.push('index')
                        });
                    } else if (this.userType === '1') {
                        if (this.userStatus === '0') {
                            this.$alert('账号审核中！', '登录', {
                                confirmButtonText: '确定',
                            });
                        } else if (this.userStatus === '1') {
                            this.$alert('登陆成功！', '登录', {
                                confirmButtonText: '确定',
                                callback: this.$router.push('index')
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

</style>