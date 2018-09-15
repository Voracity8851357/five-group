<template>
   <div>
        <el-row style="margin-top: 20px;">
  			<el-col>
		        <el-form  label-width="110px" class="demo-formData"  :model="formData" :rules="rules" ref="formData">
					<el-form-item label="店铺名称" prop="shopName">
						<el-input v-model="formData.shopName"></el-input>
					</el-form-item>
							<el-form-item label="营业执照号码" prop="shopLicenceNum"  :model="formData"
						 >
						<el-input v-model="formData.shopLicenceNum"></el-input>
					</el-form-item>
							<el-form-item label="法人" prop="shopCorporate" :model="formData">
						<el-input  v-model="formData.shopCorporate"></el-input>
					</el-form-item>
					<el-form-item label="营业地址" prop="shopAdd" :model="formData">
						<el-input  v-model="formData.shopAdd"></el-input>
					</el-form-item>
          <el-form-item label="定位" prop="shopLocation" :model="formData">
						<el-input  v-model="formData.shopLocation"></el-input>
					</el-form-item>
					<el-form-item label="联系电话" prop="shopTel" :model="formData">
						<el-input maxLength="11" v-model="formData.shopTel"></el-input>
					</el-form-item>
					<el-form-item label="店铺简介" prop="description" :model="formData">
						<el-input v-model="formData.description"></el-input>
					</el-form-item>
				<el-form-item label="店铺特点" style="white-space: nowrap;" prop="shopFeature">
						<el-input v-model="formData.shopFeature"></el-input>
					</el-form-item>
					<el-form-item label="营业时间" style="white-space: nowrap;">
						<el-time-select
						 v-model="formData.startTime"
							placeholder="起始时间"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}"
							>
						</el-time-select>
						<el-time-select
						v-model="formData.endTime"
							placeholder="结束时间"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}"
							minTime: formData.startTime
							>
						</el-time-select>
					</el-form-item>
                   <el-form-item label="上传头图" v-model="formData.shopImg">
			<el-upload
  action="http://localhost:8081//shopManagement/upload"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="shopImg" alt="">
</el-dialog>
                   </el-form-item>
					<el-form-item label="上传营业执照" v-model="formData.shopLicenceImg">
					<el-upload
  action="http://localhost:8081//shopManagement/upload"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="shopLicenceImg" alt="">
</el-dialog>
					</el-form-item>
					<el-form-item class="button_submit">
						<el-button @click="addShop">立即申请</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "applyForShop",
  data() {
    return {
      ctiy: {},
      formData: {
        shopName: "", //店铺名称
        shopAdd: "", //地址
        shopLicenceNum: "",
        description: "", //介绍
        shopTel: "",
        startTime: "",
        endTime: "",
        shopFeature: "",
        shopLicenceImg: '',
        shopImg:'',
        shopLocation:''
      },
     shopLicenceImg: '',
     shopImg:'',
    dialogVisible: false,
      restaurants: [],
      rules: {
        name: [{ required: true, message: "请输入店铺名称", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入联系电话" },
          { type: "number", message: "电话号码必须是数字" }
        ]
      }
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    ...mapActions("applyForShop", ["getAddShop"]),
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    addShop: function() {
      this.getAddShop({
        shopName: this.formData.shopName,
        shopAdd: this.formData.shopAdd, //地址
        shopLicenceNum: this.formData.shopLicenceNum,
        description: this.formData.delivery_mode, //介绍
        shopTel: this.formData.shopTel,
        startTime: this.formData.startTime,
        endTime: this.formData.endTime,
        shopFeature: this.formData.shopFeature,
        shopLicenceImg:this.shopLicenceImg.src,
        shopImg:this.shopImg.src,
        shopLocation:this.formData.shopLocation
      });
    }, 
  
  }
};
</script>
<style scope>
.button_submit {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-table .info-row {
  background: #c9e5f5;
}
.el-table .positive-row {
  background: #e2f0e4;
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>