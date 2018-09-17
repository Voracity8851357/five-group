<template>
   <el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 20px">
        <el-tab-pane label="门店管理" name="first">
  <!-- 增加按钮 -->
 <el-button type="success" @click="addFormVisible = true" style=" margin-left: 20px;margin-top: 10px;">增加</el-button>
   <el-button style="margin-top: 10px;" type="primary" @click="()=>{
                searchText=encodeURI(this.search);
                asyncGetShopByPage({
                searchType:this.select,
                searchText,
              })
            }" icon="el-icon-search">搜索</el-button>
    <el-input placeholder="请输入内容" v-model="search" style="width:500px">
    <el-select v-model="select" style='width:110px' slot="prepend" placeholder="请选择">
      <el-option label="门店名称" value="shopName"></el-option>
      <el-option label="门店地点" value="shopAdd"></el-option>
      <el-option label="特色" value="shopFeature"></el-option>
    </el-select>
  </el-input>
 <!-- 增加弹窗 -->
<el-dialog title="增加门店" :visible.sync="addFormVisible">
  <el-form :model="form" label-width="110px" class="demo-formData" ref="shopAddForm">
    <el-form-item label="门店名称" :label-width="formLabelWidth">
      <el-input v-model="form.shopName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="营业执照号码" :label-width="formLabelWidth">
      <el-input v-model="form.shopLicenceNum" auto-complete="off"></el-input>
    </el-form-item>
    	<el-form-item label="营业执照图片">
						<el-upload
            :limit=1
  action="/shopManagement/upload"
  list-type="picture-card"
  :on-success="handlePictureLicenceSuccess"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
					</el-form-item>
           <el-form-item label="营业地址" :label-width="formLabelWidth">
      <el-input v-model="form.shopAdd" auto-complete="off"></el-input>
    </el-form-item>
          <el-form-item label="定位" :label-width="formLabelWidth">
      <el-input v-model="form.shopLocation" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="法人" :label-width="formLabelWidth">
      <el-input v-model="form.shopCorporate" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="shopTel">
						<el-input maxLength="11" v-model="form.shopTel"></el-input>
					</el-form-item>
          <el-form-item label="上传店铺头像">
							<el-upload
  action="/shopManagement/upload"
  list-type="picture-card"
  :on-success="handlePictureSuccess"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
					</el-form-item>
          	<el-form-item label="店铺特点" style="white-space: nowrap;" prop="shopFeature">
						<el-input v-model="form.shopFeature"></el-input>
					</el-form-item>
           <el-form-item label="Vip等级">
    <el-select v-model="form.shopVip" placeholder="请选择VIP等级">
      <el-option label="VIP1" value="VIP1"></el-option>
      <el-option label="VIP2" value="VIP2"></el-option>
      <el-option label="VIP3" value="VIP3"></el-option>
      <el-option label="VIP4" value="VIP4"></el-option>
    </el-select>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button  @click="addFormVisible = false" >取 消</el-button>
    <el-button type="primary"  @click="()=>{
      addFormVisible=false
      this.addShop()
      }">确 定</el-button>
  </div>
  <!-- 门店列表 -->
</el-dialog>
    <el-table
    :data="rows"
     @row-click="(row)=>{
       deleteID=row._id
        editID=row._id
       }"
    border
    class="formTable">
    <el-table-column
      fixed
      prop="shopName"
      label="店名"
      width="120px">
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
      <template slot-scope="scope">
               <img :src="scope.row.shopLicenceImg" alt=""  style="width:100px">
             </template> 
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
       <template slot-scope="scope">
               <img :src="scope.row.shopImg" alt=""  style="width:100px">
             </template>   
    </el-table-column>
     <el-table-column
      prop="shopFeature"
      label="特色"
      width="120">
    </el-table-column>
      <el-table-column
      prop="shopVip"
      label="VIP等级"
      width="120">
    </el-table-column>
     <el-table-column
      prop="shopStatus"
      label="状态"
      width="120">
                </el-table-column>
   <el-table-column label="操作"  width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="deleteDialogVisible=true" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   </el-tab-pane>
   <el-tab-pane label="门店管理审核" name="second">
            <el-table
                   :data="audit"
                    border
                    style="width: 100%;margin-top: 20px">
                <el-table-column
                        fixed
                        prop="_id"
                        label="ID"
                        width="150">
                </el-table-column>
                <el-table-column
      fixed
      prop="shopName"
      label="店名"
      width="120px">
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
       <template slot-scope="scope">
               <img :src="scope.row.shopLicenceImg" alt=""  style="width:100px">
             </template> 
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
       <template slot-scope="scope">
               <img :src="scope.row.shopImg" alt=""  style="width:100px">
             </template> 
    </el-table-column>
     <el-table-column
      prop="shopFeature"
      label="特色"
      width="120">
    </el-table-column>
      <el-table-column
      prop="shopVip"
      label="VIP等级"
      width="120">
    </el-table-column>
                <el-table-column label="操作" width="200" >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleAllow(scope.$index, scope.row)">通过
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDeny(scope.$index, scope.row)">拒绝
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 删除弹出框 -->
 <el-dialog
  title="提示"
  :visible.sync="deleteDialogVisible"
  width="30%"
  >
  <span>你确定要删除吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="()=>{
      deleteDialogVisible=false;
      deleteShop(deleteID);
       this.asyncGetShopByPage();
      }">确 定</el-button>
  </span>
</el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible">
            <el-form :model="editShop" label-width="110px" class="demo-formData">
    <el-form-item label="门店名称" :label-width="formLabelWidth">
      <el-input v-model="editShop.shopName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="营业执照号码" :label-width="formLabelWidth">
      <el-input v-model="editShop.shopLicenceNum" auto-complete="off"></el-input>
    </el-form-item>
    	<el-form-item label="营业执照图片">
						<el-upload
            :limit=1
  action="/shopManagement/upload"
  list-type="picture-card"
  :on-success="handlePictureLicenceEditSuccess"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
					</el-form-item>
           <el-form-item label="营业地址" :label-width="formLabelWidth">
      <el-input v-model="editShop.shopAdd" auto-complete="off"></el-input>
    </el-form-item>
          <el-form-item label="定位" :label-width="formLabelWidth">
      <el-input v-model="editShop.shopLocation" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="法人" :label-width="formLabelWidth">
      <el-input v-model="editShop.shopCorporate" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="shopTel">
						<el-input maxLength="11" v-model="editShop.shopTel" ></el-input>
					</el-form-item>
          <el-form-item label="上传店铺头像">
								<el-upload
  action="/shopManagement/upload"
  list-type="picture-card"
  :on-success="handlePictureEditSuccess"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
					</el-form-item>
          	<el-form-item label="店铺特点" style="white-space: nowrap;" prop="shopFeature">
						<el-input v-model="editShop.shopFeature"></el-input>
					</el-form-item>
           <el-form-item label="Vip等级">
    <el-select v-model="editShop.shopVip" placeholder="请选择VIP等级">
      <el-option label="VIP1" value="VIP1"></el-option>
      <el-option label="VIP2" value="VIP2"></el-option>
      <el-option label="VIP3" value="VIP3"></el-option>
      <el-option label="VIP4" value="VIP4"></el-option>
    </el-select>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button  @click="editFormVisible = false" >取 消</el-button>
    <el-button type="primary" @click="saveEdit">确 定</el-button>
  </div>
        </el-dialog>
  </el-tabs>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "shopName",
  created() {
    this.asyncGetShopByPage();
  },
  data() {
    return {
      form: {
        shopName: "", //店铺名称
        shopAdd: "", //地址
        shopLicenceNum: "",
        description: "", //介绍
        shopTel: "",
        shopFeature: "",
        shopCorporate: "",
        shopImg: "",
        shopLicenceImg: "",
        shopLocation: "",
        shopCorporate: "",
        shopVip: "",
        shopStatus: "1"
      },
      deleteID: "",
      editID: "",
      search: "",
      select: "",
      activeName: "first",
      formLabelWidth: "120px",
      dialogTableVisible: false,
      addFormVisible: false,
      dialogVisible: false,
      editFormVisible: false,
      deleteDialogVisible: false,
      restaurants: [],
      dialogImageUrl: "",
      dialogVisible: false,
      editShop: {
        shopName: "", //店铺名称
        shopAdd: "", //地址
        shopLicenceNum: "",
        description: "", //介绍
        shopTel: "",
        shopFeature: "",
        shopCorporate: "",
        shopImg: "",
        shopLicenceImg: "",
        shopVip: "",
        shopStatus: "1",
        _id: "",
        shopLocation: ""
      }
    };
  },
  computed: {
    ...mapState("shopName", [
      "curPage",
      "eachPage",
      "maxPage",
      "total",
      "rows",
      "audit"
    ])
  },
  mounted: function() {
    this.asyncGetShopByPage();
    this.async_getAudit();
  },
  methods: {
    ...mapActions("shopName", [
      "asyncGetAddShop",
      "asyncGetShopByPage",
      "deleteShop",
      "editShops",
      "async_getAudit",
      "async_putAudit"
    ]),
    ...mapMutations("shopName", [
      "getShopByPage",
      "addShop",
      "delete_shop",
      "edit_shop",
      "setState"
    ]),
    // 分页
    handleSizeChange(val) {
      this.asyncGetShopByPage({ eachPage: val });
    },
    handleCurrentChange(val) {
      this.asyncGetShopByPage({ curPage: val });
    },
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
    // 增加
    addShop:function() {
       this.asyncGetAddShop({
        shopName: this.form.shopName,
        shopAdd: this.form.shopAdd, //地址
        shopLicenceNum: this.form.shopLicenceNum,
        description: this.form.delivery_mode, //介绍
        shopTel: this.form.shopTel,
        shopFeature: this.form.shopFeature,
        shopLicenceImg: this.form.shopLicenceImg,
        shopImg: this.form.shopImg,
        shopLocation: this.form.shopLocation,
        shopStatus: "1",
        shopVip: this.form.shopVip,
        shopCorporate: this.form.shopCorporate
      });
      this.asyncGetShopByPage();
    },
    async putShop() {
      switch (this.editShop.shopStatus) {
        case "待审核":
          this.editShop.shopStatus = "0";
          break;
        case "审核通过":
          this.editShop.shopStatus = "1";
          break;
        default:
          this.editShop.shopStatus = "2";
          break;
      }
      await this.editShops({
        _id: this.editShop._id,
        shopName: this.editShop.shopName,
        shopAdd: this.editShop.shopAdd, //地址
        shopLicenceNum: this.editShop.shopLicenceNum,
        description: this.editShop.description, //介绍
        shopTel: this.editShop.shopTel,
        shopFeature: this.editShop.shopFeature,
        shopCorporate: this.editShop.shopCorporate,
        shopImg: this.editShop.shopImg,
        shopLicenceImg: this.editShop.shopLicenceImg,
        shopLocation: this.editShop.shopLocation,
        shopVip: this.editShop.shopVip,
        shopStatus: this.editShop.shopStatus
      });
      this.editFormVisible = false;
      this.asyncGetShopByPage();
    },
    // 图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureSuccess(response, file, fileList) {
      this.form.shopImg = response.url;
    },
    handlePictureLicenceSuccess(response, file, fileList) {
      this.form.shopLicenceImg = response.url;
    },
    // 图片修改
    handlePictureLicenceEditSuccess(response, file, fileList) {
      this.editShop.shopLicenceImg = response.url;
    },
    handlePictureEditSuccess(response, file, fileList) {
      this.editShop.shopImg = response.url;
    },
    // 审核
    async handleAllow(index, row) {
      console.log(row)
      await this.async_putAudit({
        shopStatus: "1",
        _id: row._id
      });
      this.async_getAudit();
      this.asyncGetShopByPage();
    },
    async handleDeny(index, row) {
     await this.async_putAudit({
       shopStatus: "2",
        _id: row._id
      });
      this.async_getAudit();
      this.asyncGetShopByPage();
    },
    // 修改
    handleEdit(index, row) {
      console.log(row, index);
      this.editFormVisible = true;
      this.editShop = Object.assign({}, row);
    },
    //确认修改
    saveEdit() {
      this.editFormVisible = false;
      this.editShops({
        _id: this.editShop._id,
        shopName: this.editShop.shopName,
        shopAdd: this.editShop.shopAdd, //地址
        shopLicenceNum: this.editShop.shopLicenceNum,
        description: this.editShop.delivery_mode, //介绍
        shopTel: this.editShop.shopTel,
        shopFeature: this.editShop.shopFeature,
        shopCorporate: this.editShop.shopCorporate,
        shopImg: this.editShop.shopImg,
        shopLicenceImg: this.editShop.shopLicenceImg,
        shopLocation: this.editShop.shopLocation,
        shopVip: this.editShop.shopVip
      });
      this.asyncGetShopByPage();
    }
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
.formTable {
  margin-left: 20px;
  margin-top: 20px;
  width: 100%;
  text-align: center
}
.shopImg {
  width: 50px;
  height: 50px;
}
</style>