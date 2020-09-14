<template>
  <div class="home">
    <div>
      <select v-model="componentName">
        <option value="IdeDiv">IdeDiv</option>
      </select>
      <button @click="addComponent()" style="margin-right: 20px">add</button>
      <button @click="removeComponent()">remove</button>
    </div>
    <div style="overflow:hidden">
      <Ruler :pageStyle="page.style" :VueComponent='page.elements'></Ruler>
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
      this.page.addElement(this.componentName);
    }
  },
  created() {
    console.log('BaseView 挂载');
    this.page = this.$P.getPage(this.$router.currentRoute.fullPath);
  },
  mounted() {
    
  }
}
</script>
