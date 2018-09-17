<template>
    <div>
        <el-button type="primary" icon="el-icon-plus" @click="handleDialogOpen">新增商品</el-button>
        <el-dialog
                :visible.sync="dialogVisible"
                title="新增商品"
                :show-close="false"
                width="550px"
                custom-class="add-dialog">
        <el-card class="box-card" style="width: 500px; text-align: center">
            <el-form label-width="100px">
                <el-form-item label="电话号码：">
                    <el-input style="width: 300px" v-model="obj.memberPhone"></el-input>
                </el-form-item>
                <el-form-item label="昵名：">
                    <el-input style="width: 300px" v-model="obj.memberAcount"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名：">
                    <el-input style="width: 300px" v-model="obj.memberName"></el-input>
                </el-form-item>
                <el-form-item label="会员卡：">
                    <el-input style="width: 300px" v-model="obj.memberCard"></el-input>
                </el-form-item>
                <el-form-item label="商品图片：" prop="memberImg">
                    <el-upload
                            ref="pictureUpload"
                            class="upload-goods-picture"
                            action="http://localhost:8081/uploadPictures"
                            :auto-upload="false"
                            :multiple="true"
                            :on-success="onUploadSuccess">
                        <el-button style="margin-right: 10px;" slot="trigger" size="small" type="primary">
                            选择<i class="el-icon-document el-icon--right"></i>
                        </el-button>
                        <el-button size="small" type="success" @click="onClickUpload">
                            上传<i class="el-icon-upload el-icon--right"></i>
                        </el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="送货地址：">
                    <el-input style="width: 300px" v-model="obj.memberAdd"></el-input>
                </el-form-item>
                <el-form-item label="区域：">
                    <el-input style="width: 300px" v-model="obj.memberArea"></el-input>
                </el-form-item>
                <el-form-item label="积分：">
                    <el-input style="width: 300px" v-model="obj.memberPoint"></el-input>
                </el-form-item>
                <el-form-item label="宠物昵名：">
                    <el-input style="width: 300px" v-model="obj.pet[0].namepet"></el-input>
                </el-form-item>
                <el-form-item label="宠物品类：">
                    <el-select v-model="obj.pet[0].value8" filterable placeholder="请选择" style="width: 300px">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="宠物种类：">
                    <el-select v-model="obj.pet[0].value9" filterable placeholder="请选择" style="width: 300px">
                        <el-option

                                v-for="item in options5"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="宠物颜色：">
                    <el-input style="width: 300px" v-model="obj.pet[0].color"></el-input>
                </el-form-item>
                <el-form-item label="出生日期：">
                    <div class="block" >
                        <el-date-picker
                                style="width: 300px"
                                v-model="obj.pet[0].value11"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="性格：">
                    <el-input style="width: 300px" v-model="obj.pet[0].ter"></el-input>
                </el-form-item>
                <el-button type="primary" @click="login">提交</el-button>
            </el-form>
        </el-card>
        </el-dialog>

        <Petg/>
    </div>
</template>

<script>
    import {mapActions, mapState, mapMutations} from "vuex";

    export default {
        name: "petpwners",
        created() {
            // this.GetEmpByPage();
            this.asyncGetEmpByPage();
        },

        data() {
            return {
                //弹出框条件
                dialogVisible: false,
                options: [{
                    value: '猫',
                    label: '猫'
                }, {
                    value: '狗',
                    label: '狗'
                }, {
                    value: '兔',
                    label: '兔'
                }, {
                    vaue: '乌龟',
                    label: '乌龟'
                }, {
                    value: '猪',
                    label: '猪'
                }],
                options5: [{
                    value: '泰迪',
                    label: '泰迪'
                }, {
                    value: '比熊',
                    label: '比熊'
                }, {
                    value: '波斯猫',
                    label: '波斯猫'
                }, {
                    vaue: '鸟',
                    label: '鸟'
                }, {
                    value: '丘比特',
                    label: '丘比特'
                }],
                fileList2: [],
                checkAll: false,
                isIndeterminate: true,
                checkedCities: [],
                img: [],
                obj: {
                    memberPhone: '',
                    memberAcount: '',
                    memberName: '',
                    memberCard: '',
                    memberImg: [],
                    memberAdd: '',
                    memberArea: '',
                    memberPoint: '',
                    pet: [{
                        namepet: "",
                        value8: '',
                        value9: '',
                        color: '',
                        value11: '',
                        ter: '',
                    }],

                }
            }
        },
        methods: {
            handleDialogOpen() {
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            ...mapActions('store', ["PostEmpByPage", "GetEmpByPage",'asyncGetEmpByPage','deleve']),
            login: function () {
                this.PostEmpByPage(this.obj);
                this.dialogVisible = false;
                console.log(this.obj);
            },
            onClickUpload() {
                this.$refs.pictureUpload.submit();
            },
            onUploadSuccess(response, file, fileList) {
                this.obj.memberImg.push(...response.path);
            },
        },

    }
</script>

<style scoped>

</style>