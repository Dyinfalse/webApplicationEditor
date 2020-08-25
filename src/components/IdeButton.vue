<template>
  
    <div class="Button">
      <button :style="{
        fontSize: style.fontSize + 'px',
        background: style.background,
        color: style.color,
        borderRadius: style.borderRadius + 'px'
        }">{{data.value}}</button>
    </div>
</template>

<script>

export default {
  name: 'IdeButton',
  data() {
    return {
      timer: '',
      style: {
        color: 0,
        background: '',
        fontSize: 20,
        borderRadius: '',
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
.Button {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.Button button {
  width: 100%;
  height: 100%;
  outline: none;
}
</style>
