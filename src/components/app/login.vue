<template>
    <el-card class="box-card" style="width: 500px">
        <el-form label-width="80px">
            <el-form-item label="账号">
                <el-input :value="this.userName" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button @click="reg">注册</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                userName: ''
            }
        },
        beforeMount() {
            this.userName = this.$route.params.userName;
        },
        methods: {
            reg() {
                this.$router.push('reg')
            },
            login() {
                this.$router.push('info')
            },
        }
    }
</script>

<style scoped>

</style>