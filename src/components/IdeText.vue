<template>
    <div class="Text" :style="{fontSize: style.fontSize + 'px', color: style.color}">
      <div>{{data.value}}</div>
    </div>
</template>

<script>

export default {
  name: 'IdeText',
  data() {
    return {
      style: {
        color: 0,
        fontSize: 20
      },
      data: {
        value: '默认数据',
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
.Text {
  display: inline-block;
  width: 100%;
}
</style>
