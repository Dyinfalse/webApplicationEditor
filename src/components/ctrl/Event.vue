<template>
    <div class="Event" v-if="$C.store.focus.length > 0">
        <p v-if="isRoot">事件树 <button @click="addEvent()">addEvent</button></p>
        <div :class="isRoot ? 'root-event': 'event-item'" v-for="(fitem, index) in eventList" :key="fitem.id">
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
                        <option value="http://">外部连接</option>
                        <option :value="p.path" v-for="p in allPath" :key="p.path">{{p.name}}</option>
                    </select>
                </p>
                <p v-if="fitem.instance.path == 'http://'">
                    外部连接
                    <input type="text" v-model="fitem.instance.link">
                </p>
                <!-- 函数调用事件配置项 -->
                <p v-if="fitem.instance.hasOwnProperty('target')">
                    目标元素
                    <i-select v-model="fitem.instance.target" style="width: 100px" @on-change="targetChange(fitem)">
                        <!-- 目前是获取整个实例的所有组件实例 -->
                        <i-option @mouseenter.native="selectedComponent(k)" @mouseleave.native="clearSelected(k)" :value="k" v-for="(v, k) in $C.componentsUuidMap" :key="k">{{v.name}}</i-option>
                    </i-select>
                </p>
                <p v-if="fitem.instance.hasOwnProperty('functionName')">
                    方法名称
                    <select v-model="fitem.instance.functionName">
                        <option :value="f" v-for="(f, index) in fitem.functionList" :key="index">{{f}}</option>
                    </select>
                </p>
                <div v-if="fitem.instance.hasOwnProperty('functionName')">
                    方法参数 <button @click="fitem.instance.paramList.push({id: fitem.instance.paramList.length, value: '', mapping: 'unMapping', mappingKey: ''})">addParam</button>
                    <p v-for="param in fitem.instance.paramList" :key="param.id">
                        <SelectMapping :hasKey="false" :set="param" />
                    </p>
                </div>
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
                    请求参数 <button @click="fitem.instance.data.push({id: fitem.instance.data.length, key: '', value: '', mapping: 'unMapping', mappingKey: ''})">addField</button>
                    <p v-for="field in fitem.instance.data" :key="field.id">
                        <SelectMapping :set="field" />
                    </p>
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
import { Events } from '../../event';
import SelectMapping from './SelectMapping';
/**
 * 事件面板递归组件
 */
export default {
  name: 'Event',
  components: { SelectMapping },
  props: {
      /**
       * 事件 list
       */
      eventList: {
          type: Array,
          default: () => {
            return [];
          }
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
        if(t.instance.target){
            t.functionList = this.$C.componentsUuidMap[t.instance.target].function;
        }
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
            fitem.instance.target = this.focusMap.base.uuid;
            this.targetChange(fitem)
        }
    },
    /**
     * 选中组件
     */
    selectedComponent(uuid){
        this.$C.setActiveComponent(uuid);
    },
    clearSelected() {
        this.$C.clearActiveComponent();
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
    /**
     * 设置函数名称选项
     */
    this.eventList.map(e => {
        this.targetChange(e);
    })
  }
}
</script>

<style scoped>

.Event .event-item {
    border: 1px solid #ccc;
    margin: 5px 0px 5px 20px;
    padding: 5px;
}
.Event .root-event {
    border: 1px solid #ccc;
    margin: 5px;
    padding: 5px;
}
</style>
