<template>
    <el-container class="container">
        <el-header class="header">Header</el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu class="aside-menu" router>
                    <el-menu-item index="/index/applyForShop">
                        <i class="el-icon-menu"></i>
                        <span slot="title">门店申请</span>
                    </el-menu-item>
                    <el-menu-item index="/index/goodsName">
                        <i class="el-icon-menu"></i>
                        <span slot="title">商品管理</span>
                    </el-menu-item>
                    <el-menu-item index="/index/serviceName">
                        <i class="el-icon-menu"></i>
                        <span slot="title">服务</span>
                    </el-menu-item>
                    <el-menu-item index="/index/orderManagement">
                        <i class="el-icon-menu"></i>
                        <span slot="title">订单管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="content-container">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {}
</script>

<style scoped>
    .container {
        height: 100%;
        background: #efefef;
    }

    .header {
        background: #fff;
    }

    .aside-menu {
        height: 100%;
    }
<<<<<<< HEAD:src/routes/index.vue
    .content-container{
        background: #fff;
        padding: 0px;
=======

    .content-container {
        background: #fff content-box;
        padding: 0;
>>>>>>> 597f7460db875b7ae832bdcde02ba3ac68429ba0:src/routes/index-store.vue
        margin: 20px;
    }
</style>