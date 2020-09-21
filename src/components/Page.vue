<template>
    <div id="page" :style="page.style">
        导航
        <Element v-for="(item) in page.elements" :element="item" :key="item.uuid"></Element>
    </div>
</template>

<script>
import Element from './Element';
/**
 * 页面组件
 */
export default {
    name: 'Page',
    components: { Element },
    data() {
        return {
            page: {}
        }
    },
    computed: {
    },
    methods: {
        
    },
    created() {
        this.page = this.$P.getPage();
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>