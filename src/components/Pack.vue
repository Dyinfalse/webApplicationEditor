<template>
    <div class="component-box" ref="pack" :style="{
        width: style.width + 'px',
        height: style.height + 'px',
        background: style.background
    }" @click="focus()">
    
        <slot></slot>
    </div>
</template>

<script>
/**
 * 包装组件
 * 
 * 提供: 聚焦, 多个同时聚焦, 拖拽, 缩放, 组件的基本默认配置由该组件消化
 * 
 * 额外功能需要组件监控
 */
export default {
    name: 'Pack',
    props: {
        uuid: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            style: {
                width: 100,
                height: 100,
                background: '#ccc'
            }
        }
    },
    // beforeDestroy(){
    //     this.$C.deleteUuidMap(this.Uuid);
    // },
    methods: {
        focus() {
            /**
             * 生成组件的配置信息
             */
            this.$C.setFocus([this.uuid]);
        }
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
            ...this.$C.componentsUuidMap[this.uuid].extend.$data.style
        }
        this.style = {
            ...this.style,
            ...this.$C.componentsUuidMap[this.uuid].base.$data.style
        }
        /**
         * 同步引用
         */
        this.$C.addComponentsUuidMap(this.uuid, {
            name: this.$children[0].$attrs.id,
            base: this,
            extend: this.$children[0]
        })
    }
}
</script>

<style>
    .component-box {
        width: 100px;
        height: 100px;
        float: left;
        border: 1px solid #ccc;
        margin-right: 10px;
    }
</style>