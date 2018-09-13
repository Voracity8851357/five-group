<template>
    <div>
        <el-table
                :data="rows"
                ref="goodsTable"
                stripe
                @row-click="console"
                v-loading="isLoading"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="goods-table-expand" size="small">
                        <el-form-item label="商品名称:">
                            <el-input v-if="isAllowEdit(props.$index)" v-model="tempGood.goodsName"/>
                            <span v-else>{{ props.row.goodsName }}</span>
                        </el-form-item>
                        <el-form-item label="商品种类:">
                            <el-input v-if="isAllowEdit(props.$index)" v-model="tempGood.goodsType"/>
                            <span v-else>{{ props.row.goodsType }}</span>
                        </el-form-item>
                        <el-form-item label="商品材质:">
                            <el-input v-if="isAllowEdit(props.$index)" v-model="tempGood.goodsMaterial"/>
                            <span v-else>{{ props.row.goodsMaterial }}</span>
                        </el-form-item>
                        <el-form-item label="适用规格:">
                            <el-input v-if="isAllowEdit(props.$index)" v-model="tempGood.goodsCanFor"/>
                            <span v-else>{{ props.row.goodsCanFor }}</span>
                        </el-form-item>
                        <el-form-item label="专属规格:">
                            <el-input v-if="isAllowEdit(props.$index)" v-model="tempGood.goodsOnlyFor"/>
                            <span v-else>{{ props.row.goodsOnlyFor }}</span>
                        </el-form-item>
                        <el-form-item label="包装规格(kg):">
                            <el-input-number v-if="isAllowEdit(props.$index)" controls-position="right"
                                             v-model="tempGood.goodsSize"
                                             :precision="1"
                                             :step="0.1" :min="0" :max="12"/>
                            <span v-else>{{ props.row.goodsSize }}</span>
                        </el-form-item>
                        <el-form-item label="口味:">
                            <el-input v-if="isAllowEdit(props.$index)" v-model="tempGood.goodsTaste"/>
                            <span v-else>{{ props.row.goodsTaste }}</span>
                        </el-form-item>
                        <el-form-item label="特殊功能:">
                            <el-input v-if="isAllowEdit(props.$index)" v-model="tempGood.goodsSpecial"/>
                            <span v-else>{{ props.row.goodsSpecial }}</span>
                        </el-form-item>
                        <el-form-item label="出厂日期:">
                            <span>{{ props.row.goodsDate }}</span>
                        </el-form-item>
                        <el-form-item label="保质期:">
                            <span>{{ props.row.goodsTime }}</span>
                        </el-form-item>
                        <el-form-item label="产地:">
                            <span>{{ props.row.goodsRegion.join(" / ") }}</span>
                        </el-form-item>
                        <el-form-item label="价格(元):">
                            <el-input v-if="isAllowEdit(props.$index)" v-model="tempGood.goodsPrice"/>
                            <span v-else>{{ props.row.goodsPrice }}</span>
                        </el-form-item>
                    </el-form>
                    <el-button-group>
                        <el-button @click="enableEdit(props.$index)">修改</el-button>
                        <el-button>提交</el-button>
                        <el-button @click="disableEdit">取消</el-button>
                    </el-button-group>
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
    </div>
</template>

<script>
    import {createNamespacedHelpers} from "vuex";

    const {mapState, mapActions, mapMutations} = createNamespacedHelpers("goodsManagement");

    import {debounce} from "lodash";

    export default {
        data() {
            return {
                editIndex: -1,
                editable: false,
                isLoading: true,
                tempGood: {},
            }
        },
        computed: {
            ...mapState(["rows", "curpage", "eachpage", "maxpage", "total"]),
        },
        methods: {
            ...mapMutations(["setCurrentPage", "setPageSize"]),
            ...mapActions(["getGoodsAsync"]),
            handleSizeChange(pageSize) {
                this.isLoading = true;
                this.setPageSize(pageSize);
                this.getGoodsAsync(this.loadingCompleted);
            },
            handleCurrentChange: debounce(function (currentPage) {
                this.isLoading = true;
                this.setCurrentPage(currentPage);
                this.getGoodsAsync(this.loadingCompleted);
            }, 300),
            loadingCompleted() {
                this.isLoading = false
            },
            isAllowEdit(index) {
                return this.editIndex === index && this.editable;
            },
            enableEdit(index) {
                const row = this.rows.find((value, rowIndex) => rowIndex === index);
                this.tempGood = JSON.parse(JSON.stringify(row));
                this.$refs.goodsTable.toggleRowExpansion(2, true);
                this.editIndex = index;
                this.editable = true;
            },
            disableEdit() {
                this.tempGood = {};
                this.editIndex = -1;
                this.editable = false;
            },
            console() {
                console.log(arguments);
            }
        },
        watch: {
            // rows(oldRows, newRows) {
            //     oldRows.map(rows => {
            //         this.$set(rows, "edit", false);
            //     });
            //     newRows.map(rows => {
            //         this.$set(rows, "edit", false);
            //     });
            // }
        },
        mounted() {
            this.getGoodsAsync(this.loadingCompleted);
        }
    }
</script>

<style scoped>
    .goods-pagination {
        text-align: center;
    }

    .goods-table-expand {
        font-size: 0;
    }

    .goods-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .goods-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>