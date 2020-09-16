<template>
    <button :style="element.style">{{value}}</button>
</template>

<script>
export default {
    name: 'IdeButton',
    props: {
        element: {
            type: Object,
            default: () => {return {}}
        }
    },
    data() {
        return {
            value: '按钮',
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