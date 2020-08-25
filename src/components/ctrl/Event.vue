<template>
    <div class="Event" v-if="$C.store.focus.length > 0">
        <p v-if="isRoot">事件 <button @click="addEvent()">addEvent</button></p>
        <div v-for="(fitem, index) in eventList" :key="fitem.id">
            <p>
                {{(isRoot ? '' : '子') + fitem.id}}事件类型
                <select v-model="fitem.type" @change="domEventType(fitem)">
                    <option :value="v" v-for="(v, k) in events" :key="k">{{v.name}}</option>
                </select>
            </p>
            <div v-if="fitem.instance">
                <p v-if="isRoot">
                    触发方式
                    <select v-model="fitem.instance.action">
                        <!-- 目前是获取整个实例的所有组件实例 -->
                        <option :value="e" v-for="(e, index) in domEventList" :key="index">{{e}}</option>
                    </select>
                </p>
                <!-- 路由事件配置项 -->
                <p v-if="fitem.instance.hasOwnProperty('path')">
                    目标路径
                    <select v-model="fitem.instance.path" @change="pathChange(fitem.instance.path)">
                        <!-- 目前是获取整个实例的所有组件实例 -->
                        <option :value="p.path" v-for="p in allPath" :key="p.path">{{p.name}}</option>
                    </select>
                </p>
                <!-- 函数调用事件配置项 -->
                <p v-if="fitem.instance.hasOwnProperty('target')">
                    目标元素
                    <select v-model="fitem.instance.target" @change="targetChange(fitem.instance.target)">
                        <!-- 目前是获取整个实例的所有组件实例 -->
                        <option :value="v.extend" v-for="(v, k) in $C.componentsUuidMap" :key="k">{{v.name}}</option>
                    </select>
                </p>
                <p v-if="fitem.instance.hasOwnProperty('functionName')">
                    方法名称
                    <select v-model="fitem.instance.functionName">
                        <option :value="f" v-for="(f, index) in functionList" :key="index">{{f}}</option>
                    </select>
                </p>
                <!-- Http事件 -->
                <p v-if="fitem.instance.hasOwnProperty('method')">
                    请求方法
                    <select v-model="fitem.instance.method">
                        <option value="POST">POST</option>
                        <option value="GET">GET</option>
                    </select>
                </p>
                <p v-if="fitem.instance.hasOwnProperty('url')">
                    请求地址
                    <select v-model="fitem.instance.url">
                        <option value="http://app.cloud_nide.ys.com:9190/us_ViewUsforAppActioncheckUserId.do">验证服务</option>
                        <option value="http://app.cloud_nide.ys.com:9190/us_UserLoginInAction.do">用户信息服务</option>
                    </select>
                </p>
                <div v-if="fitem.instance.hasOwnProperty('data')">
                    请求参数
                    <p v-for="field in fitem.instance.data" :key="field.id">
                        key: <input style="width: 50px" type="text" v-model="field.key">
                        val: <input style="width: 50px" type="text" v-model="field.value">
                    </p>
                    <button @click="fitem.instance.data.push({id: fitem.instance.data.lenhgth,key: '', value: ''})">addField</button>
                </div>
            </div>

            <button v-if="isRoot" @click="bind(fitem)">bind</button>
            <button v-if="isRoot" @click="unbind(fitem)">unbind</button>
            <button @click="removeEvent(fitem, index)">remove</button>
            <button @click="addChildrenEvent(fitem)">add children</button>

            <Event :eventList="fitem.childrenEvent" :isRoot="false" />
        </div>
    </div>
</template>

<script>
import Events from '../../event';
/**
 * 事件面板递归组件
 */
export default {
  name: 'Event',
  props: {
      /**
       * 事件 list
       */
      eventList: {
          type: Array,
          default: () => []
      },
      /**
       * 是否为根节点
       */
      isRoot: {
          type: Boolean,
          default: true
      }
  },
  data() {
      return {
          /**
           * src/event/ 提供的事件类
           */
          events: Events,
          /**
           * 浏览器支持的所有事件
           */
          domEventList: [],
          /**
           * 目标元素所有暴露的方法
           */
          functionList: [],
          /**
           * 所有新增路由
           */
          allPath: [],
      }
  },
  computed: {
      focusMap () {
            /**
             * 设置函数名称选项
             */
            this.targetChange(this.$C.getFocusUuidMap()[0].extend);
            return this.$C.getFocusUuidMap()[0];
      }
  },
  methods: {
    /**
     * 选择事件
     */
    domEventChange(eventName) {
        
    },
    /**
     * 获取事件列表
     */
    getDomEventList() {
        let arr = [];
        for(let e in document) { arr.push(e) }
        return arr.filter(function(i){return i.substring(0,2)=='on' && (document[i] == null || typeof document[i] == 'function');});
    },
    /**
     * 修改目标元素的时候同步目标元素抛出的方法
     */
    targetChange(t) {
        this.functionList = this.$C.componentsUuidMap[t.$parent.uuid].function;
    },
    /**
     * 选择路径
     */
    pathChange() {
        
    },
    /**
     * 增加事件
     */
    addEvent() {
        this.eventList.push({
            id: this.eventList.length,
            type: '',
            instance: null,
            childrenEvent: []
        })
    },
    /**
     * 添加子事件
     */
    addChildrenEvent(fitem) {
        fitem.childrenEvent.push({
            id: fitem.id + '-' + fitem.childrenEvent.length,
            type: '',
            instance: null,
            childrenEvent: []
        })
    },
    /**
     * 选中方法名称, 绑定事件, 包括子事件
     */
    bind(fitem) {
        fitem.instance && fitem.instance.bind(fitem);
    },
    /**
     * 解绑事件
     */
    unbind(fitem){
        fitem.instance && fitem.instance.unbind();
    },
    /**
     * 删除事件, 同时删除映射关系
     */
    removeEvent(fitem, index){
        this.unbind(fitem);
        this.eventList.splice(index, 1);
    },
    /**
     * 选择事件类型
     * 实例化事件类, 开始配置
     */
    domEventType(fitem) {
        if(fitem.instance) this.unbind(fitem);

        fitem.instance = new fitem.type();
        /**
         * 目前固定触发元素是当前激活元素
         */
        fitem.instance.source = this.focusMap.extend;
        /**
         * 设置默认目标为当前元素
         */
        if(fitem.instance.hasOwnProperty('target')){
            fitem.instance.target = this.focusMap.extend;
        }
    }
  },
  mounted() {
      /**
       * 设置事件名称选项
       */
      this.domEventList = this.getDomEventList();
      /**
       * 获取所有路由信息
       */
      this.allPath = this.$P.getAllRouterInfo();
  }
}
</script>

<style scoped>
</style>
