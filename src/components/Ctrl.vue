<template>
    <div class="Ctrl" v-if="$C.stroe.focus.length > 0">
        当前激活了{{$C.stroe.focus.length}}个组件
        <p>基础属性</p>
        <p v-for="(v, k) in baseStyle" :key="k">
            <span>{{TRANSLATE_ENUM[k]}}</span>
            <input type="text" v-model="baseStyle[k]" name="">
        </p>
        <p>扩展属性</p>
        <p v-for="(v, k) in extendStyle" :key="k">
            <span>{{TRANSLATE_ENUM[k]}}</span>
            <input type="text" v-model="extendStyle[k]" name="">
        </p>
        <p>数据</p>
        <p v-for="(v, k) in dataMap" :key="k">
            {{k}}
        </p>
        <p>事件</p>
        <p v-for="(v, k) in functionMap" :key="k">
            
        </p>
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
    "fontSize": "字体尺寸"
}

export default {
  name: 'Ctrl',
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
      baseStyle () {
          return this.$C.getFocusUuidMap()[0].base.$data.style;
      },
      extendStyle () {
          return this.$C.getFocusUuidMap()[0].extend.$data.style;
      },
      functionMap() {
          return this.$C.getFocusUuidMap()[0].function;
      },
      dataMap() {
          return {}
      }
  },
  methods: {
      addEvent() {
        // {
        //     source: Vue,
        //     type: "click",
        //     target: vue,
        //     functionName: "add"
        // }
        // source.$refs['pack'].addEventListener(type, function() {
        //     target.functionName();
        // })
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
        width: 300px;
        border: 1px solid #ccc;
    }
</style>
