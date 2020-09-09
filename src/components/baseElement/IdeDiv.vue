<template>
    <div :style="styleConfig"></div>
</template>

<script>
export default {
    name: 'IdeDiv',
    props: {
        styleConfig: {
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