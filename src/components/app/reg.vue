<template>
    <el-container>
        <el-main style="display: flex;justify-content: center;align-items: center">
            <div class="reg-container">
                <h1>请注册</h1>
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"
                         label-position="left"
                         size="small"
                         class="demo-ruleForm demo-dynamic">
                    <el-form-item label="真实姓名">
                        <el-input v-model="userName" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone" required>
                        <el-input required="true" v-model.number="ruleForm2.phone"
                                  auto-complete="off" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="email"
                            label="邮箱"
                            :rules="[
                              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                            ]">
                        <el-input v-model="ruleForm2.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="UserAcount">
                        <el-input v-model="ruleForm2.UserAcount" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass" required>
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"
                                  placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass" required>
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"
                                  placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <el-button class="reg-btn" type="primary" @click="submitForm('ruleForm2')">注册</el-button>
                    <el-button type="text" @click="$router.push('/login')">已有账号？</el-button>
                </el-form>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {mapActions, mapState} from 'vuex';

    export default {
        name: "reg",
        data() {
            let checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('电话不能为空'));
                }
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 10000000000) {
                        callback(new Error('必须是11位手机号'));
                    } else {
                        callback();
                    }
                }
            };
            let checkUserAcount = async (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    await this.async_getUserAcount(this.ruleForm2.UserAcount);
                    if (this.isRepeat) {
                        callback(new Error('账号已存在！请重新输入'));
                    } else {
                        callback();
                    }
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
                userName: '',
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    UserAcount: '',
                    phone: '',
                    email: ''
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
                    ],
                    phone: [
                        {validator: checkPhone, trigger: 'blur'}
                    ]
                }
            };
        },
        computed: {
            ...mapState('app', ['userAcount', 'isRepeat'])
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.async_postUser({
                            userAcount: this.ruleForm2.UserAcount,
                            userPwd: this.ruleForm2.pass,
                            userPhone: this.ruleForm2.phone,
                            userMail: this.ruleForm2.email,
                            userName: this.userName,
                            userType: '1',
                            userStatus: '0'
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
            ...mapActions('app', ['async_getUserAcount', 'async_postUser'])
        }
    }
</script>

<style scoped>
    .el-container {
        height: 100%;
        background: #F3F5F8;
    }

    .demo-ruleForm {
        width: 350px;
    }

    .el-form-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px !important;
    }

    h1 {
        height: 140px;
        line-height: 140px;
        margin: 0;
        color: #666;
    }

    .reg-container {
        position: relative;
        height: 780px;
        width: 450px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        background: #fff;
    }

    .reg-btn {
        margin-top: 40px;
        width: 100%;
    }

    .reg-btn + button {
        width: 100%;
        margin: 6px 0 0;
    }
</style>