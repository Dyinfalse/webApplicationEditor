<template>
    <div class="Image" :style="{
          fontSize: style.fontSize + 'px',
          color: style.color
        }">
      <img :src="data.src" alt="">
    </div>
</template>

<script>

export default {
  name: 'IdeImage',
  data() {
    return {
      timer: '',
      style: {
        
      },
      data: {
        src: require('../assets/loginbg.png'),
      }
    }
  },
  methods: {
      
  },
  mounted(){
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Image {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.Image img {
  width: 100%;
  height: 100%;
}
</style>
