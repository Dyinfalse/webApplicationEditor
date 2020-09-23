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
        /**
         * 组件渲染的时候, 将组件实例和element实例做引用交换
         */
        for(let k in this.element.data){
            this.$children[0].$data[k] = this.element.data[k]
        }
        this.element.data = this.$children[0].$data;
    }
}
</script>

<style scoped>
.pack {
    box-sizing: border-box;
    overflow: hidden;
    background: rgb(43, 52, 79);
}
.focus {
    border: 2px dashed #fff;
}
</style>