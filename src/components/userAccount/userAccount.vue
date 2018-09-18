<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 20px">
        <el-tab-pane label="用户管理" name="first">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">添加
            </el-button>
            <!--搜索-->
            <div style="margin-top: 15px;">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select" style="width: 500px">
                    <el-select v-model="searchSelect" slot="prepend" placeholder="请选择" style="width: 100px">
                        <el-option label="账号" value="userAcount"></el-option>
                        <el-option label="手机" value="userPhone"></el-option>
                        <el-option label="邮箱" value="userMail"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                </el-input>
            </div>

            <!--添加窗口-->
            <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="姓名" label-width="120px">
                        <el-input v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" label-width="120px">
                        <el-input v-model="form.userAcount" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="120px">
                        <el-input v-model="form.userPwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" label-width="120px">
                        <el-input v-model="form.userPhone" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" label-width="120px">
                        <el-input v-model="form.userMail" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" label-width="120px">
                        <el-select v-model="form.userType" placeholder="请选择角色" value="">
                            <el-option label="平台管理员" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="postUser">确 定</el-button>
                </div>
            </el-dialog>

            <!--修改窗口-->
            <el-dialog title="修改用户" :visible.sync="dialogAmendVisible">
                <el-form :model="amend">
                    <el-form-item label="姓名" label-width="120px">
                        <el-input v-model="amend.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" label-width="120px">
                        <el-input v-model="amend.userAcount" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="120px">
                        <el-input v-model="amend.userPwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" label-width="120px">
                        <el-input v-model="amend.userPhone" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" label-width="120px">
                        <el-input v-model="amend.userMail" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" label-width="120px">
                        <el-select v-model="amend.userType" placeholder="请选择角色" value="">
                            <el-option label="平台管理员" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogAmendVisible = false">取 消</el-button>
                    <el-button type="primary" @click="putUser">确 定</el-button>
                </div>
            </el-dialog>

            <!--表格-->
            <el-table
                    :data="list"
                    border
                    style="width: 100%;margin-top: 20px">
                <el-table-column
                        fixed
                        prop="_id"
                        label="ID"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="userAcount"
                        label="账号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="userPwd"
                        label="密码"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="userPhone"
                        label="手机"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="userMail"
                        label="邮箱"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="userType"
                        label="角色"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="userStatus"
                        label="状态"
                        width="120">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="门店管理员审核" name="second">
            <el-table
                    :data="audit"
                    border
                    style="width: 100%;margin-top: 20px">
                <el-table-column
                        fixed
                        prop="_id"
                        label="ID"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="userAcount"
                        label="账号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="userPwd"
                        label="密码"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="userPhone"
                        label="手机"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="userMail"
                        label="邮箱"
                        width="200">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleAllow(scope.$index, scope.row)">通过
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDeny(scope.$index, scope.row)">拒绝
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex';

    export default {
        name: "userAccount",
        data() {
            return {
                search: '',
                searchSelect: '',
                activeName: 'first',
                dialogFormVisible: false,
                dialogAmendVisible: false,
                form: {
                    userName: '',
                    userAcount: '',
                    userPwd: '',
                    userPhone: '',
                    userMail: '',
                    userType: '0',
                    userStatus: '1'
                },
                amend: {
                    userName: '',
                    userAcount: '',
                    userPwd: '',
                    userPhone: '',
                    userMail: '',
                    userType: '0',
                    userStatus: '1',
                    _id: ''
                }
            };
        },
        mounted: function () {
            this.async_getUsers();
            this.async_getAudit();

        },
        created: function () {
            console.log(this)
        },
        computed: {
            ...mapState('userAccount', ['list', 'audit'])
        },
        methods: {
            async handleAllow(index, row) {
                this.async_putAudit({
                    userStatus: '1',
                    _id: row._id
                });
                this.async_getAudit();
                this.async_getUsers();
            },
            async handleDeny(index, row) {
                this.async_putAudit({
                    userStatus: '2',
                    _id: row._id
                });
                this.async_getAudit();
                this.async_getUsers();
            },
            async searchBtn() {
                console.log(this.search, this.searchSelect);
                await this.async_searchUsers({
                    search: this.search,
                    searchSelect: this.searchSelect
                })
            },

            async putUser() {
                switch (this.amend.userStatus) {
                    case "申请中":
                        this.amend.userStatus = "0";
                        break;
                    case "可用":
                        this.amend.userStatus = "1";
                        break;
                    default:
                        this.amend.userStatus = "2";
                        break;
                }
                await this.async_putUser({
                    userName: this.amend.userName,
                    userAcount: this.amend.userAcount,
                    userPwd: this.amend.userPwd,
                    userPhone: this.amend.userPhone,
                    userMail: this.amend.userMail,
                    userType: this.amend.userType === "平台管理员" ? "0" : "1",
                    userStatus: this.amend.userStatus,
                    _id: this.amend._id
                });
                this.dialogAmendVisible = false;
                this.async_getUsers()
            },
            async postUser() {
                await this.async_postUser({
                    userName: this.form.userName,
                    userAcount: this.form.userAcount,
                    userPwd: this.form.userPwd,
                    userPhone: this.form.userPhone,
                    userMail: this.form.userMail,
                    userType: '0',
                    userStatus: '1'
                });
                this.dialogFormVisible = false;
                this.async_getUsers()
            },
            handleClick(tab, event) {
                this.activeName = tab.name;
            },
            handleEdit(index, row) {
                this.amend.userName = row.userName;
                this.amend.userAcount = row.userAcount;
                this.amend.userPwd = row.userPwd;
                this.amend.userPhone = row.userPhone;
                this.amend.userMail = row.userMail;
                this.amend.userType = row.userType;
                this.amend.userStatus = row.userStatus;
                this.amend._id = row._id;
                this.dialogAmendVisible = true;
            },
            async handleDelete(index, row) {
                await this.async_DeleteUsers({
                    _id: row._id
                });
                this.async_getUsers();
            },
            ...mapActions('userAccount', [
                'async_getUsers',
                'async_postUser',
                'async_DeleteUsers',
                'async_putUser',
                'async_searchUsers',
                'async_getAudit',
                'async_putAudit'
            ])
        }
    }
</script>

<style scoped>

</style>