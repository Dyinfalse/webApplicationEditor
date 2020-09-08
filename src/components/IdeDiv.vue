<template>
    <div class="component-div" :style="styleConfig" @click="setFocus()">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'IdeDiv',
    props: {
        uuid: {
            type: String,
            default: ''
        },
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
        setFocus() {
            this.$P.setFocus(this.uuid);
        }
    },
    created() {
        
    },
    mounted() {}
}
</script>

<style>
</style>