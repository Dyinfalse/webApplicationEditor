<template>
  <div class="home">
    <h1>{{cList.length}}组件列表</h1>

    <div>
      <button @click="addComponent()" style="margin-right: 20px">add</button>
      <button @click="removeComponent()">remove</button>
    </div>

    <!-- 禁止往Pack插入其他元素 -->
    <Pack v-for="item in cList" :uuid="item.base.uuid" :key="item.base.uuid">
      <component :id="item.name" :is="item.name"/>
    </Pack>
  </div>
</template>

<script>
import Ctrl from '../components/Ctrl';

export default {
  name: 'BaseView',
  components: { Ctrl },
  data() {
    return {
        components: [],
        cList: [],
    }
  },
  methods: {
      addComponent() {
            let name = 'Input';
            /**
             * 实例了一个组件之后, 需要增加其配置信息到映射里面
             */
            let v = this.$C.addComponentsUuidMap(name);
            /**
             * 挂载并渲染
             */
            this.$C.install([name]) && this.cList.push(v);
            /**
             * 增加到页面映射关系`
             */
            this.$P.setPathUuidMap(this.$router.currentRoute.name, v.base.uuid);
      },
      /**
       * 删除选中的元素
       */
      removeComponent() {
        for(let i = 0; i < this.cList.length; i++) {
          if(this.$C.stroe.focus.indexOf(this.cList[i].base.uuid) > -1) {
            this.cList.splice(i,1);
            i--;
          }
        }
      },
  },
  created() {
  },
  mounted() {
    
  }
}
</script>
