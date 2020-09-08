<template>
  <div class="PageCtrl">
    <!-- <h1>页面列表</h1> -->

    <div>
      <button @click="save()">save</button>
      <button @click="addView()" style="margin-right: 20px">add</button>
      <button @click="removeView()">remove</button>
      <button @click="printConfig()">print</button>
    </div>
    
    <div style="display: flex">
        <div style="margin-right: 20px;" v-for="(r, index) in router[2].children" :key="r.path" @click="toUrl(r, index)">{{r.path}}</div>
    </div>

      <!-- 
        使用name是因为预览和设计的时候name是保持一致的,
        所以在预览和设计之间切换的时候, 不会触发原组件的重新挂载(如果重新挂载,会导致资源浪费,并且会出错误)
      -->
      <router-view :key="$route.fullPath"/>
    <Ctrl></Ctrl>
  </div>
</template>

<script>
import Ctrl from '../components/ctrl/Ctrl';

export default {
  name: 'Designer',
  components: { Ctrl },
  data() {
    return {
        router: []
    }
  },
  created() {
      this.router = this.$router.options.routes;
  },
  methods: {
    save() {
    },
    addView() {
      this.$P.addPage();
    },
    removeView() {
    },
    toUrl(router, index) {
        this.$router.push("/designer/" + router.path);
    },
    /**
     * 打印配置
     */
    printConfig() {
      console.log(this.$P.toJson())
    }
  }
}
</script>
