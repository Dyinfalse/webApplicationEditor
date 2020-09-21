<template>
  <div class="home">
    <div>
      <select v-model="componentName">
        <option value="IdeDiv">IdeDiv</option>
        <option value="IdeText">IdeText</option>
        <option value="IdeImage">IdeImage</option>
        <option value="IdeInput">IdeInput</option>
        <option value="IdeButton">IdeButton</option>
        <option value="IdeSelect">IdeSelect</option>
        <option value="IviewTable">IviewTable</option>
      </select>
      <button @click="addComponent()" style="margin-right: 20px">add</button>
      <button @click="removeComponent()">remove</button>
    </div>
    <div style="overflow:hidden">
      <Ruler></Ruler>
    </div>
  </div>
</template>

<script>
import Ruler from '@/components/edit-web-components/Ruler';

export default {
  name: 'BaseView',
  components: { Ruler },
  data() {
    return {
        components: [],
        cList: [],
        componentName: '',
        page: {}
    }
  },
  methods: {
    addComponent() {
      this.$P.getPage().addElement(this.componentName);
    },
    /**
     * 组件删除
     */
    removeComponent(){
      /**
       * 删除选中
       */
      this.$P.removeFocus();
    }
  },
  created() {
    console.log('BaseView 挂载');
  },
  mounted() {
    
  }
}
</script>
