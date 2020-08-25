<template>
  
    <div class="Input" :style="{fontSize: style.fontSize + 'px', color: style.color}">
      <input type="text" v-model="data.value">
    </div>
</template>

<script>

export default {
  name: 'IdeInput',
  data() {
    return {
      timer: '',
      style: {
        color: 0,
        fontSize: 20
      },
      data: {
        value: '',
      }
    }
  },
  created() {
    this.style.color = "#000";
  },
  methods: {
    add () {
      this.data.value ++;
    },
    clear(){
      this.data.value = '';
    }
  },
  mounted(){
    this.$C.addFunction(this);
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
  width: 100%;
  padding: 0px;
}
</style>
