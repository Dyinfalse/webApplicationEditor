<template>
    <div class="Ctrl" v-if="$C.store.focus.length > 0">
        当前激活了{{$C.store.focus.length}}个组件
        <p>基础属性</p>
        <p v-for="(v, k) in focusMap.base.$data" :key="k">
            <span>{{k}}</span>
            <input type="text" v-model="focusMap.base.$data[k]" name="">
        </p>
        <p>扩展属性</p>
        <p v-for="(v, k) in focusMap.extend.$data.style" :key="k">
            <span>{{TRANSLATE_ENUM[k]}}</span>
            <input type="text" v-model="focusMap.extend.$data.style[k]" name="">
        </p>
        <p>数据</p>
        <p v-for="(v, k) in focusMap.extend.$data.data" :key="k">
            <span>{{k}}</span>
            <input type="text" v-model="focusMap.extend.$data.data[k]" name="">
        </p>

        <p>事件</p>
        <Event :eventList="focusMap.event"/>
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
    "fontSize": "字体尺寸"
}

export default {
  name: 'Ctrl',
  components: { Event },
  data() {
      return {
          TRANSLATE_ENUM,
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
        width: 300px;
        border: 1px solid #ccc;
        background: #fff;
    }
</style>
