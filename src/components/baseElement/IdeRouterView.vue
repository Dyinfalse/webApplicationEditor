<template>
    <div :style="styleConfig">
        <router-view :key="element.uuid"></router-view>
    </div>
</template>

<script>
export default {
    name: 'IdeRouterView',
    props: {
        styleConfig: {
            type: Object,
            default: () => {return {}}
        },
        element: {
            type: Object,
            default: () => {return {}}
        }
    },
    data() {
        return {
        }
    },
    methods: {
    },
    created() {
        
    },
    mounted() {}
}
</script>

<style>
</style>