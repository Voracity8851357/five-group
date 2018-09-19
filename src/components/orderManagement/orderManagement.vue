<template>
    <div>
        <div class="line"></div>
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#FFF"
                text-color="#000000"
                active-text-color="#000000">
            <el-menu-item index="1">客户订单</el-menu-item>
            <el-menu-item index="2">
                <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                    <el-select v-model="select" slot="prepend" style="width: 90px;" placeholder="请选择类型">
                        <el-option label="姓名" value="memberName"></el-option>
                        <el-option label="订单号" value="ordernumber"></el-option>
                        <el-option label="用户电话" value="memberPhone"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="on(select,input5)"></el-button>
                </el-input>
            </el-menu-item>
            <el-menu-item index="1" @click="posts">新增订单</el-menu-item>
        </el-menu>
        <el-table
                :data="rows"
                border
                style="width: 100%;text-align: center">
            <el-table-column
                    prop="memberName"
                    label="用户"
                    width="146">
            </el-table-column>
            <el-table-column
                    prop="ordernumber"
                    label="订单号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="province"
                    label="下单日期"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="memberPhone"
                    label="电话"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="memberAdd"
                    label="地址"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="money"
                    label="金额"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="数量"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="处理状态"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="修改"
                    width="150">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleClick(scope.row)">修改订单
                    </el-button>
                    <el-button type="text" size="small" @click="handle(scope.row,obj._id)">删除订单</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看订单</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="curPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count">
        </el-pagination>

        <!--修改-->
        <el-dialog
                :visible.sync="dialogVisible"
                title="修改信息"
                :show-close="false"
                width="550px"
                custom-class="add-dialog">
            <el-card class="box-card" style="width: 500px; text-align: center">
                <el-form label-width="100px">
                    <el-form-item label="用户：">
                        <el-input style="width: 300px" v-model="obj.memberName"></el-input>
                    </el-form-item>
                    <el-form-item label="订单号：">
                        <el-input style="width: 300px" v-model="obj.ordernumber"></el-input>
                    </el-form-item>
                    <el-form-item label="下单日期：">
                        <el-input style="width: 300px" v-model="obj.province"></el-input>
                    </el-form-item>
                    <el-form-item label="电话：">
                        <el-input style="width: 300px" v-model="obj.memberPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="地址：">
                        <el-input style="width: 300px" v-model="obj.memberAdd"></el-input>
                    </el-form-item>
                    <el-form-item label="金额：">
                        <el-input style="width: 300px" v-model="obj.money"></el-input>
                    </el-form-item>
                    <el-form-item label="数量：">
                        <el-input style="width: 300px" v-model="obj.number"></el-input>
                    </el-form-item>
                    <el-form-item label="处理状态：">
                        <el-input style="width: 300px" v-model="obj.type"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="modify(obj,obj._id)">提交</el-button>
                </el-form>
            </el-card>
        </el-dialog>

    </div>

</template>

<script>
    import {mapActions, mapState, mapMutations} from "vuex";

    export default {
        name: "orderManagement",
        created() {
            console.log(this._id)
            if(!this._id===""){
                this.asyncGetEmpByPage({_id:this._id});
            }
        },
        data() {
            return {
                dialogVisible: false,
                input5: '',
                select: '',
                activeIndex: '1',
                activeIndex2: '1',
                obj: {
                    id:`${this._id}`,
                    _id: '',
                    memberName: '',
                    ordernumber: '',
                    province: '',
                    memberPhone: '',
                    memberAdd: '',
                    money: '',
                    number: '',
                    type: '',
                }
            };
        },
        //方法
        methods: {
            ...mapMutations("orderManagement", ["setCurPage", "setEachPage"]),
            ...mapActions('orderManagement', ["PostEmpByPage", "GetEmpByPage", 'asyncGetEmpByPage', 'dels', 'modifys', 'post']),

            //修改
            handleClick(row) {
                this.obj._id = row._id;
                this.dialogVisible = true;
                this.obj.memberName = row.memberName;
                this.obj.ordernumber = row.ordernumber;
                this.obj.province = row.province;
                this.obj.memberPhone = row.memberPhone;
                this.obj.memberAdd = row.memberAdd;
                this.obj.money = row.money;
                this.obj.number = row.number;
                this.obj.type = row.type;
            },
            //新增
            posts() {
                this.dialogVisible = true;
            },


            //修改提交
            modify(obj,id) {
                if (!Object.keys(id).length) {
                    // console.log("1")
                    this.post({obj});
                    this.obj = {};
                }
                else{
                    // console.log("2");
                    this.modifys({obj, id});
                }
                this.dialogVisible = false;
            },
            //删除
            handle(row) {
                this.$confirm('此操作将删除文件, 是否继续?', '提示删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dels({row})
                }).catch(() => {
                });
            },
            //查询
            on(select, input5) {
                let objs = {};
                if (select === 'memberName') {
                    objs = {memberName: input5}
                }
                else if (select === 'memberPhone') {
                    objs = {memberPhone: input5}
                } else {
                    objs = {ordernumber: input5}
                }
                this.asyncGetEmpByPage({objs});
                // this.as(arr)
            }
            ,
            handleSizeChange(val) {
                this.setEachPage(val)
            },
            handleCurrentChange(val) {
                this.setCurPage(val)
            },
        },
        //观察
        watch: {
            curPage() {
                this.asyncGetEmpByPage();
            },
            eachPage() {
                this.asyncGetEmpByPage();
            },
        },
        //计算属性
        computed: {
            ...mapState("orderManagement", ["curPage", "eachPage", "maxPage", "count", "rows"]),
            ...mapState('app',["_id"]),
        },

    }
</script>

<style scoped>
    .el-select .el-input {
        width: 130px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: white;
    }
</style>