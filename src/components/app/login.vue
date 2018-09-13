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
                password: ''
            }
        },
        methods: {
            reg() {
                this.$router.push('reg')
            },
            login() {
                this.async_login({
                    userAcount: this.userAcount,
                    password: this.password
                }, (data) => {
                    if (data.length > 0) {
                        this.$alert('注册成功！', '注册', {
                            confirmButtonText: '确定',
                            callback: this.$router.push('index')
                        });
                    } else {
                        this.$alert('登陆失败！', '登录', {
                            confirmButtonText: '确定',
                        });
                    }
                });
            },
            ...mapActions(['async_login'])
        }
    }
</script>

<style scoped>

</style>