<template>
    <div>
        <el-row>
            <el-col>
                <edit-header/>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <goods-list/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import editHeader from "./editHeader";

    import goodsList from "./goodsList";

    @Component({
        components: {
            goodsList,
            editHeader,
        }
    })
    export default class goodsContainer extends Vue {

    }
</script>

<style scoped>

</style>