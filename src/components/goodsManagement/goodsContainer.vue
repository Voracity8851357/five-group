<template>
    <div>
        <edit-header
                @handleOpenExpand="handleOpenExpand"
                @handleDialogTrigger="handleDialogTrigger"
        />
        <goods-table :expandTrigger="expandTrigger"/>
        <table-pagination/>
        <add-dialog
                :dialogVisible="dialogVisible"
                @handleDialogTrigger="handleDialogTrigger"
        />
        <back-top
                @handleToTop="handleToTop"
                @handleToBottom="handleToBottom"
                :visible="visible"/>
    </div>
</template>
<script>
    import Vue from "vue";

    import editHeader from "./goodsHeader";
    import addDialog from "./addDialog";
    import goodsTable from "./goodsTable";
    import tablePagination from "./tablePagination";
    import backTop from "./backTop";

    Vue.component("editHeader", editHeader);
    Vue.component("addDialog", addDialog);
    Vue.component("goodsTable", goodsTable);
    Vue.component("tablePagination", tablePagination);
    Vue.component("backTop", backTop);

    export default {
        data() {
            return {
                //新增对话框显示隐藏
                dialogVisible: false,
                //列表是否打开
                expandTrigger: false,
                //
                container: Element,
                //
                visible: false,
            }
        },
        methods: {
            //对话框
            handleDialogTrigger(state) {
                this.dialogVisible = state;
            },
            //打开或者所有行
            handleOpenExpand(isOpen) {
                this.expandTrigger = isOpen;
            },
            //
            handleToTop() {
                this.container.scrollTop = 0;
                this.visible = false;
            },
            handleToBottom() {
                this.container.scrollTop = this.container.scrollHeight;
            },
            console(event) {
                console.log("console");
                console.log(event);
            }
        },
        mounted() {
            this.container = document.querySelector(".content-container");
            this.container.addEventListener("wheel", () => {
                this.visible = this.container.scrollTop > 400;
            })
        }
    }
</script>


<style>

</style>