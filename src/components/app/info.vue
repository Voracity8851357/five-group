<template>
    <el-card class="box-card">
        <el-header style="margin-bottom:30px" >
            <el-menu router class="el-menu-demo" mode="horizontal">
                <!--<el-menu-item index="/shoppingTrolley"><i class="el-icon-goods"></i>购物车</el-menu-item>-->
                <!--<el-menu-item index="/todoList"><i class="el-icon-document"></i>备忘录</el-menu-item>-->
                <!--<el-menu-item index="/getEmp"><i class="el-icon-loading"></i>员工列表</el-menu-item>-->
            </el-menu>
        </el-header>
        <router-view></router-view>
    </el-card>
</template>

<script>
    export default {
        name: "info",
        methods: {
            // shoppingTrolley() {
            //     this.$router.push('shoppingTrolley');
            // },
            // todoList() {
            //     this.$router.push('todoList');
            // },
            // getEmp() {
            //     this.$router.push('getEmp');
            // }
        }
    }
</script>

<style scoped>

</style>