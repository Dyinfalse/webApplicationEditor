<template>
    <div
        :class="(element.isFocus ? 'focus' : '') + ' pack'"
        :style="{
            display: element.isBlock ? 'blcok' : 'inline-block',
            width: element.style.width,
            height: element.style.height,
            position: element.packStyle.position,
            left: element.packStyle.left,
            right: element.packStyle.right,
            top: element.packStyle.top,
            bottom: element.packStyle.bottom,
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

<style scoped>
.focus {
    border: 2px dashed #000;
    box-sizing: border-box;
    overflow: hidden;
}
</style>