<template>
  <div class="home">
    <h1>组件列表</h1>

    <div>
      <button @click="components.push($C.pack('Input'))" style="margin-right: 20px">add</button>
      <button @click="components.shift()">remove</button>
    </div>

    <component v-for="(item) in components" :key="item.id" :id="item.name" :is="item.name"/>
    
  </div>
</template>

<script>
import Ctrl from '../components/Ctrl';

export default {
  name: 'Home',
  components: { Ctrl },
  data() {
    return {
      components: [ "HelloWorld" ]
    }
  },
  created() {
    this.$C.install(this.components);
    this.components = this.$C.pack(this.components);
    /**
     * 定时删除组件
     * 模拟拖拽增加组件
     */
    setTimeout(()=> {
      this.$C.install(["Input"]) && this.components.push(this.$C.pack("Input"));
      /**
       * 组件删除
       */
      // this.components.shift();
    }, 2000)
  }
}
</script>
