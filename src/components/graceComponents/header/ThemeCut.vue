<template>
  <!-- 主题切换功能组件 -->
  <div class="ThemeCut">
    <Dropdown trigger="click">
      <span class="ys-common-iconFont iconfont icon-pifu"> </span>
      <DropdownMenu slot="list">
        <DropdownItem @click.native="cutTheme(item.id)" v-for="item in themeList" :key="item.id">
          <span class="themeblock" :style="{backgroundColor:item.themeColor}"></span>
          <span>主题{{item.id}}</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
  export default {
    name: "ThemeCut",
    data() {
      return {
        themeList: [{
          id: 1,
          themeColor: "#212F48"
        }, {
          id: 2,
          themeColor: "#FFB900"
        }],
        SelThemeId: 1,
      }
    },
    created() {},
    methods: {
      // 修改主题配置色
      cutTheme(index) {
        document.getElementsByTagName("body")[0].className = "theme" + index;
      }
    }
  }

</script>

<style scoped>
  @import '//at.alicdn.com/t/font_1935013_zt52o03wsi.css';

</style>
<style lang="less" scoped>
  .ThemeCut {
    height: 100%;
    width: 100%;
    position: relative;

    span {
      cursor: pointer;
    }

    .ys-common-iconFont {
      font-size: 20px;
    }

    .themeblock {
      display: inline-block;
      height: 18px;
      width: 18px;
      margin-right: 5px;
    }
  }

</style>
