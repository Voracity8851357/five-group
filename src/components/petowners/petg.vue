<template>
    <div>
        <el-table
                :data="rows"
                border
                :key="rows._id"
                style="width: 100%;text-align: center;margin-top: 20px">
            <el-table-column
                    prop="memberPhone"
                    label="电话号码">
            </el-table-column>
            <el-table-column
                    prop="memberAcount"
                    label="昵称">
            </el-table-column>
            <el-table-column
                    prop="memberName"
                    label="真实姓名">
            </el-table-column>
            <el-table-column
                    prop="memberCard"
                    label="会员卡">
            </el-table-column>
            <el-table-column
                    prop="memberImg"
                    label="图片">
                <template slot-scope="memberImg">
                    <el-button type="text" @click="open5(memberImg.row.memberImg)">点击预览</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="memberAdd"
                    label="送货地址">
            </el-table-column>
            <el-table-column
                    prop="memberArea"
                    label="区域">
            </el-table-column>
            <el-table-column
                    prop="memberPoint"
                    label="积分">
            </el-table-column>
            <el-table-column
                    prop="pet[0].namepet"
                    label="拥有的商品">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-delete" @click="handleClick(scope.row)">删除</el-button>
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

    </div>
</template>
<script>
    import {mapActions, mapState, mapMutations} from "vuex";
    export default {
        name: "pets",
        computed: {
            ...mapState("store", ["curPage", "eachPage", "maxPage", "count", "rows"])
        },
        //观察函数
        // mounted() {
        //     console.log(this)
        // },

        watch: {
            curPage() {
                this.asyncGetEmpByPage();
            },
            eachPage() {
                this.asyncGetEmpByPage();
            },
        },
        methods: {

            ...mapMutations("login", ["setCurPage", "setEachPage"]),
            ...mapActions('store', ["PostEmpByPage", "GetEmpByPage", 'asyncGetEmpByPage', 'deleve']),
            handleSizeChange(val) {
                this.setEachPage(val)
            },
            handleCurrentChange(val) {
                this.setCurPage(val)
            },
            firstPage() {
                this.asyncGetEmpByPage({curPage: 1});
            },
            lastPage() {
                this.asyncGetEmpByPage({curPage: this.maxPage});
            },
            //删除
            handleClick(del) {
                // console.log(del)
                this.deleve({del})
            },
            open5(memberImg) {
                console.log(memberImg[0])
                let url=memberImg[0]
                this.$alert(`<img src=${url} style="width: 100px;height: 150px">`, '商品图片', {
                    dangerouslyUseHTMLString: true
                })
            }
        }
    }
</script>

<style scoped>
    .class {
        margin: 0;
        padding: 0;
        width: 35px;
        height: 30px;
    }

</style>