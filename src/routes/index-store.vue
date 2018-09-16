<template>
    <el-container class="container">
        <el-header class="header">
            <button @click="collapseStatus" class="collapse-btn">
                <i class="el-icon-d-arrow-right" :class="collapseBtnIcon"></i>
            </button>
            后台管理
        </el-header>
        <el-container>
            <el-aside width="auto">
                <el-menu
                        :default-active="$route.path"
                        :collapse="isCollapse"
                        class="aside-menu"
                        background-color="#252a2f"
                        text-color="#fff"
                        active-text-color="#409EFF"
                        router>
                    <el-menu-item index="/indexStore/applyForShop">
                        <i class="el-icon-menu"></i>
                        <span slot="title">门店申请</span>
                    </el-menu-item>
                    <el-menu-item index="/indexStore/goodsName">
                        <i class="el-icon-menu"></i>
                        <span slot="title">商品管理</span>
                    </el-menu-item>
                    <el-menu-item index="/indexStore/serviceManage">
                        <i class="el-icon-menu"></i>
                        <span slot="title">服务管理</span>
                    </el-menu-item>
                    <el-menu-item index="/indexStore/orderManagement">
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
            }
        },
        mounted() {
            const aside = document.querySelector(".el-aside");
            aside.addEventListener("mouseenter", () => {
                if (this.collapseBtnClick) return;
                this.isCollapse = false;
            });
            aside.addEventListener("mouseleave", () => {
                if (this.collapseBtnClick) return;
                this.isCollapse = true;
            });
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