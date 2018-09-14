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
                    <el-form
                            label-width="110px"
                            inline
                            class="goods-table-expand"
                            size="small"
                            key="inputForm"
                            :rules="rules"
                            :model="tempGood"
                            v-if="isAllowEdit(props.$index)">
                        <el-form-item label="商品名称:" prop="goodsName">
                            <el-input v-model="tempGood.goodsName"/>
                        </el-form-item>
                        <el-form-item label="商品种类:" prop="goodsType">
                            <el-input v-model="tempGood.goodsType"/>
                        </el-form-item>
                        <el-form-item label="商品材质:">
                            <el-input v-model="tempGood.goodsMaterial"/>
                        </el-form-item>
                        <el-form-item label="适用规格:" prop="goodsCanFor">
                            <el-input v-model="tempGood.goodsCanFor"/>
                        </el-form-item>
                        <el-form-item label="专属规格:">
                            <el-input v-model="tempGood.goodsOnlyFor"/>
                        </el-form-item>
                        <el-form-item label="包装规格(kg):" prop="goodsSize">
                            <el-input-number controls-position="right"
                                             v-model="tempGood.goodsSize"
                                             :precision="1"
                                             :step="0.1" :min="0" :max="12"/>
                        </el-form-item>
                        <el-form-item label="口味:">
                            <el-input v-model="tempGood.goodsTaste"/>
                        </el-form-item>
                        <el-form-item label="特殊功能:">
                            <el-input v-model="tempGood.goodsSpecial"/>
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
                        <el-form-item label="价格(元):" prop="goodsPrice">
                            <el-input v-model="tempGood.goodsPrice"/>
                        </el-form-item>
                    </el-form>
                    <el-form
                            label-width="110px"
                            inline
                            key="showForm"
                            class="goods-table-expand"
                            size="small"
                            v-else>
                        <el-form-item label="商品名称:">
                            <span>{{ props.row.goodsName }}</span>
                        </el-form-item>
                        <el-form-item label="商品种类:">
                            <span>{{ props.row.goodsType }}</span>
                        </el-form-item>
                        <el-form-item label="商品材质:">
                            <span>{{ props.row.goodsMaterial }}</span>
                        </el-form-item>
                        <el-form-item label="适用规格:">
                            <span>{{ props.row.goodsCanFor }}</span>
                        </el-form-item>
                        <el-form-item label="专属规格:">
                            <span>{{ props.row.goodsOnlyFor }}</span>
                        </el-form-item>
                        <el-form-item label="包装规格(kg):">
                            <span>{{ props.row.goodsSize }}</span>
                        </el-form-item>
                        <el-form-item label="口味:">
                            <span>{{ props.row.goodsTaste }}</span>
                        </el-form-item>
                        <el-form-item label="特殊功能:">
                            <span>{{ props.row.goodsSpecial }}</span>
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
                            <span>{{ props.row.goodsPrice }}</span>
                        </el-form-item>
                    </el-form>
                    <el-button-group>
                        <el-button @click="enableEdit(props.$index)">修改</el-button>
                        <el-button @click="onSubmit">提交</el-button>
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
                tempGood: {
                    goodsName: "",
                    goodsType: "",
                    goodsMaterial: "",
                    goodsCanFor: "",
                    goodsOnlyFor: "",
                    goodsSize: 0,
                    goodsTaste: "",
                    goodsSpecial: "",
                    goodsRegion: [],
                    goodsDate: "",
                    goodsTime: "",
                    goodsIntro: [],
                    goodsPrice: "",
                    goodsImg: [],
                },
                rules: {
                    goodsName: [
                        {required: true, message: '请输入商品', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 10 个字符', trigger: 'blur'},
                    ],
                    goodsType: [
                        {required: true, message: '请输入种类', trigger: 'blur'},
                    ],
                    goodsCanFor: [
                        {required: true, message: '请输入规格', trigger: 'blur'},
                    ],
                    goodsSize: [
                        {required: true, message: '请输入规格', trigger: 'blur'},
                        {type: 'number', min: 0.1, message: '规格不能为 0',},
                    ],
                    goodsPrice: [
                        {
                            required: true,
                            validator: (rule, value, callback) => {
                                if (value.match(/\s/g)) {
                                    return callback(new Error('格式不正确'));
                                }
                                if (+value < 0) {
                                    return callback(new Error('请输入正确的价格'));
                                }
                                else if (+value === 0) {
                                    if (value === "")
                                        return callback(new Error('价格不能为空'));
                                    else
                                        return callback(new Error('价格不能为 0'));
                                }
                                callback();
                            },
                            trigger: 'blur',
                        },
                    ],
                    goodsImg: [
                        {
                            required: true,
                            validator: (rule, value, callback) => {
                                if (value.length === 0) {
                                    return callback(new Error("请上传商品图片"))
                                }
                                callback();
                            },
                            trigger: 'change',
                        },
                    ],
                },

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
                Object.assign(this.tempGood, JSON.parse(JSON.stringify(row)));
                this.$refs.goodsTable.toggleRowExpansion(2, true);
                this.editIndex = index;
                this.editable = true;
            },
            disableEdit() {
                this.tempGood = {};
                this.editIndex = -1;
                this.editable = false;
            },
            onSubmit() {
                console.log(this.tempGood);
            },
            console() {
                console.log(arguments);
            }
        },
        mounted() {
            this.getGoodsAsync(this.loadingCompleted);
        }
    }
</script>

<style>
    .goods-pagination {
        text-align: center;
    }

    .goods-table-expand {
        font-size: 0;
    }

    .goods-table-expand .el-form-item__label {
        width: 90px;
        color: #99a9bf;
    }

    .goods-table-expand .el-form-item {
        margin-right: 0 !important;
        width: 50%;
    }
</style>