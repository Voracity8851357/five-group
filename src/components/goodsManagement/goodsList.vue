<template>
    <el-table
            :data="rows"
            style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline>
                    <el-form-item label="商品名称">
                        <span>{{ props.row.goodsName }}</span>
                    </el-form-item>
                    <el-form-item label="商品种类">
                        <span>{{ props.row.goodsType }}</span>
                    </el-form-item>
                    <el-form-item label="商品材质">
                        <span>{{ props.row.goodsMaterial }}</span>
                    </el-form-item>
                    <el-form-item label="适用规格">
                        <span>{{ props.row.goodsCanFor }}</span>
                    </el-form-item>
                    <el-form-item label="专属规格">
                        <span>{{ props.row.goodsOnlyFor }}</span>
                    </el-form-item>
                    <el-form-item label="包装规格(kg)">
                        <span>{{ props.row.goodsSize }}</span>
                    </el-form-item>
                    <el-form-item label="口味">
                        <span>{{ props.row.goodsTaste }}</span>
                    </el-form-item>
                    <el-form-item label="特殊功能">
                        <span>{{ props.row.goodsSpecial }}</span>
                    </el-form-item>
                    <el-form-item label="出厂日期">
                        <span>{{ props.row.goodsDate }}</span>
                    </el-form-item>
                    <el-form-item label="保质期">
                        <span>{{ props.row.goodsTime }}</span>
                    </el-form-item>
                    <el-form-item label="产地">
                        <span>{{ props.row.goodsRegion }}</span>
                    </el-form-item>
                    <el-form-item label="价格(元)">
                        <span>{{ props.row.goodsPrice }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
                label="商品名称"
                prop="goodsName">
        </el-table-column>
        <el-table-column
                label="商品种类"
                prop="goodsType">
        </el-table-column>
        <el-table-column
                label="价格(元)"
                prop="goodsPrice">
        </el-table-column>
    </el-table>
</template>

<script>
    import {mapState, mapActions} from "vuex";

    export default {
        computed: {
            ...mapState("goodsManagement", ["rows"]),
        },
        methods: {
            ...mapActions("goodsManagement", ["getGoods"]),
        },
        mounted() {
            this.getGoods();
        }
    }
</script>

<style scoped>

</style>