<template>
    <div class="flex-box content">
        <Menu :active-name="$router.currentRoute.name" :theme="'dark'">
            <!-- <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    内容管理
                </template>
                <Menu-item name="1-1">文章管理</Menu-item>
                <Menu-item name="1-2">评论管理</Menu-item>
                <Menu-item name="1-3">举报管理</Menu-item>
            </Submenu> -->
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
<style scoped>
    .content {
        height: 100%;
    }
</style>