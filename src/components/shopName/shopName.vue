<template>
<div style="width:100%">
  <!-- 增加按钮 -->
 <el-button type="success" @click="addFormVisible = true">增加</el-button>
   <el-button type="primary" @click="()=>{
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
  <el-form :model="form" label-width="110px" class="demo-formData">
    <el-form-item label="门店名称" :label-width="formLabelWidth">
      <el-input v-model="form.shopName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="营业执照号码" :label-width="formLabelWidth">
      <el-input v-model="form.shopLicenceNum" auto-complete="off"></el-input>
    </el-form-item>
    	<el-form-item label="营业执照图片">
						<el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
					</el-form-item>
          	<el-form-item label="详细地址" prop="shopAdd">
							<el-autocomplete
                             popper-class="my-autocomplete"
                              v-model="form.shopAdd"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                             @select="handleSelect">
                         <i
                        class="el-icon-edit el-input__icon"
                       slot="suffix"
                    @click="handleIconClick">
                      </i>
                    <template slot-scope="{ item }">
                    <div class="name">{{ item.shopAdd }}</div>
                              </template>
                   </el-autocomplete>
						<span>当前城市</span>
					</el-form-item>
     <el-form-item label="法人" :label-width="formLabelWidth">
      <el-input v-model="form.shopCorporate" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
						<el-input maxLength="11"></el-input>
					</el-form-item>
          <el-form-item label="上传店铺头像">
							<el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
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
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
					</el-form-item>
          	<el-form-item label="详细地址" prop="shopAdd">
							<el-autocomplete
                             popper-class="my-autocomplete"
                              v-model="editShop.shopAdd"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                             @select="handleSelect">
                         <i
                        class="el-icon-edit el-input__icon"
                       slot="suffix"
                    @click="handleIconClick">
                      </i>
                    <template slot-scope="{ item }">
                    <div class="name">{{ item.shopAdd }}</div>
                              </template>
                   </el-autocomplete>
						<span>当前城市</span>
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
        shopCorporate:""
        },
         deleteID: "",
         editID: "",
          search: "",
           select: "",
        formLabelWidth: '120px',
        dialogImageUrl: '',
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
        shopCorporate:""
      }
     }
     },
     computed: {
    ...mapState("shopName", ["curPage", "eachPage", "maxPage", "total", "rows"])
  },
   mounted() {
    this.restaurants = this.loadAll();
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
      // 图片
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file, fileList){
         console.log(file, fileList)
      },
      // 删除
      handleDelete(index, row){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteShop(row)
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
      },
      // 修改
      handleEdit(index, row) {
        console.log(row,index)
         this.editFormVisible = true;
         this.editShop= Object.assign({}, row); 
            },
             //确认修改
       confirmEdit: function() {
      this.editFormVisible = false;
      this.asyncEditShop({
        _id: this.editShop._id,
        shopName: this.editShop.shopName,
        shopAdd: this.editShop.shopAdd, //地址
        shopLicenceNum: this.editShop.shopLicenceNum,
        description: this.editShop.delivery_mode, //介绍
        shopTel: this.editShop.shopTel,
        shopFeature: this.editShop.shopFeature,
        shopCorporate:this.editShop.shopCorporate
      });
    },
       querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { "shopAdd": "长宁区新渔路144号" },
        { "shopAdd": "上海市长宁区淞虹路661号" },
        { "shopAdd": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "shopAdd": "天山西路438号" },
        { "shopAdd": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "shopAdd": "上海市长宁区金钟路633号" },
        { "shopAdd": "上海市嘉定区曹安公路曹安路1685号" },
        { "shopAdd": "上海市普陀区同普路1435号" },
        { "shopAdd": "上海市北翟路1444弄81号B幢-107" },
        { "shopAdd": "上海市嘉定区新郁路817号" },
        { "shopAdd": "嘉定区曹安路1611号" },
        { "shopAdd": "嘉定区曹安公路2383弄55号" },
        { "shopAdd": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        { "shopAdd": "上海长宁区金钟路968号9号楼地下一层" },
        { "shopAdd": "上海市长宁区天山西路119号" },
        { "shopAdd": "上海市长宁区仙霞西路" },
        { "shopAdd": "上海市长宁区天山西路567号1层R117号店铺" },
        { "shopAdd": "上海市普陀区光复西路丹巴路28弄6号楼819" },
        { "shopAdd": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
        { "shopAdd": "上海市普陀区棕榈路" },
        { "shopAdd": "元丰天山花园(东门) 双流路267号" },
        { "shopAdd": "上海市长宁区天山西路" },
        { "shopAdd": "上海市长宁区通协路" },
        { "shopAdd": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
        { "shopAdd": "长宁区仙霞西路88号1305室" },
        {
          "shopAdd":
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        { "shopAdd": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
        { "shopAdd": "上海市长宁区威宁路天山路341号" },
        { "shopAdd": "上海市嘉定区丰庄路240号" },
        { "shopAdd": "长宁区新渔路144号" },
        { "shopAdd": "长宁区淞虹路148号" },
        { "shopAdd": "上海市普陀区老真北路160号" },
        { "shopAdd": "上海市长宁区金钟路968号15楼15-105室" },
        { "shopAdd": "剑河路443-1" },
        { "shopAdd": "长宁区北新泾街道天山西路490-1号" },
        { "shopAdd": "上海市长宁区金钟路968号9号楼地下一层9-83室" }
      ];
    },
    handleSelect(item) {
      this.form.shopAdd = item.shopAdd;
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    addShop: function() {
      this.asyncGetAddShop({
        shopName: this.form.shopName,
        shopAdd: this.form.shopAdd, //地址
        shopLicenceNum: this.form.shopLicenceNum,
        description: this.form.delivery_mode, //介绍
        shopTel: this.form.shopTel,
        shopFeature: this.form.shopFeature,
        shopCorporate:this.form.shopCorporate
      })
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
</style>