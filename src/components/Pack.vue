<template>
    <div
        :class="(element.isFocus ? 'focus' : '') + ' pack'"
        :style="{
            display: element.isBlock ? 'block' : 'inline-block',
            width: element.style.width,
            height: element.style.height,
            ...element.packStyle
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
        this.element.data = this.$children[0].$data;
    }
}
</script>

<style scoped>
.pack {
    box-sizing: border-box;
    overflow: hidden;
}
.focus {
    border: 2px dashed #000;
}
</style>