<template>
    <select v-model="value" :style="element.style" >
        <option v-for="option in options" :value="option.value" :key="option.name">{{option.name}}</option>
    </select>
</template>

<script>
export default {
    name: 'IdeSelect',
    props: {
        element: {
            type: Object,
            default: () => {return {}}
        }
    },
    data() {
        return {
            value: '',
            options: [
                {name: "", value: ""}
            ]
        }
    },
    methods: {
    },
    created() {
        this.element.style = {
            ...this.element.style,
            height: '30px',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '5px',
            paddingBottom: '5px',
        }
    },
    mounted() {}
}
</script>

<style>
</style>