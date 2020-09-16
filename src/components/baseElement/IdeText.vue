<template>
    <div :style="element.style">{{value}}</div>
</template>

<script>
export default {
    name: 'IdeText',
    props: {
        element: {
            type: Object,
            default: () => {return {}}
        }
    },
    data() {
        return {
            value: ''
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