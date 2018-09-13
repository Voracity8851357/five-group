<template>
    <el-row>
        <el-col>
            <edit-header/>
        </el-col>
    </el-row>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import editHeader from "./editHeader";

    @Component({
        components: {
            editHeader,
        }
    })
    export default class goodsContainer extends Vue {

    }
</script>

<style scoped>

</style>