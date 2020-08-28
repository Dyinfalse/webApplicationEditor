<template>
  <div class="home">
    <!-- <h1>{{cList.length}}组件列表</h1> -->
    <div>
      <select v-model="componentName">
        <option :value="c" v-for="c in $C.ALL_COMPONENTS" :key="c">{{c}}</option>
      </select>
      <button @click="addComponent()" style="margin-right: 20px">add</button>
      <button @click="removeComponent()">remove</button>
    </div>
    <div style="overflow:hidden">
      <ruler :VueComponent='cList'></ruler>
    </div>
  </div>
</template>

<script>
import ruler from '@/components/edit-web-components/view-urler';

export default {
  name: 'BaseView',
  components: { ruler},
  data() {
    return {
        components: [],
        cList: [],
        componentName: '',
    }
  },
  methods: {
      addComponent() {
        if(!this.componentName) return;
        let name = this.componentName;
        /**
         * 实例了一个组件之后, 需要增加其配置信息到映射里面
         */
        let v = this.$C.addComponentsUuidMap(name);
        /**
         * 挂载并渲染
         */
        this.$C.install([name]) && this.cList.push(v);
        /**
         * 增加到页面映射关系
         */
        this.$P.setPathUuidMap(this.$router.currentRoute.name, v.base.uuid);
      },
      removeComponent() {
        let uuids = this.$C.deleteUuidMap();
        this.$P.deletePathUuidMap(this.$router.currentRoute.name, uuids);
        for(let i = 0; i < this.cList.length; i++) {
          if(uuids.indexOf(this.cList[i].base.uuid) > -1) {
            this.cList.splice(i,1);
            i--;
          }
        }
      },
  },
  created() {

  },
  mounted() {
    let path = this.$router.currentRoute.name;
    
    if(this.$P.pathUuidMap[path]){
        this.cList = this.$P.pathUuidMap[path].map(uuid => this.$C.componentsUuidMap[uuid]);
        this.$C.install(this.cList.map(c => c.name));
    }
    console.log(this.cList)
    
    /**
     * 定时删除组件
     * 模拟拖拽增加组件
     */
    // setTimeout(()=> {
    //   this.$C.install(["Input"]) && this.components.push(this.$C.pack("Input"));
    //   /**
    //    * 组件删除
    //    */
    //   // this.components.shift();
    // }, 2000)
  }
}
</script>
