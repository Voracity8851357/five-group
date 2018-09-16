<template>
    <div class="goods-header-container">
        <el-button class="add-goods-btn" type="primary" icon="el-icon-plus" @click="$emit('handleDialogTrigger',true)">
            新增商品
        </el-button>
        <el-autocomplete
                v-model="tempSearchText"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入商品名称"
                prefix-icon="el-icon-search"
                @select="handleSearchSelect">
        </el-autocomplete>
        <div style="flex: 1"></div>
        <el-switch
                v-model="expandTrigger"
                active-text="打开列表"
                inactive-text="关闭列表"
                @change="$emit('handleOpenExpand',expandTrigger)">
        </el-switch>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from "vuex";

    const {mapActions, mapMutations} = createNamespacedHelpers("goodsManagement");

    import {debounce} from "lodash";

    export default {
        data() {
            return {
                //扩展列表展开状态
                expandTrigger: false,
                //搜索框文本
                tempSearchText: "",
            }
        },
        methods: {
            //设置store搜索数据
            ...mapMutations(["setSearchText"]),
            //异步读取商品
            ...mapActions(["getGoodsAsync"]),
            //搜索字段联想
            async querySearchAsync(queryString = "", callback) {
                const results = await fetch(`/goodsManagement/getNames/?text=${queryString}`)
                    .then(res => res.json());
                callback(results);
                this.handleSearchSelect({value: queryString});
            },
            //点击搜索字段触发store数据刷新
            handleSearchSelect: debounce(function ({value}) {
                this.setSearchText(value);
                this.getGoodsAsync();
            }, 800),
        },
    }
</script>

<style scoped>
    .goods-header-container {
        display: flex;
        align-items: center;
        padding: 20px;
    }

    .add-goods-btn {
        margin-right: 20px;
    }
</style>