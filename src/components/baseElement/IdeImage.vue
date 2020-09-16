<template>
    <img :style="element.style" :src="src" />
</template>

<script>
export default {
    name: 'IdeImage',
    props: {
        element: {
            type: Object,
            default: () => {return {}}
        }
    },
    data() {
        return {
            src: 'https://cn.bing.com/th?id=OHR.CityofGuanajuato_ZH-CN7559565626_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0'
        }
    },
    methods: {
    },
    created() {
    },
    mounted() {}
}
</script>

<style>
</style>