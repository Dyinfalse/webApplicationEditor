<template>
  <div class="home">
    <h1>页面列表</h1>

    <div>
      <button @click="addView()" style="margin-right: 20px">add</button>
      <button @click="removeView()">remove</button>
    </div>
    
    <div style="display: flex">
        <div style="margin-right: 20px;" v-for="(r, index) in router[1].children" :key="r.path" @click="toUrl(r, index)">{{r.path}}</div>
    </div>

    <keep-alive>
      <router-view :key="$route.fullPath"/>
    </keep-alive>
    <Ctrl></Ctrl>
  </div>
</template>

<script>
import Ctrl from '../components/Ctrl';
import BaseView from './BaseView';

export default {
  name: 'Home',
  components: { Ctrl },
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
      addView() {
          let newPath = this.$P.addPage();
          this.$router.push(newPath);
      },
      removeView() {

      },
      toUrl(router, index) {
          this.$router.push("/pageCtrl/baseView_" + index);
      }
  }
}
</script>
