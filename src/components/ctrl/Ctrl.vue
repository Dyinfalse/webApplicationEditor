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
        </div>

        <div v-show="tab === 2">
            <p>
                <select v-model="componentName">
                    <option value="IdeDiv">IdeDiv</option>
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
    "position": "定位方式"
}

export default {
  name: 'Ctrl',
  data() {
      return {
          TRANSLATE_ENUM,
          tab: 1,
          componentName: ''
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
