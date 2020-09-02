<template>
  <div class="Preview" :style="style">
    <keep-alive>
      <router-view :key="$route.fullPath"/>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'Preview',
  components: { },
  data() {
    return {
      defaultWidth: 1920,
      defaultHeight: 1080,
      style: {
        transform: ''
      }
    }
  },
  created(){
    let { scrollWidth, scrollHeight } = document.documentElement;
    let scaleW = scrollWidth / this.defaultWidth;
    let scaleH = scrollHeight / this.defaultHeight;
    this.style.transform = 'scale('+ scaleW +', '+ scaleH +')';
  },
  methods: {
  }
}
</script>
<style>
  .Preview {
    position: relative;
    transform-origin: 0 0;
  }
</style>
