<template>
    <input type="text" :style="element.style" v-model="value" />
</template>

<script>
export default {
    name: 'IdeInput',
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
        this.element.style = {
            ...this.element.style,
            height: '30px',
            paddingLeft: '10px',
            paddingRIght: '10px',
            paddingTop: '5px',
            paddingBottom: '5px',
        }
    },
    mounted() {

    }
}
</script>

<style>
</style>