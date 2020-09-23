<template>
    <div class="flex-box content">
        <div class="left">
            <div class="logo"></div>
            <Menu v-if="$P.store.pageConfig.openNavMenuAble && !$P.getPage().isLogin" :accordion="true" :active-name="$router.currentRoute.name" >
                <Submenu v-for="submenu in $P.store.navConfig" :name="submenu.id" :key="submenu.id">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        {{submenu.text}}
                    </template>
                    <Menu-item :to="'/designer/' + menuItem.url" v-for="menuItem in submenu.menuItems" :name="menuItem.url" :key="menuItem.url">{{menuItem.text}}</Menu-item>
                </Submenu>
            </Menu>
        </div>
        <div class="flex">
            <IdeYsHeader v-if="$P.store.pageConfig.openHeaderAble && !$P.getPage().isLogin"></IdeYsHeader>
            <router-view :key="$route.fullPath"/>
        </div>
    </div>
</template>
<script>
import IdeYsHeader from './IdeYsHeader';
export default {
    name: 'NavMenu',
    components: { IdeYsHeader },
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

        .left {
            .logo {
                height: 67px;
            }
            .ivu-menu {
                background: #1f293d;
            }

            background: #1f293d;
        }
    }
</style>