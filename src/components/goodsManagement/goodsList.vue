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
                            ref="goodEidtForm"
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
                        <el-form-item class="goods-tags" label="商品特色:">
                            <el-tag
                                    :key="index"
                                    v-for="(tag,index) in tempGood.goodsIntro"
                                    closable
                                    :disable-transitions="true"
                                    @close="handleTagClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input
                                    class="input-new-tag"
                                    v-if="tagInputVisible"
                                    v-model="tagInputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleTagInputConfirm"
                                    @blur="handleTagInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ 新特色
                            </el-button>
                        </el-form-item>
                        <el-form-item class="goods-img-container" label="商品图片:" prop="goodsImg">
                            <div style="white-space: initial;">
                                <div class="goods-img-item" v-for="item of tempGood.goodsImg">
                                    <img class="goods-img" width="100px" :src="item">
                                    <i class="el-icon-circle-close goods-img-delete"
                                       @click="onClickImgDelete(item)"></i>
                                </div>
                            </div>
                            <el-upload
                                    ref="pictureUpload"
                                    class="upload-goods-picture"
                                    action="http://localhost:8081/goodsManagement/uploadPictures"
                                    :auto-upload="false"
                                    :multiple="true"
                                    :on-success="onUploadSuccess">
                                <el-button style="margin-right: 10px;" slot="trigger" size="small" type="primary">
                                    浏览<i class="el-icon-document el-icon--right"></i>
                                </el-button>
                                <el-button size="small" type="success" @click="onClickUpload">
                                    上传<i class="el-icon-upload el-icon--right"></i>
                                </el-button>
                            </el-upload>
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
                        <el-form-item class="goods-tags" label="商品特色:">
                            <el-tag
                                    :key="index"
                                    :disable-transitions="true"
                                    v-for="(tag,index) in props.row.goodsIntro">
                                {{tag}}
                            </el-tag>
                        </el-form-item>
                        <el-form-item class="goods-img-container" label="商品图片:">
                            <img class="goods-img" width="100px" v-for="item of props.row.goodsImg" :src="item"/>
                        </el-form-item>
                    </el-form>
                    <el-button-group>
                        <el-button @click="enableEdit(props.$index)">修改</el-button>
                        <el-button v-show="editable" :loading="submitLoading" @click="onSubmit">提交</el-button>
                        <el-button v-show="editable" @click="disableEdit">取消</el-button>
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
                //修改
                editIndex: -1,
                editable: false,
                //是否载入
                isLoading: true,
                submitLoading: false,
                //tag标签控制
                tagInputVisible: false,
                tagInputValue: '',
                //修改时临时对象
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
                //修改验证规则
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
                        },
                    ],
                },
            }
        },
        computed: {
            //商品列表state属性
            ...mapState(["rows", "curpage", "eachpage", "maxpage", "total"]),
        },
        methods: {
            //设置页数，设置每页显示
            ...mapMutations(["setCurrentPage", "setPageSize"]),
            ...mapActions(["getGoodsAsync", "updateGoodsAsync"]),
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
            //修改载入状态
            loadingCompleted() {
                this.isLoading = false
            },
            //是否允许修改
            isAllowEdit(index) {
                return this.editIndex === index && this.editable;
            },
            // 开启修改
            enableEdit(index) {
                const row = this.rows.find((value, rowIndex) => rowIndex === index);
                Object.assign(this.tempGood, JSON.parse(JSON.stringify(row)));
                // this.$refs.goodsTable.toggleRowExpansion(row, true);
                this.editIndex = index;
                this.editable = true;
            },
            //关闭修改
            disableEdit() {
                this.editIndex = -1;
                this.editable = false;
            },
            //tag标签关闭
            handleTagClose(tag) {
                this.tempGood.goodsIntro.splice(this.tempGood.goodsIntro.indexOf(tag), 1);
            },
            //显示tag标签新增输入框
            showTagInput() {
                this.tagInputVisible = true;
                this.$nextTick(() => this.$refs.saveTagInput.$refs.input.focus());
            },
            //输入框增加新tag
            handleTagInputConfirm() {
                const inputValue = this.tagInputValue;
                if (inputValue && !this.tempGood.goodsIntro.includes(inputValue)) {
                    this.tempGood.goodsIntro.push(inputValue);
                }
                this.tagInputVisible = false;
                this.tagInputValue = '';
            },
            //删除图片
            onClickImgDelete(path) {
                const index = this.tempGood.goodsImg.findIndex(value => value === path);
                this.tempGood.goodsImg.splice(index, 1);
                this.$refs.goodEidtForm.validateField("goodsImg");
            },
            //图片上传钩子
            onClickUpload() {
                this.$refs.pictureUpload.submit();
            },

            onUploadSuccess(response) {
                this.tempGood.goodsImg.push(...response.path);
                this.$refs.goodEidtForm.validateField("goodsImg");
            },
            // 修改提交
            async onSubmit() {
                this.submitLoading = true;
                await this.updateGoodsAsync(this.tempGood);
                this.submitLoading = false;
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
        height: 34px;
        width: 50%;
    }

    .goods-table-expand .input-new-tag {
        display: inline-block;
        width: 78px;
    }

    .goods-table-expand .input-new-tag input {
        width: inherit;
    }

    .goods-table-expand .el-tag {
        margin-right: 12px;
        margin-bottom: 8px;
    }

    .goods-table-expand .goods-tags {
        display: block !important;
        white-space: nowrap;
        height: initial;
        width: 100% !important;
        user-select: none;
    }

    .goods-table-expand .goods-img-container {
        display: block !important;
        white-space: nowrap;
        height: initial;
        width: 100% !important;
        user-select: none;
    }

    .goods-table-expand .goods-img-item {
        position: relative;
    }

    .goods-table-expand .goods-img-delete {
        position: absolute;
        top: 5px;
        left: 100px;
        color: #e00;
        font-size: 20px;
        transition: transform .2s;
    }

    .goods-table-expand .goods-img-delete:hover {
        transform: scale(1.3);
    }

    .goods-table-expand .goods-img-container .el-form-item__content div {
        display: inline-block;
    }

    .goods-table-expand .goods-img {
        border: 1px solid #eee;
        margin-right: 10px;
        padding: 10px;
    }

    .goods-table-expand .goods-img .el-form-item__content {
        width: calc(100% - 120px);
        white-space: initial;
    }

    .goods-table-expand .upload-goods-picture {
        display: block !important;
    }

    @media screen and (max-width: 1100px) {
        .goods-table-expand .el-form-item {
            width: 100% !important;
            min-width: 500px;
        }
    }
</style>