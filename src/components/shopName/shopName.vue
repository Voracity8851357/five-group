<template>
<div>
 <el-button type="success" @click="dialogFormVisible = true">增加</el-button>
<el-dialog title="增加门店" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="门店名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="营业执照号码" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    	<el-form-item label="营业执照图片">
						<el-upload
						  class="avatar-uploader">
						  <img  class="avatar">
						  <i  class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
          	<el-form-item label="详细地址" prop="address">
						<el-autocomplete
						  placeholder="请输入地址"
						  style="width: 100%;"
						></el-autocomplete>
						<span>当前城市</span>
					</el-form-item>
     <el-form-item label="法人" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
						<el-input maxLength="11"></el-input>
					</el-form-item>
          <el-form-item label="上传店铺头像">
						<el-upload
						  class="avatar-uploader">
						  <img  class="avatar">
						  <i  class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
          	<el-form-item label="店铺特点" style="white-space: nowrap;">
						<span>品牌保证</span>
						<el-switch></el-switch>
						<span>会员打折</span>
						<el-switch></el-switch>
						<span>新开店铺</span>
						<el-switch></el-switch>
					</el-form-item>

    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
    <el-table
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="shopName"
      label="店名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="shopLicenceNum"
      label="营业执照号码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shopLicenceImg"
      label="营业执照图片"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shopAdd"
      label="营业地点"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shopLocation"
      label="定位"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shopCorporate"
      label="法人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shopTel"
      label="联系电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shopImg"
      label="头图"
      width="120">
    </el-table-column>
     <el-table-column
      prop="shopFeature"
      label="特色"
      width="120">
    </el-table-column>
      <el-table-column
      prop="VIP"
      label="VIP等级"
      width="120">
    </el-table-column>
      <el-table-column
      prop="shopEmployee"
      label="店员属性"
      width="120">
    </el-table-column>
   <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    }
  };
</script>
<style scope>
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
</style>