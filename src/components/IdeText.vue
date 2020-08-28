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
        color: '#fff',
        fontSize: 20,
        lineHeight: 20,
        background: '',
        borderRadius: 0,
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
        lineHeight: this.style.lineHeight + 'px',
        background: this.style.background,
        borderRadius: this.style.borderRadius + 'px'
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
  height: 100%;
}
.Text div {
  width: 100%;
  height: 100%;
}
</style>
