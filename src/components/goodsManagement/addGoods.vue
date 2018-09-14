<template>
    <div>
        <el-button type="primary" icon="el-icon-plus" @click="handleDialogOpen">新增商品</el-button>
        <el-dialog
                :visible.sync="dialogVisible"
                title="新增商品"
                :show-close="false"
                width="800px"
                custom-class="add-dialog">
            <el-form label-width="110px" :model="good" ref="goodAddForm" :rules="rules" size="small">
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="商品名称:" prop="goodsName">
                            <el-input v-model="good.goodsName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品种类:" prop="goodsType">
                            <el-input v-model="good.goodsType"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="商品材质:">
                            <el-input v-model="good.goodsMaterial"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="适用规格:" prop="goodsCanFor">
                            <el-input v-model="good.goodsCanFor"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="专属规格:">
                            <el-input v-model="good.goodsOnlyFor"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="包装规格(kg):" prop="goodsSize">
                            <el-input-number class="size-input" controls-position="right" v-model="good.goodsSize"
                                             :precision="1"
                                             :step="0.1" :min="0" :max="12"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="口味:">
                            <el-input v-model="good.goodsTaste"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="特殊功能:">
                            <el-input v-model="good.goodsSpecial"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="出厂日期:" prop="goodsDate">
                            <el-date-picker
                                    v-model="good.goodsDate"
                                    type="date"
                                    :clearable="false"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="保质期:" prop="goodsTime">
                            <el-date-picker
                                    v-model="good.goodsTime"
                                    type="date"
                                    :clearable="false"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="产地:" prop="goodsRegion">
                            <el-cascader
                                    :options="location"
                                    @active-item-change="handleItemChange"
                                    :props="props"
                                    v-model="good.goodsRegion">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="价格(元):" prop="goodsPrice">
                            <el-input v-model="good.goodsPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="特色说明:">
                            <el-tag
                                    :key="index"
                                    v-for="(tag,index) in good.goodsIntro"
                                    closable
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
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品图片:" prop="goodsImg">
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
                    </el-col>
                </el-row>
            </el-form>
            <el-row type="flex" justify="center">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="handleDialogClose">取消</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import moment from "moment";
    import {mapActions} from "vuex"
    import getLocation from "./utils/getLocation";

    export default {
        data() {
            return {
                //弹出框条件
                dialogVisible: false,
                //城市级联数组
                location: [],
                //级联数组匹配项
                props: {
                    value: 'index',
                    children: 'cities',
                    label: "label",
                },
                //特色tag标签
                tagInputVisible: false,
                tagInputValue: '',
                //新增商品数据
                good: {
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
                //验证规则
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
                    goodsDate: [
                        {
                            required: true,
                            validator: (rule, value, callback) => {
                                if (!value) {
                                    return callback(new Error("请选择出厂日期"));
                                }
                                const now = moment().format("YYYY-MM-DD");
                                const isBefore = moment(value).isBefore(now) || moment(value).isSame(now);
                                if (!isBefore) {
                                    return callback(new Error("出厂日期不能在当前时间之后"));
                                }
                                callback();
                                this.$refs.goodAddForm.validateField("goodsTime");
                            },
                            trigger: 'change',
                        },
                    ],
                    goodsTime: [
                        {
                            required: true,
                            validator: (rule, value, callback) => {
                                if (!value) {
                                    return callback(new Error("请选择保质期"));
                                }
                                const goodsData = this.good.goodsDate;
                                if (!goodsData) {
                                    return callback(new Error("请先选择出厂日期"));
                                }
                                const isBefore = moment(value).isAfter(goodsData);
                                if (!isBefore) {
                                    return callback(new Error("保质期不能在出厂时间之前"));
                                }
                                callback();
                            },
                            trigger: 'change',
                        },
                    ],
                    goodsRegion: [
                        {
                            required: true,
                            validator: (rule, value, callback) => {
                                if (value.length === 0) {
                                    return callback(new Error("请选择产地"))
                                }
                                callback();
                            },
                            trigger: 'change',
                        },
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
        async created() {
            //获取一级城市级联信息
            this.location = await
                getLocation();
        },
        methods: {
            ...mapActions("goodsManagement", ["addGoods"]),
            handleDialogOpen() {
                this.dialogVisible = true;
            },
            handleDialogClose() {
                this.dialogVisible = false;
                this.$refs.goodAddForm.resetFields();
            },
            async handleItemChange(val) {
                if (val.length === 1) {
                    const city = this.location[val[0]].label;
                    this.location[val[0]].cities = await
                        getLocation({
                            keywords: city,
                        });
                } else if (val.length === 2) {
                    const city = this.location[val[0]].cities[val[1]].label;
                    this.location[val[0]].cities[val[1]].cities = await
                        getLocation({
                            keywords: city,
                            getCities: false,
                        });
                }
            },
            //tag标签控制
            handleTagClose(tag) {
                this.good.goodsIntro.splice(this.good.goodsIntro.indexOf(tag), 1);
            },

            showTagInput() {
                this.tagInputVisible = true;
                this.$nextTick(() => this.$refs.saveTagInput.$refs.input.focus());
            },

            handleTagInputConfirm() {
                const inputValue = this.tagInputValue;
                if (inputValue && !this.good.goodsIntro.includes(inputValue)) {
                    this.good.goodsIntro.push(inputValue);
                }
                this.tagInputVisible = false;
                this.tagInputValue = '';
            },
            //图片上传钩子
            onClickUpload() {
                this.$refs.pictureUpload.submit();
            },

            onUploadSuccess(response) {
                this.good.goodsImg.push(...response.path);
                this.$refs.goodAddForm.validateField("goodsImg");
            },

            onSubmit() {
                this.$refs.goodAddForm.validate(state => {
                    if (!state) {
                        const location = [
                            this.location[this.good.goodsRegion[0]].label,
                            this.location[this.good.goodsRegion[0]].cities[this.good.goodsRegion[1]].label,
                            this.location[this.good.goodsRegion[0]].cities[this.good.goodsRegion[1]].cities[this.good.goodsRegion[2]].label,
                        ];

                        this.addGoods({...this.good, goodsRegion: location});
                    }
                });
            },
        },
    }
</script>

<style>
    .add-dialog {
        border-radius: 8px !important;
        overflow: hidden;
    }

    .add-dialog > .el-dialog__header {
        background: #eee;
    }

    .add-dialog > .el-dialog__body {
    }

    .add-dialog .el-tag {
        margin-right: 12px;
        margin-bottom: 8px;
    }

    .add-dialog .button-new-tag {
        height: 32px;
    }

    .add-dialog input {
        width: 200px;
    }

    .size-input input {
        width: inherit;
    }

    .add-dialog .input-new-tag {
        display: inline-block;
        width: 78px;
    }

    .add-dialog .input-new-tag input {
        width: inherit;
    }

    .add-dialog .el-form > div {
        margin-bottom: 4px;
    }

    .add-dialog .upload-goods-picture {
    }
</style>