<template>
  
    <div class="Button" :style="{fontSize: style.fontSize + 'px', color: style.color}">
      <button>{{data.value}}</button>
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
        fontSize: 20
      },
      data: {
        value: '',
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
}
</style>
