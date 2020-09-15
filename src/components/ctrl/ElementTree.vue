<template>
    <div class="ElementTree">
      <div v-for="element in elements" :key="element.uuid">
        <div>
            {{element.name}}
            <ElementTree :elements="element.childElement"></ElementTree>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'ElementTree',
  props: {
    elements: {
        type: Array,
        default: () => {return {}}
    }
  },
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
.ElementTree {
    margin-left: 20px;
}
</style>
