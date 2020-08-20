<template>
  
    <div class="Input" :style="{fontSize: style.fontSize + 'px', color: style.color}">
      this's Input component
      <input type="text" v-model="data.value">
    </div>
</template>

<script>

export default {
  name: 'Input',
  data() {
    return {
      timer: '',
      style: {
        color: 0,
        fontSize: 20
      },
      data: {
        value: '11',
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
    this.$C.addFunction(this.$parent.uuid, "add");
    this.$C.addFunction(this.$parent.uuid, "clear");
    // this.style.fontSize = 20;

    // this.timer = setTimeout(() => {
    //   this.value = '22';
    // }, 100000)
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
