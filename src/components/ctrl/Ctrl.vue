<template>
    <div class="Ctrl" v-if="$P.store.focus[0]">
        <div class="flex-box">
            <p @click="changTab(1)">页面属性</p>
            <p @click="changTab(2)">元素属性</p>
            <p @click="changTab(3)">数据</p>
            <p @click="changTab(4)">事件</p>
        </div>

        <div v-show="tab === 1">
            <p v-for="(v, k) in $P.getPage().style" :key="k">
                <span>{{TRANSLATE_ENUM[k]}}</span>
                <input type="text" v-model="$P.getPage().style[k]">
            </p>
            <p v-for="(v, k) in $P.store.pageConfig" :key="k">
                <span>{{TRANSLATE_ENUM[k]}}</span>
                <input type="text" v-model="$P.store.pageConfig[k]">
            </p>
            <p>
                <span>开启登录功能</span>
                <input type="text" :key="$route.name" v-model="$P.getPage().isLogin">
            </p>
            <!-- 导航配置 -->
            <div v-if="$P.store.pageConfig.openNavMenuAble">
                <button @click="addNav()">addNav</button>
                <div v-for="submenu in $P.store.navConfig" :name="submenu.id" :key="submenu.id">
                    <input type="text" v-model="submenu.text">
                    <button @click="addChildMenu(submenu)">addChildMenu</button>
                    <div v-for="menuItem in submenu.menuItems" :name="submenu.id + '-' + menuItem.id" :key="submenu.id + '-' + menuItem.id">
                        名称 <input type="text" v-model="menuItem.text">
                        url <input type="text" v-model="menuItem.url">
                    </div>
                </div>
            </div>
        </div>

        <div v-show="tab === 2">
            <p v-if="$P.store.focus[0].name == 'IdeDiv'">
                <select v-model="componentName">
                    <option value="IdeDiv">IdeDiv</option>
                    <option value="IdeText">IdeText</option>
                    <option value="IdeImage">IdeImage</option>
                    <option value="IdeInput">IdeInput</option>
                    <option value="IdeButton">IdeButton</option>
                    <option value="IdeSelect">IdeSelect</option>
                </select>
                <button @click="addChildElement()">addChildElement</button>
            </p>

            <p v-for="(v, k) in $P.store.focus[0].style" :key="k">
                {{k}}
                <span>{{TRANSLATE_ENUM[k]}}</span>
                <input type="text" v-model="$P.store.focus[0].style[k]">
            </p>

            <p v-for="(v, k) in $P.store.focus[0].packStyle" :key="k">
                {{k}}
                <span>{{TRANSLATE_ENUM[k]}}</span>
                <input type="text" v-model="$P.store.focus[0].packStyle[k]">
            </p>
        </div>
        <div v-show="tab === 3">
            <div v-for="(v, k) in $P.store.focus[0].data" :key="k">
                <p v-if="k != 'options'">
                    <span>{{k}}</span>
                    <input type="text" v-model="$P.store.focus[0].data[k]">
                </p>
                <div v-if="k == 'options'">
                    <span>{{k}}</span><button @click="$P.store.focus[0].data[k].push({name: '', value: ''})">addOptions</button>
                    <p v-for="(options, index) in $P.store.focus[0].data[k]" :key="index">
                        名称:<input type="text" v-model="options.name">
                        <br/>
                        值:<input type="text" v-model="options.value">
                    </p>
                </div>
            </div>
        </div>
        <div v-show="tab === 4">
        </div>
        
    </div>
</template>

<script>
/**
 * 翻译枚举
 */
const TRANSLATE_ENUM = {
    "width": "宽",
    "height": "高",
    "background": "背景色",
    "color": "颜色",
    "fontSize": "字体尺寸",
    "zIndex": "字体尺寸",
    "borderLeft": "左边框",
    "borderRight": "右边框",
    "borderTop": "上边框",
    "borderBottom": "下边框",
    "border": "边框",
    "lineHeight": "行高",
    "paddingLeft": "左内边距",
    "paddingRight": "右内边距",
    "paddingTop": "上内边距",
    "paddingBottom": "下内边距",
    "marginLeft": "左外边距",
    "marginRight": "右外边距",
    "marginTop": "上外边距",
    "marginBottom": "下外边距",
    "borderRadius": "圆角",
    "position": "定位方式",
    "verticalAlign": "对齐方式",
    "displayWidth": "显示器宽度",
    "displayHeight": "显示器高度",
    "openNavMenuAble": "开启导航菜单",
    "openHeaderAble": "开启公共头部",
    "loginName": "登录页面",
    "isLogin": "登录页面",
}

export default {
  name: 'Ctrl',
  data() {
      return {
          TRANSLATE_ENUM,
          tab: 1,
          componentName: '',
      }
  },
  computed: {
  },
  methods: {
      changTab(tab) {
          this.tab = tab;
      },
      /**
       * 添加子元素
       */
      addChildElement() {
            this.$P.store.focus[0].addChildElement(this.componentName)
      },
      /**
       * 添加一级导航
       */
      addNav() {
          /**
           * 直接等于length 删除会有问题, 需要优化
           */
          this.$P.store.navConfig.push({
              id: this.$P.store.navConfig.length,
              text: '',
              menuItems: []
          })
      },
      addChildMenu(submenu) {
          submenu.menuItems.push({
              id: submenu.menuItems.length,
              url: '',
              text: ''
          })
      }
  },
  mounted() {
      
  }
}
</script>

<style scoped>
    .Ctrl {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 500px;
        border: 1px solid #ccc;
        background: #fff;
        z-index: 2;
        height: 300px;
        overflow: auto;
        text-align: left;
    }
    .flex-box {
        display: flex;
        justify-content: space-around;
        cursor: pointer;
    }
</style>
