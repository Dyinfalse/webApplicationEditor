<template>
  <Pack :uuid="uuid">
    <div class="Input" :style="{fontSize: style.fontSize + 'px', color: style.color}">
      this's Input component
      <input type="text" v-model="value">
    </div>
  </Pack>
</template>

<script>

export default {
  name: 'Input',
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: '11',
      style: {
        color: 0,
        fontSize: 0
      }
    }
  },
  created() {
    this.style.color = "#000";
  },
  mounted(){
    this.style.fontSize = 20;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Input {
  display: inline-block;
  width: 100%;
}
.Input input {
  width: 80%;
  padding: 0px;
}
</style>
