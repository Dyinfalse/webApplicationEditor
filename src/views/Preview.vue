<template>
  <div class="Preview">
    <keep-alive>
      <router-view :key="$route.name"/>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'Preview',
  components: { },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
