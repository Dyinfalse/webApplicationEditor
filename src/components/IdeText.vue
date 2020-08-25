<template>
    <div class="Text">
      <div :style="_style">{{data.value}}</div>
    </div>
</template>

<script>

export default {
  name: 'IdeText',
  data() {
    return {
      style: {
        color: 0,
        fontSize: 20,
        lineHeight: 20
      },
      data: {
        value: '默认数据',
      }
    }
  },
  computed: {
    _style() {
      return {
        fontSize: this.style.fontSize + 'px',
        color: this.style.color,
        lineHeight: this.style.lineHeight + 'px'
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
