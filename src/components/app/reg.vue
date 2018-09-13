<template>
    <el-container>
        <el-main style="display: flex;justify-content: center;align-items: center">
            <el-card class="box-card" style="width: 800px;display: flex;flex-direction: column;align-items: center">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                         class="demo-ruleForm demo-dynamic">
                    <el-form-item label="账号" prop="UserAcount">
                        <el-input v-model="ruleForm2.UserAcount"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input required="true" v-model="userPhone" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item v-model="userMail" label="邮箱">
                        <el-input style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名">
                        <el-input v-model="userName" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex';

    export default {
        name: "reg",
        data() {
            let checkUserAcount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    this.async_getUserAcount(this.ruleForm2.UserAcount);
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                userPhone: '',
                userMail: '',
                userName: '',
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    UserAcount: ''
                },
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    UserAcount: [
                        {validator: checkUserAcount, trigger: 'blur'}
                    ]
                }
            };
        },
        computed: {
            ...mapState(['userAcount'])
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.async_postUser({
                            userAcount: this.ruleForm2.UserAcount,
                            userPwd: this.ruleForm2.pass,
                            userPhone: this.userPhone,
                            userMail: this.userMail,
                            userName: this.userName
                        });
                        this.$alert('注册成功！', '注册', {
                            confirmButtonText: '确定',
                            callback: this.$router.push('/login')
                        });
                    } else {
                        alert('您的信息有误!请重新填写');
                        return false;
                    }
                });
            },
            ...mapActions(['async_getUserAcount', 'async_postUser'])
        }
    }
</script>

<style scoped>

</style>