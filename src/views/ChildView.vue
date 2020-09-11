<template>
  <div class="home">
    <div>
        子页面
    </div>
    <div style="overflow:hidden">
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChildView',
  components: {  },
  data() {
    return {
    }
  },
  methods: {
  },
  created() {
    
  },
  mounted() {
    console.log('子页面挂载')
  }
}
</script>
<style>
.home {
    font-size: 20px;
}
</style>