<template>
  <div class="userbox">
    <span class="YS-block">
      <i class="ys-common-iconFont iconfont ys-icontongzhi"></i>
    </span>
    <span class="YS-block">
      <span>
        <ThemeCut></ThemeCut>
      </span>
    </span>
    <span class="blockname ys-common-FontColor" :title="nowLoginUser">{{ nowLoginUser }}</span>
    <Dropdown class="User" trigger="hover" placement="bottom-end">
      <div class="UserImg">
        <img src="./img/userimg.png" alt="" />
      </div>
      <DropdownMenu slot="list">
        <DropdownItem @click.native="LogOut">退出登1录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
  import ThemeCut from "./ThemeCut";
  export default {
    name: "YsHeader",
    components: {
      ThemeCut
    },
    props: {
      nowLoginUser: {
        type: String,
        default: "远舢科技"
      }
    },
    methods: {
      LogOut() {
        this.$emit("on-logOut");
      }
    }
  }

</script>
<style lang="less" scoped>
  .userbox {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .YS-block {
      height: 30px;
      width: 25px;
      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      &>i {
        font-size: 20px;
      }

      span {
        color: #B8C1D0;
        font-size: 20px;
        cursor: pointer;
      }

      .messageinfo {
        cursor: pointer;
        color: #B8C1D0;
      }
    }

    .blockname {
      font-size: 16px;
      margin-right: 5px;
      font-family: DINbek-Bold, DINbek;
      font-weight: bold;
      max-width: 85px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .User {
      display: flex;
      align-items: center;
      justify-content: center;

      .UserImg {
        height: 36px;
        width: 36px;
        border-radius: 18px;
        cursor: pointer;

        img {
          cursor: pointer;
        }
      }
    }
  }

</style>
