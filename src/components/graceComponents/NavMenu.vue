<template>
    <div class="flex-box content">
        <Menu :active-name="$router.currentRoute.name" :theme="'dark'">
            <Submenu v-for="submenu in $P.store.navConfig" :name="submenu.id" :key="submenu.id">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    {{submenu.text}}
                </template>
                <Menu-item :to="'/designer/' + menuItem.url" v-for="menuItem in submenu.menuItems" :name="menuItem.url" :key="menuItem.url">{{menuItem.text}}</Menu-item>
            </Submenu>
        </Menu>
        <div class="flex">
            <router-view :key="$route.fullPath"/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'NavMenu',
        data () {
            return {
            }
        },
        computed: {

        },
        methods: {
            
        },
        created() {
            
        },
        mounted() {

        }
    }
</script>
<style scoped lang="less">
    .content {
        height: 100%;
    }
</style>