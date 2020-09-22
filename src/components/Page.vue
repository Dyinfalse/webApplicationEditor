<template>
    <div id="page" :class="page.isLogin ? 'login' : ''" :style="page.style">
        <template v-if="page.isLogin">
            <Login></Login>
        </template>
        <template v-else>
            <Element v-for="(item) in page.elements" :element="item" :key="item.uuid"></Element>
        </template>
    </div>
</template>

<script>
import Element from './Element';
import Login from './graceComponents/Login'
/**
 * 页面组件
 */
export default {
    name: 'Page',
    components: { Element , Login },
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
.login {
    height: 100% !important;
}
</style>