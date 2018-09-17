<template>
    <el-pagination
            class="goods-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="curpage"
            :page-sizes="[10, 20, 30]"
            :page-size="eachpage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
    </el-pagination>
</template>

<script>
    import {createNamespacedHelpers} from "vuex";

    const {mapState, mapMutations, mapActions} = createNamespacedHelpers("goodsManagement");

    import {debounce} from "lodash";

    export default {
        computed: {
            //商品列表state属性
            ...mapState(["curpage", "eachpage", "total"]),
        },
        methods: {
            ...mapMutations(["setCurrentPage", "setPageSize"]),
            ...mapActions(["getGoodsAsync"]),
            //每页显示数变化
            handleSizeChange(pageSize) {
                this.setPageSize(pageSize);
                if (Math.ceil(this.total / pageSize) < this.curpage) return;
                this.getGoodsAsync();
            },
            //页数变化
            handleCurrentChange: debounce(function (currentPage) {
                this.setCurrentPage(currentPage);
                this.getGoodsAsync();
            }, 300),
        },
    }
</script>

<style scoped>
    .goods-pagination {
        text-align: center;
        padding: 30px;
    }
</style>