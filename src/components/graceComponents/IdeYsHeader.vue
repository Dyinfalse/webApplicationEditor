
<template>
    <div class="flex-box content">
        <div class="header">
            <div class="header-tab">
                <HeaderTabs></HeaderTabs>
            </div>
            <div class="header-users" id="UserBox">
                <YsHeader :nowLoginUser="nowLoginUser" @on-logOut="OnLogOut"></YsHeader>
            </div>
        </div>
    </div>
</template>
<script>
import { SysAction } from "@/utils/ys_systemInit"
import YsHeader from './header/YsHeader';
import HeaderTabs from './header/HeaderTabs';
export default {
    name: 'IdeYsHeader',
    components: { YsHeader, HeaderTabs },
    data () {
        return {
            nowLoginUser: "", // 当前登录人
        }
    },
    computed: {
        
    },
    methods: {
      OnLogOut() {
        SysAction.userLoginOut(() => {
          this.$router.push({
            path: "/login"
          })
        });
      }
    },
    created() {
        
    },
    mounted() {
        this.nowLoginUser = 'test';
    }
}
</script>
<style scoped lang="less">
    .content {
        height: 100%;
        display: flex;
        background-color: #29364e;
        border-bottom: 1px solid black;
        padding: 0;

        .header {
            height: 100%;
            width: 100%;
            padding: 0 10px 0 5px;
            display: flex;
            justify-content: flex-end;

            .header-tab {
                flex: 1;
            }
        }
    }
</style>