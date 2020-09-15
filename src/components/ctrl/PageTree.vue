<template>
    <div class="PageTree">
      <div v-for="(page, path) in $P.pageSet" :key="path">
        <div>
          {{path}}
          <ElementTree :elements="page.elements"></ElementTree>
        </div>
      </div>
    </div>
</template>

<script>
import ElementTree from './ElementTree';
export default {
  name: 'PageTree',
  components: { ElementTree },
  data() {
      return {
        
      }
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

.PageTree {
  position: absolute;
  left: 0px;
  bottom: 0px;
  background: #fff;
  z-index: 99;
  width: 200px;
  height: 500px;
  border: 1px solid #ccc;
  overflow-y: scroll;
  text-align: left;
}
</style>
