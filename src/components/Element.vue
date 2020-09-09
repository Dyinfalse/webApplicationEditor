<template>
    <Pack :element="element">
        <component
            :id="element.name"
            :is="element.name"
            :styleConfig="element.style"
            :element="element"
            :uuid="element.uuid">

            <Element v-for="item in element.childElement" :element="item" :key="item.key"></Element>
        </component>
    </Pack>
</template>

<script>
import Pack from './Pack';
/**
 * 递归元素组件
 */
export default {
    name: 'Element',
    components: { Pack },
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
        
    },
    created() {
    },
    mounted() {
        console.log(this.element)
    }
}
</script>

<style>
</style>