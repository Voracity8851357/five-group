<template>
    <div>
        <add-goods/>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import addGoods from "./addGoods";

    @Component({
        components: {
            addGoods,
        }
    })
    export default class editHeader extends Vue {
    }
</script>

<style scoped>

</style>