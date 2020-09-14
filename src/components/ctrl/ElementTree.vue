<template>
    <div class="ElementTree">

    </div>
</template>

<script>

export default {
  name: 'ElementTree',
  props: {
    pageSet: {
        type: Object,
        default: () => {return {}}
    }  
  },
  data() {
      return {
          
      }
  },
  watch: {
    // pageSet: {
    //     handler:function(val,oldval){
    //         console.log(1)
    //     },
    //     deep:true
    // }
  },
  computed: {
  },
  methods: {
      
  },
  mounted() {
      
  }
}
</script>

<style scoped>
</style>
