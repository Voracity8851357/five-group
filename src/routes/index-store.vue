<template>
    <el-container class="container">
        <el-header class="header">
            <button @click="collapseStatus" class="collapse-btn">
                <i class="el-icon-d-arrow-right" :class="collapseBtnIcon"></i>
            </button>
            后台管理
        </el-header>
        <el-container>
            <el-aside
                    width="auto"
                    @mouseenter.native="collapseOpen"
                    @mouseleave.native="collapseClose">
                <el-menu
                        :default-active="$route.path"
                        :collapse="isCollapse"
                        class="aside-menu"
                        background-color="#252a2f"
                        text-color="#fff"
                        active-text-color="#409EFF"
                        router>
                    <template v-if="userType">
                        <el-menu-item index="/index/userAccount">
                            <i class="el-icon-menu"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="/index/shopName">
                            <i class="el-icon-menu"></i>
                            <span slot="title">门店管理</span>
                        </el-menu-item>
                        <el-menu-item index="/index/petOwners">
                            <i class="el-icon-menu"></i>
                            <span slot="title">宠主管理</span>
                        </el-menu-item>
                    </template>
                    <el-menu-item index="/index/applyForShop">
                        <i class="el-icon-menu"></i>
                        <span slot="title">门店申请</span>
                    </el-menu-item>
                    <el-menu-item index="/index/goodsName">
                        <i class="el-icon-menu"></i>
                        <span slot="title">商品管理</span>
                    </el-menu-item>
                    <el-menu-item index="/index/serviceManage">
                        <i class="el-icon-menu"></i>
                        <span slot="title">服务管理</span>
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
    export default {
        data() {
            return {
                collapseBtnClick: false,
                isCollapse: true,
                collapseBtnIcon: "el-icon-arrow-right",
                userType: "1",
            }
        },
        watch: {
            isCollapse(oldValue, newValue) {
                this.collapseBtnIcon = newValue && "collapse-open";
            }
        },
        methods: {
            collapseStatus() {
                this.collapseBtnClick = this.isCollapse;
                this.isCollapse = !this.isCollapse;
            },
            collapseOpen() {
                if (this.collapseBtnClick) return;
                this.isCollapse = false;
            },
            collapseClose() {
                if (this.collapseBtnClick) return;
                this.isCollapse = true;
            }
        },
        beforeMount() {
            this.userType = this.$store.state.app.userType;
        }
    };
</script>

<style scoped>
    .container {
        height: 100%;
        background: #efefef;
    }

    .header {
        height: 50px !important;
        background: #252a2f;
        color: #ffffff;
        padding-left: 0;
        display: flex;
        align-items: center;
    }

    .aside-menu {
        height: 100%;
        box-sizing: border-box;
        border-top: 1px solid hsla(0, 0%, 100%, .1);
        padding-top: 20px;
        left: 0;
    }

    .aside-menu:not(.el-menu--collapse) {
        width: 200px;
    }

    .content-container {
        background: #fff content-box;
        padding: 0;
        margin: 20px;
        box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 2px;
    }

    .el-menu-item:hover {
        color: #409EFF !important;
    }

    .collapse-btn {
        height: 50px;
        width: 64px;
        background: transparent;
        color: #ffffff;
        border: none;
        outline: none;
        font-size: 20px;
    }

    .collapse-btn i {
        transition: all .5s;
    }

    .collapse-open {
        transform: rotate(.5turn);
    }

    .collapse-btn:hover {
        background: rgb(30, 34, 38);
        color: #409eff;
    }
</style>