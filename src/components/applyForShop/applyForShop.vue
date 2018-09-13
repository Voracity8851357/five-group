<template>
   <div>
        <el-row style="margin-top: 20px;">
  			<el-col>
		        <el-form  label-width="110px" class="demo-formData"  :model="formData" :rules="rules" ref="formData">
					<el-form-item label="店铺名称" prop="shopName">
						<el-input v-model="getAddShop.shopName"></el-input>
					</el-form-item>
							<el-form-item label="营业执照号码" prop="shopLicenceNum"  :model="formData"
						 >
						<el-input v-model="getAddShop.shopLicenceNum"></el-input>
					</el-form-item>
							<el-form-item label="法人" prop="shopCorporate" :model="formData">
						<el-input  v-model="getAddShop.shopCorporate"></el-input>
					</el-form-item>
					<el-form-item label="详细地址" prop="shopAdd" :model="formData">
						<el-autocomplete
                             popper-class="my-autocomplete"
                              v-model="getAddShop.shopAdd"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                             @select="handleSelect">
                         <i
                        class="el-icon-edit el-input__icon"
                       slot="suffix"
                    @click="handleIconClick">
                      </i>
                    <template slot-scope="{ item }">
                    <span class="addr">{{item.shopAdd}}</span>
                              </template>
                   </el-autocomplete>
						<span>当前城市</span>
					</el-form-item>
					<el-form-item label="联系电话" prop="shopTel" :model="formData">
						<el-input maxLength="11" v-model="getAddShop.shopTel"></el-input>
					</el-form-item>
					<el-form-item label="店铺简介" prop="description" :model="formData">
						<el-input v-model="getAddShop.description"></el-input>
					</el-form-item>
				<el-form-item label="店铺特点" style="white-space: nowrap;">
						<span>品牌保证</span>
						<el-switch  style="display" v-model="getAddShop.is_premium" ></el-switch>
						<span>会员打折</span>
						<el-switch style="display" v-model="getAddShop.delivery_mode"></el-switch>
						<span>新开店铺</span>
						<el-switch style="display" v-model="getAddShop.new"></el-switch>
					</el-form-item>
					<el-form-item label="营业时间" style="white-space: nowrap;">
						<el-time-select
						v-model="getAddShop.startTime"
							placeholder="起始时间"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}"
							>
						</el-time-select>
						<el-time-select
						v-model="getAddShop.endTime"
							placeholder="结束时间"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}"
							minTime: getAddShop.startTime
							>
						</el-time-select>
					</el-form-item>
                   <el-form-item label="上传营业执照">
					<el-upload
                    :action="'/images'" 
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                   </el-form-item>
					<el-form-item label="上传营业执照">
						<el-upload
						 :action="'/images'" 
                          accept=".jpg, .png"
                         list-type="picture-card"
                         :on-preview="handlePictureCardPreview"
                         :on-remove="handleRemove">
                          <i class="el-icon-plus"></i>
                          </el-upload>
                          <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
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
  data(){
    return{
		 ctiy:{},
        formData:{
            shopName: '', //店铺名称
            shopAdd: '', //地址
            shopLicenceNum: '',
            description: '', //介绍
            shopTel: '',
            startTime: '',
            endTime: '',
			      delivery_mode: true,
		},
		dialogImageUrl: '',
		dialogVisible: false,
		restaurants: [],
	 rules: {
					name: [
						{ required: true, message: '请输入店铺名称', trigger: 'blur' },
					],
					phone: [
						{ required: true, message: '请输入联系电话' },
						{ type: 'number', message: '电话号码必须是数字' }
					],
				},
}
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
	   querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
	  },
      loadAll() {
        return [
          { "shopAdd": "长宁区新渔路144号" },
          {  "shopAdd": "上海市长宁区淞虹路661号" },
          {  "shopAdd": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          {  "shopAdd": "天山西路438号" },
          {  "shopAdd": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          {  "shopAdd": "上海市长宁区金钟路633号" },
          {  "shopAdd": "上海市嘉定区曹安公路曹安路1685号" },
          {  "shopAdd": "上海市普陀区同普路1435号" },
          {  "shopAdd": "上海市北翟路1444弄81号B幢-107" },
          {  "shopAdd": "上海市嘉定区新郁路817号" },
          {  "shopAdd": "嘉定区曹安路1611号" },
          {  "shopAdd": "嘉定区曹安公路2383弄55号" },
          {  "shopAdd": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          {  "shopAdd": "上海长宁区金钟路968号9号楼地下一层" },
          {  "shopAdd": "上海市长宁区天山西路119号" },
          {  "shopAdd": "上海市长宁区仙霞西路" },
          {  "shopAdd": "上海市长宁区天山西路567号1层R117号店铺" },
          { "shopAdd": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          {  "shopAdd": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          {  "shopAdd":"上海市普陀区棕榈路" },
          {  "shopAdd": "元丰天山花园(东门) 双流路267号" },
          {  "shopAdd": "上海市长宁区天山西路" },
          {  "shopAdd": "上海市长宁区通协路" },
          { "shopAdd": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          {  "shopAdd": "长宁区仙霞西路88号1305室" },
          {  "shopAdd": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          {  "shopAdd": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          {  "shopAdd": "上海市长宁区威宁路天山路341号" },
          {  "shopAdd": "上海市嘉定区丰庄路240号" },
          {  "shopAdd": "长宁区新渔路144号" },
          {  "shopAdd": "长宁区淞虹路148号" },
          {  "shopAdd": "上海市普陀区老真北路160号" },
          {  "shopAdd": "上海市长宁区金钟路968号15楼15-105室" },
          {  "shopAdd": "剑河路443-1" },
          {  "shopAdd": "长宁区北新泾街道天山西路490-1号" },
          {  "shopAdd": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
		];
	  },
	   handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
	  },
	  addShop:function(){
       this.getAddShop({
            _id:this.getAddShop.id,
            shopName:this.getAddShop.shopName,
            shopAdd: this.getAddShop.shopAdd, //地址
            shopLicenceNum: this.getAddShop.shopLicenceNum,
            description: this.getAddShop.delivery_mode, //介绍
            shopTel: this.getAddShop.shopTel,
            startTime: this.getAddShop.startTime,
            endTime: this.getAddShop.endTime,
			      delivery_mode:this.getAddShop.delivery_mode,
       }) 
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
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
</style>