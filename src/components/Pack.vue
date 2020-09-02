<template>
    <div class="component-box" ref="pack" :style="{
            width: baseStyle.width + 'px',
            height: baseStyle.height + 'px',
            left: baseStyle.left + 'px',
            top: baseStyle.top + 'px',
            zIndex: baseStyle.zIndex,
        }">
        <slot></slot>
    </div>
</template>

<script>
/**
 * 包装组件
 * 额外功能需要组件监控
 */
export default {
    name: 'Pack',
    props: {
        uuid: {
            type: String,
            default: ''
        },
        baseStyle: {
            type: Object,
            default: () => {return {}}
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
    },
    created() {
    },
    mounted() {
        if(!this.uuid) throw "缺少必要的uuid";
        /**
         * 初始化
         */
        this.$children[0].$data.style = {
            ...this.$children[0].$data.style,
            ...this.$C.__componentsUuidMap[this.uuid].extend.$data.style
        }
        this.style = {
            ...this.style,
            ...this.$C.__componentsUuidMap[this.uuid].base.$data.style
        }
        this.$children[0].$data.data = {
            ...this.$children[0].$data.data,
            ...this.$C.__componentsUuidMap[this.uuid].extend.$data.data
        }
        /**
         * 同步预览引用
         */
        this.$C.replacePreviewVue(this.uuid, {
            base: this,
            extend: this.$children[0]
        })
    }
}
</script>

<style>
    .component-box {
        position: absolute;
    }
</style>