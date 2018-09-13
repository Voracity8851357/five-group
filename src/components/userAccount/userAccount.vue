<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 20px">
        <el-tab-pane label="用户管理" name="first">
            <el-button type="primary" icon="el-icon-edit">添加</el-button>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
            门店管理员审核
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex';

    export default {
        name: "userAccount",
        data() {
            return {
                activeName: 'first'
            };
        },
        mounted: function () {
            this.async_getUsers()
        },
        computed: {
            ...mapState('userAccount', ['list'])
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleEdit(index, row) {
                console.log(index, row)
            },
            handleDelete(index, row) {
                console.log(index, row)
            },
            ...mapActions('userAccount', ['async_getUsers'])
        }
    }
</script>

<style scoped>

</style>