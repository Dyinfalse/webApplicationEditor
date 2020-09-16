<template>
    <img :style="element.style" :src="src" />
</template>

<script>
export default {
    name: 'IdeImage',
    props: {
        element: {
            type: Object,
            default: () => {return {}}
        }
    },
    data() {
        return {
            src: ''
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