<template>
    <div class="back-top" :class="{hide:!visible,show:visible}">
        <el-button icon="el-icon-arrow-up"
                   @click="$emit('handleToTop')" circle/>
        <el-button icon="el-icon-arrow-down"
                   @click="$emit('handleToBottom')"
                   circle/>
    </div>
</template>

<script>
    export default {
        props: {
            visible: Boolean,
        }
    }
</script>

<style scoped>
    .back-top {
        position: fixed;
        bottom: 50px;
        right: 80px;
        z-index: 2;
        transition: opacity .5s;
    }

    .hide {
        opacity: 0;
        pointer-events: none;
    }

    .show {
        opacity: 1;
        pointer-events: initial;
    }
</style>