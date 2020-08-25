<template>
  
    <div class="Input">
      <input type="text" v-model="data.value" :style="_style">
    </div>
</template>

<script>

export default {
  name: 'IdeInput',
  data() {
    return {
      timer: '',
      style: {
        color: '#fff',
        fontSize: 20,
        background: '',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0,
        borderLeft: '',
        borderRight: '',
        borderTop: '',
        borderBottom: '',
      },
      data: {
        value: '',
      }
    }
  },
  created() {

  },
  computed: {
    _style() {
      return {
        fontSize: this.style.fontSize + 'px',
        color: this.style.color,
        background: this.style.background,
        paddingLeft: this.style.paddingLeft + 'px',
        paddingRight: this.style.paddingRight + 'px',
        paddingTop: this.style.paddingTop + 'px',
        paddingBottom: this.style.paddingBottom + 'px',
        borderLeft: this.style.borderLeft,
        borderRight: this.style.borderRight,
        borderTop: this.style.borderTop,
        borderBottom: this.style.borderBottom,
      }
    }
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
  height: 100%;
}
.Input input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}
</style>
