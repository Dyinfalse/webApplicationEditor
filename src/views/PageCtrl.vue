<template>
  <div class="PageCtrl">
    <!-- <h1>页面列表</h1> -->

    <div>
      <button @click="save()">save</button>
      <button @click="addView()" style="margin-right: 20px">add</button>
      <button @click="removeView()">remove</button>
      <button @click="preview()">preview</button>
    </div>
    
    <div style="display: flex">
        <div style="margin-right: 20px;" v-for="(r, index) in router[1].children" :key="r.path" @click="toUrl(r, index)">{{r.path}}</div>
    </div>

    <keep-alive>
      <!-- 
        使用name是因为预览和设计的时候name是保持一致的,
        所以在预览和设计之间切换的时候, 不会触发原组件的重新挂载(如果重新挂载,会导致资源浪费,并且会出错误)
      -->
      <router-view :key="$route.name"/>
    </keep-alive>
    <Ctrl></Ctrl>
  </div>
</template>

<script>
import Ctrl from '../components/ctrl/Ctrl';

export default {
  name: 'PageCtrl',
  components: { Ctrl},
  data() {
    return {
        components: [ "HelloWorld" ],
        router: []
    }
  },
  created() {
      this.router = this.$router.options.routes;
  },
  methods: {
    save() {
      this.$P.save();
      this.$C.save();
    },
    addView() {
      let newPath = this.$P.addPage();
      this.$router.push(newPath);
    },
    removeView() {
        this.$P.removePage(this.$router.currentRoute.name);
    },
    toUrl(router, index) {
        this.$router.push("/pageCtrl/" + router.path);
    },
    /**
     * 预览方法
     */
    preview(){
      /**
       * 同步路由到预览
       */
      this.$P.preview();
      this.$C.preview();
    }
  }
}
</script>
