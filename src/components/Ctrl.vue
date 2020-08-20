<template>
    <div class="Ctrl" v-if="$C.stroe.focus.length > 0">
        当前激活了{{$C.stroe.focus.length}}个组件
        <p>基础属性</p>
        <p v-for="(v, k) in focusMap.base.$data.style" :key="k">
            <span>{{TRANSLATE_ENUM[k]}}</span>
            <input type="text" v-model="focusMap.base.$data.style[k]" name="">
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
        <p>事件 <button @click="addEvent()">addEvent</button></p>
        <div v-for="(fitem, index) in focusMap.event" :key="fitem.id">
            <p>
                事件类型
                <select v-model="fitem.event" @change="eventChange(fitem.event)">
                    <option :value="e" v-for="(e, index) in eventList" :key="index">{{e}}</option>
                </select>
            </p>
            <p>
                目标元素
                <select v-model="fitem.target" @change="targetChange(fitem.target)">
                    <option :value="v.extend" v-for="(v, k) in $C.componentsUuidMap" :key="k">{{v.name}}</option>
                </select>
            </p>
            <p>
                方法名称
                <select v-model="fitem.name">
                    <option :value="f" v-for="(f, index) in functionList" :key="index">{{f}}</option>
                </select>
            </p>
            <button @click="functionChange(fitem)">bind</button>
            <button @click="unbind(fitem)">unbind</button>
            <button @click="removeEvent(fitem, index)">remove</button>
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
    "fontSize": "字体尺寸"
}

export default {
  name: 'Ctrl',
  data() {
      return {
          TRANSLATE_ENUM,
          eventList: [],
          functionList: [],
          base: {
              
          },
          extend: {

          }
      }
  },
  computed: {
      focusMap () {
            /**
             * 设置函数名称选项
             */
            this.targetChange(this.$C.getFocusUuidMap()[0].extend)
            return this.$C.getFocusUuidMap()[0];
      }
  },
  methods: {
      /**
       * 选择事件
       */
      eventChange(eventName) {
          console.log(this.focusMap.function)
      },
      /**
       * 获取事件列表
       */
      getEventList() {
          let arr = [];
          for(let e in document) { arr.push(e) }
          return arr.filter(function(i){return i.substring(0,2)=='on' && (document[i] == null||typeof document[i] == 'function');});
      },
      /**
       * 修改目标元素
       */
      targetChange(t) {
          this.functionList = this.$C.componentsUuidMap[t.$parent.uuid].function;
      },
      /**
       * 增加事件
       */
      addEvent() {
          this.focusMap.event.push({
              id: this.focusMap.event.length,
              name: '',
              target: this.focusMap.extend,
              event: ''
          })
      },
    /**
     * 选中方法名称, 绑定事件
     */
    functionChange(fitem) {
        if(fitem.event && fitem.name && fitem.target._isVue){
            this.focusMap.extend.$el.addEventListener(fitem.event.replace(/^on/, ''), fitem.target[fitem.name])
        }
    },
    /**
     * 解绑事件
     */
    unbind(fitem){
        if(fitem.event && fitem.name && fitem.target._isVue){
            this.focusMap.extend.$el.removeEventListener(fitem.event.replace(/^on/, ''), fitem.target[fitem.name])
        }
    },
    /**
     * 删除事件, 同时删除映射关系
     */
    removeEvent(fitem, index){
        this.unbind(fitem);
        this.focusMap.event.splice(index, 1);
    }
  },
  mounted() {
      /**
       * 设置事件名称选项
       */
      this.eventList = this.getEventList();
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
