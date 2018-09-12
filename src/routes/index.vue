<template>
    <el-container class="container">
        <el-header class="header">Header</el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu class="aside-menu" router>
                    <el-menu-item index="/index/userAccount">
                        <i class="el-icon-menu"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/index/shopName">
                        <i class="el-icon-menu"></i>
                        <span slot="title">门店管理</span>
                    </el-menu-item>
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
                    <el-menu-item index="/index/petOwners">
                        <i class="el-icon-menu"></i>
                        <span slot="title">宠主管理</span>
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
    .header{
        background: #fff;
    }
    .aside-menu {
        height: 100%;
    }
    .content-container{
        background: #fff content-box;
    }
</style>