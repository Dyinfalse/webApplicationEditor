<template>
    <div class="Ctrl" v-if="$C.stroe.focus.length > 0">
        当前激活了{{$C.stroe.focus.length}}个组件
        <p>基础属性</p>
        <p v-for="(v, k) in baseStyle" :key="k">
            <span>{{TRANSLATE_ENUM[k]}}</span>
            <input type="text" v-model="baseStyle[k]" name="" id="">
        </p>
        <p>扩展属性</p>
        <p v-for="(v, k) in extendStyle" :key="k">
            <span>{{TRANSLATE_ENUM[k]}}</span>
            <input type="text" v-model="extendStyle[k]" name="" id="">
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
          return this.$C.getFocusUuidMap()[0].base.style;
      },
      extendStyle () {
          return this.$C.getFocusUuidMap()[0].extend.style;
      }
  },
  methods: {
      
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
