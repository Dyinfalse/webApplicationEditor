<template>
    <div class="ElementTree">
      <div v-for="element in elements" :key="element.uuid">
        <div>
            <p @click="setFocus(element)">{{element.name}}</p>
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
      setFocus(element) {
          this.$P.setFocus(element);
      }
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
