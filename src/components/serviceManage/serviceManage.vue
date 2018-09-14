<template>
   <div>
       <!-- 操作按钮 -->
    <el-card shadow="always">
        <el-button type="primary" @click="addDialogVisible = true"  icon="el-icon-circle-plus">添加</el-button>
        <el-button type="primary" @click="()=>{
                searchText=encodeURI(this.search);
                asyncgetServiceByPage({
                searchType:this.select,
                searchText,
              })
            }" icon="el-icon-search">搜索</el-button>
    <el-input placeholder="请输入内容" v-model="search" style="width:500px">
    <el-select v-model="select" style='width:110px' slot="prepend" placeholder="请选择">
      <el-option label="服务类型" value="serviceType"></el-option>
      <el-option label="服务名称" value="serviceName"></el-option>
      <el-option label="服务描述" value="serviceDetails"></el-option>
    </el-select>
  </el-input>
    </el-card>
    <!-- 表格显示区 -->
    <el-table
     :data="rows"
     @row-click="(row)=>{
       deleteID=row._id
        editID=row._id
       }"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="服务时长:">
            <span>{{ props.row.serviceTime }}</span>
          </el-form-item>
          <el-form-item label="可预约时间:">
            <span>{{ props.row.serviceSchedule }}</span>
          </el-form-item>
          <el-form-item label="服务价格:">
            <span>{{ props.row.servicePrice }}</span>
          </el-form-item>
          <el-form-item label="服务级别:">
            <span>{{ props.row.serviceClass }}</span>
          </el-form-item>
          <el-form-item label="服务员等级:">
            <span>{{ props.row.serverLevel }}</span>
          </el-form-item>
          <el-form-item label="服务详情:">
            <span>{{ props.row.serviceDetails }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="服务名称"
      prop="serviceName">
    </el-table-column>
    <el-table-column
      label="服务类型"
      prop="serviceType">
    </el-table-column>
    <el-table-column
      label="服务适用"
      prop="serviceCanFor">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini"
      type="success" icon="el-icon-edit" @click="editClick(scope.$index,scope.row)" circle></el-button>
        <el-button size="mini"
      type="danger" icon="el-icon-delete" @click="deleteDialogVisible=true" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="curpage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="eachpage"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
 <!-- 增加对话框 -->
 <el-dialog ref="addform" title="添加服务" :visible.sync="addDialogVisible">
  <el-form >
    <el-form-item label="服务名称" label-width="120px">
      <el-input v-model="addService.serviceName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务类型" label-width="120px">
      <el-select v-model="addService.serviceType" placeholder="请选择服务类型">
        <el-option label="宠物美容" value="宠物美容"></el-option>
         <el-option label="宠物洗浴" value="宠物洗浴"></el-option>
        <el-option label="宠物医护" value="宠物医护"></el-option>
         <el-option label="宠物造型" value="宠物造型"></el-option>
          <el-option label="宠物摄影" value="宠物摄影"></el-option>
           <el-option label="宠物婚育" value="宠物婚育"></el-option>
            <el-option label="宠物寄养" value="宠物寄养"></el-option>
            <el-option label="宠物殡葬" value="宠物殡葬"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="服务排期" label-width="120px">
      <el-input v-model="addService.serviceSchedule" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务适用" label-width="120px">
      <el-input v-model="addService.serviceCanFor" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务级别" label-width="120px">
      <el-input v-model="addService.serviceClass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务时长" label-width="120px">
      <el-input v-model="addService.serviceTime" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务员等级" label-width="120px">
      <el-input v-model="addService.serverLevel" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="服务详情" label-width="120px">
      <el-input v-model="addService.serviceDetails" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="价格" label-width="120px">
      <el-input v-model="addService.servicePrice" auto-complete="off"></el-input>
    </el-form-item>
    <!-- 上传图片 -->
    <el-form-item label="详情图片" label-width="120px">
      <el-upload
        action="/serviceManage/upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmAdd">确 定</el-button>
  </div>
</el-dialog>
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
      deleteService(deleteID);
      }">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改对话框 -->
<el-dialog title="修改" :visible.sync="editDialogVisible">
  <el-form :model='editService'>
    <el-form-item label="服务名称" label-width="120px">
      <el-input  v-model="editService.serviceName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务类型" label-width="120px">
      <el-select  v-model="editService.serviceType" placeholder="请选择服务类型">
        <el-option label="宠物美容" value="宠物美容"></el-option>
         <el-option label="宠物洗浴" value="宠物洗浴"></el-option>
        <el-option label="宠物医护" value="宠物医护"></el-option>
         <el-option label="宠物造型" value="宠物造型"></el-option>
          <el-option label="宠物摄影" value="宠物摄影"></el-option>
           <el-option label="宠物婚育" value="宠物婚育"></el-option>
            <el-option label="宠物寄养" value="宠物寄养"></el-option>
            <el-option label="宠物殡葬" value="宠物殡葬"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="服务排期" label-width="120px">
      <el-input v-model="editService.serviceSchedule" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务适用" label-width="120px">
      <el-input v-model="editService.serviceCanFor" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务级别" label-width="120px">
      <el-input v-model="editService.serviceClass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务时长" label-width="120px">
      <el-input v-model="editService.serviceTime" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务员等级" label-width="120px">
      <el-input v-model="editService.serverLevel" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="服务详情" label-width="120px">
      <el-input v-model="editService.serviceDetails" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="价格" label-width="120px">
      <el-input v-model="editService.servicePrice" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmEdit">确 定</el-button>
  </div>
</el-dialog>
 
 
 </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "serviceManage",
  data() {
    return {
      addDialogVisible: false,
      deleteDialogVisible: false,
      editDialogVisible: false,
      deleteID: "",
      editID: "",
      search: "",
      select: "",
      dialogImageUrl: '',
      imageDialogVisible: false,
      addService: {
        serviceType: "",
        serviceName: "",
        serviceSchedule: "",
        serviceCanFor: "",
        serviceClass: "",
        serviceTime: "",
        serverLevel: "",
        servicePrice: "",
        serviceDetails: ""
      },
      editService: {
        serviceType: "",
        serviceName: "",
        serviceSchedule: "",
        serviceCanFor: "",
        serviceClass: "",
        serviceTime: "",
        serverLevel: "",
        servicePrice: "",
        serviceDetails: ""
      }
    };
  },
  computed: {
    ...mapState("serviceManage", [
      "curpage",
      "eachpage",
      "maxpage",
      "total",
      "rows"
    ])
  },
  created() {
    this.asyncgetServiceByPage();
  },

  methods: {
    ...mapActions("serviceManage", [
      "add_Service",
      "asyncgetServiceByPage",
      "deleteService",
      "edit_Service"
    ]),
    //点击修改
    editClick: function(index, row) {
      this.editDialogVisible = true;
      this.editService = Object.assign({}, row);
    },
    //确认添加
    confirmAdd: function() {
      this.addDialogVisible = false;
      this.add_Service({
        serviceType: this.addService.serviceType,
        serviceName: this.addService.serviceName,
        serviceSchedule: this.addService.serviceSchedule,
        serviceCanFor: this.addService.serviceCanFor,
        serviceClass: this.addService.serviceClass,
        serviceTime: this.addService.serviceTime,
        serverLevel: this.addService.serverLevel,
        servicePrice: this.addService.servicePrice,
        serviceDetails: this.addService.serviceDetails
      });
    },
    //确认修改
    confirmEdit: function() {
      this.editDialogVisible = false;
      this.edit_Service({
        _id: this.editService._id,
        serviceType: this.editService.serviceType,
        serviceName: this.editService.serviceName,
        serviceSchedule: this.editService.serviceSchedule,
        serviceCanFor: this.editService.serviceCanFor,
        serviceClass: this.editService.serviceClass,
        serviceTime: this.editService.serviceTime,
        serverLevel: this.editService.serverLevel,
        servicePrice: this.editService.servicePrice,
        serviceDetails: this.editService.serviceDetails
      });
    },
    //图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imageDialogVisible = true;
    },
    //翻页
    handleSizeChange(val) {
      this.asyncgetServiceByPage({ eachpage: val });
    },
    handleCurrentChange(val) {
      this.asyncgetServiceByPage({ curpage: val });
    }
  }
};
</script>
<style scoped>
</style>

