<template>
    <div class="ElementTree">
      <div v-for="element in elements" :key="element.uuid">
        <div>
            <p :class="$P.store.focus[0] == element ? 'focus' : ''"  @click="setFocus(element)">{{element.name}}</p>
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
          this.$router.push("/designer/" + element.getPage().path);
          
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

.ElementTree .focus {
  background: #777;
  color: #fff;
}
</style>
