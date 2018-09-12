<template>
    <el-container>
        <el-main style="display: flex;justify-content: center;align-items: center">
            <el-card class="box-card" style="width: 800px;display: flex;flex-direction: column;align-items: center">
                <el-form label-width="80px">
                    <el-form-item label="账号">
                        <el-input v-model="userName" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名">
                        <el-input style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="transitional">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "reg",
        data() {
            return {
                userName: ''
            }
        },
        methods: {
            transitional() {
                this.$router.push(`/login/${this.userName}`)
            }
        }
    }
</script>

<style scoped>

</style>