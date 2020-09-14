<template>
    <div
        class="pack"
        :style="{
            display: element.isBlock ? 'blcok' : 'inline-block',
            width: element.style.width,
            height: element.style.height
        }"
        @click="setFocus">
        <slot></slot>
    </div>
</template>

<script>
/**
 * 包装组件
 */
export default {
    name: 'Pack',
    props: {
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
        setFocus(e) {
            e.stopPropagation();
            this.$P.setFocus(this.element);
        }
    },
    created() {
    },
    mounted() {
        
    }
}
</script>

<style>
</style>