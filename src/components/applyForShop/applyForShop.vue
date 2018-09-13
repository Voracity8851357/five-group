<template>
   <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form  label-width="110px" class="demo-formData">
					<el-form-item label="店铺名称" prop="shopName">
						<el-input></el-input>
					</el-form-item>
							<el-form-item label="营业执照号码" prop="shopLicenceNum">
						<el-input></el-input>
					</el-form-item>
							<el-form-item label="法人" prop="shopCorporate">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="详细地址" prop="shopAdd">
						<el-autocomplete
						  placeholder="请输入地址"
						  style="width: 100%;"
						></el-autocomplete>
						<span>当前城市</span>
					</el-form-item>
					<el-form-item label="联系电话" prop="shopTel">
						<el-input maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="店铺简介" prop="description">
						<el-input></el-input>
					</el-form-item>
				<el-form-item label="店铺特点" style="white-space: nowrap;">
						<span>品牌保证</span>
						<el-switch></el-switch>
						<span>会员打折</span>
						<el-switch></el-switch>
						<span>新开店铺</span>
						<el-switch></el-switch>
					</el-form-item>
					<el-form-item label="营业时间" style="white-space: nowrap;">
						<el-time-select
							placeholder="起始时间"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}">
						</el-time-select>
						<el-time-select
							placeholder="结束时间"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							}">
						</el-time-select>
					</el-form-item>

					<el-form-item label="上传店铺头像">
						<el-upload
						  class="avatar-uploader"
						  >
						  <img  class="avatar">
						  <i  class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="上传营业执照">
						<el-upload
						  class="avatar-uploader">
						  <img  class="avatar">
						  <i  class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="优惠活动">
						<el-select>
						    <el-option
						      	>
						    </el-option>
						</el-select>
					</el-form-item>
					<el-table
					    style="min-width: 600px;margin-bottom: 20px;"
						align="cneter"
					    >
					    <el-table-column
					      prop="icon_name"
					      label="活动标题"
					      align="cneter"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="name"
					      label="活动名称"
					      align="cneter"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="description"
					      align="cneter"
					      label="活动详情">
					    </el-table-column>
					    <el-table-column
					    	label="操作"
					    	width="120">
					    <template slot-scope="scope">
					        <el-button
					          size="small"
					          type="danger"
					         >删除</el-button>
					    </template>
					    </el-table-column>
					</el-table>
					<el-form-item class="button_submit">
						<el-button type="primary">立即创建</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
import {mapState} from "vuex";
	 export default {
    	 methods: {
     ...mapState("applyForShop",["city", "formData", "rules", "options"])
  }
    }
</script>
<style scope>
	.button_submit{
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
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}
	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>