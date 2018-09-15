<template>
<div style="width:100%">
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
  action="https://localhost:8081/shopManagement/upload"
  list-type="picture-card"
  :auto-upload="false"
   :multiple="true"
  :on-preview="handlePictureCardPreview"
  :on-success="handUploadSuccess">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="form.shopLicenceImg" alt="">
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
    <el-form-item label="联系电话" prop="phone">
						<el-input maxLength="11"></el-input>
					</el-form-item>
          <el-form-item label="上传店铺头像">
							<el-upload
  action="https://localhost:8081/shopManagement/upload"
  list-type="picture-card"
   :auto-upload="false"
   :multiple="true"
  :on-preview="handlePictureCardPreview"
 :on-success="onUploadSuccess">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="editShop.shopImg" alt="">
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
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="店名:">
            <span>{{ props.row.shopName }}</span>
          </el-form-item>
          <el-form-item label="营业执照号：">
            <span>{{ props.row.shopLicenceNum }}</span>
          </el-form-item>
          <el-form-item label="营业执照图片：">
            <span>{{ props.row.shopLicenceImg }}</span>
          </el-form-item>
          <el-form-item label="营业地点：">
            <span>{{ props.row.shopAdd }}</span>
          </el-form-item>
          <el-form-item label="定位:">
            <span>{{ props.row.shopLocation }}</span>
          </el-form-item>
          <el-form-item label="法人">
            <span>{{ props.row.shopCorporate }}</span>
          </el-form-item>
           <el-form-item label="联系电话：">
            <span>{{ props.row.shopTel }}</span>
          </el-form-item>
          <el-form-item label="营业地点：">
            <span>{{ props.row.shopAdd }}</span>
          </el-form-item>
          <el-form-item label="头图:">
            <span>{{ props.row.shopImg }}</span>
          </el-form-item>
          <el-form-item label="特色">
            <span>{{ props.row.shopFeature }}</span>
          </el-form-item>
           <el-form-item label="shopVip">
            <span>{{ props.row.shopVip }}</span>
          </el-form-item>
        </el-form>
      </template>
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
      prop="shopVip"
      label="VIP等级"
      width="120">
    </el-table-column>
   <el-table-column label="操作"  width="200">
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
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-success="handUploadSuccess">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="editShop.shopLicenceImg" alt="">
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
    <el-form-item label="联系电话" prop="phone">
						<el-input maxLength="11"></el-input>
					</el-form-item>
          <el-form-item label="上传店铺头像">
							<el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-success="onUploadSuccess"
  >
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="editShop.shopImg" alt="">
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
    <el-button type="primary" @click="confirmEdit">确 定</el-button>
  </div>
        </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
  export default {
     name:"shopName",
     created() {
    this.asyncGetShopByPage();
  },
     data(){
       return{
      form: {
        shopName: "", //店铺名称
        shopAdd: "", //地址
        shopLicenceNum: "",
        description: "", //介绍
        shopTel: "",
        shopFeature: "",
        shopCorporate:"",
        shopImg:"",
        shopLicenceImg:"",
        shopLocation:'',
        shopVip:""
        },
         deleteID: "",
         editID: "",
         search: "",
         select: "",
        formLabelWidth: '120px',
        dialogTableVisible: false,
        addFormVisible: false,
        dialogVisible: false,
        editFormVisible:false,
        restaurants: [], 
        editShop: {
        shopName: "", //店铺名称
        shopAdd: "", //地址
        shopLicenceNum: "",
        description: "", //介绍
        shopTel: "",
        shopFeature: "",
        shopCorporate:"",
        shopImg:"",
        shopLicenceImg:"",
        shopVip:""
      }
     }
     },
     computed: {
    ...mapState("shopName", ["curPage", "eachPage", "maxPage", "total", "rows"])
  },
    methods:{
      ...mapActions('shopName',["asyncGetAddShop","asyncGetShopByPage","deleteShop","asyncEditShop"]),
      ...mapMutations('shopName',['getShopByPage',"addShop","delete_shop","edit_shop"]),
      // 分页
      handleSizeChange(val) {
       this.asyncGetShopByPage({eachPage:val})
      },
      handleCurrentChange(val) {
       this.asyncGetShopByPage({curPage:val})
      },
    
      // 增加
    addShop: function() {
      this.asyncGetAddShop({
        shopName: this.form.shopName,
        shopAdd: this.form.shopAdd, //地址
        shopLicenceNum: this.form.shopLicenceNum,
        description: this.form.delivery_mode, //介绍
        shopTel: this.form.shopTel,
        shopFeature: this.form.shopFeature,
        shopCorporate:this.form.shopCorporate,
        shopImg:this.form.shopImg,
        shopLicenceImg:this.form.shopLicenceImg,
        shopLocation:this.form.shopLocation,
        shopVip:this.form.shopVip
      })
      this.asyncGetShopByPage()
    },
      // 图片
       onUploadSuccess(response, file, fileList) {
                this.form.shopImg.push(...response.path);
                this.$refs.shopAddForm.validateField("shopImg");
            },
      handlePictureCardPreview(file, fileList){
         console.log(file, fileList)
      },
        handUploadSuccess(response, file, fileList) {
                this.form.shopImg.push(...response.path);
                this.$refs.shopAddForm.validateField("shopImg");
            },
      // 删除
      handleDelete(index, row){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteShop({
            _id:row._id
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        this.asyncGetShopByPage()
      },
      // 修改
      handleEdit(index, row) {
        console.log(row,index)
         this.editFormVisible = true;
         this.editShop= Object.assign({}, row); 
            },
             //确认修改
       confirmEdit() {
      this.editFormVisible = false;
      this.asyncEditShop({
        _id: this.editShop._id,
        shopName: this.editShop.shopName,
        shopAdd: this.editShop.shopAdd, //地址
        shopLicenceNum: this.editShop.shopLicenceNum,
        description: this.editShop.delivery_mode, //介绍
        shopTel: this.editShop.shopTel,
        shopFeature: this.editShop.shopFeature,
        shopCorporate:this.editShop.shopCorporate,
        shopImg:this.editShop.shopImg,
        shopLicenceImg:this.editShop.shopLicenceImg,
        shopLocation:this.editShop.shopLocation,
        shopVip:this.editShop.shopVip
      });
      this.asyncGetShopByPage()
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
.formTable{
  margin-left: 20px;
  margin-top: 20px;
  width: 100%;
}
</style>