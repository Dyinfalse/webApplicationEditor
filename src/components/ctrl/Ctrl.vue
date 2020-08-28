<template>
    <div class="Ctrl" v-if="focusMap">
        <div class="flex-box">
            <p @click="changTab(1)">基础属性</p>
            <p @click="changTab(2)">扩展属性</p>
            <p @click="changTab(3)">数据</p>
            <p @click="changTab(4)">事件</p>
        </div>

        <div v-show="tab === 1">
            <div v-for="(v, k) in focusMap.base.$data.baseStyle" :key="k">
                <span>{{k}}</span>
                <input type="text" v-model="focusMap.base.$data.baseStyle[k]" name="" />
            </div>
        </div>

        <div v-show="tab === 2">
            <p v-for="(v, k) in focusMap.extend.$data.style" :key="k">
                <span>{{TRANSLATE_ENUM[k]}}</span>
                <input type="text" v-model="focusMap.extend.$data.style[k]" name="">
            </p>
        </div>
        <div v-show="tab === 3">
            <p v-for="(v, k) in focusMap.extend.$data.data" :key="k">
                <span>{{k}}</span>
                <input type="text" v-model="focusMap.extend.$data.data[k]" name="">
            </p>
        </div>
        
        <div v-show="tab === 4">
            <Event :eventList="focusMap.event"/>
        </div>
    </div>
</template>

<script>
import Events from '../../event';
import Event from './Event';
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
    "lineHeight": "行高",
    "paddingLeft": "左内边距",
    "paddingRight": "右内边距",
    "paddingTop": "上内边距",
    "paddingBottom": "下内边距",
    "marginLeft": "左外边距",
    "marginRight": "右外边距",
    "marginTop": "上外边距",
    "marginBottom": "下外边距",
    "borderRadius": "圆角"
}

export default {
  name: 'Ctrl',
  components: { Event },
  data() {
      return {
          TRANSLATE_ENUM,
          tab: 1,
          base: {
              
          },
          extend: {

          }
      }
  },
  computed: {
      focusMap () {
        return this.$C.getFocusUuidMap()[0];
      }
  },
  methods: {
      changTab(tab) {
          this.tab = tab;
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
