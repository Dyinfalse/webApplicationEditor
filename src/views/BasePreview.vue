<template>
  <div class="home">
    <div style="overflow:hidden">
      <Pack v-for="(item) in cList"
            :ref="item.base.uuid"
            :uuid="item.base.uuid"
            :id="item.base.uuid"
            :baseStyle="item.base.$data.baseStyle"
            :key="item.base.uuid">
          <component :id="item.name" :is="item.name" />
      </Pack>
    </div>
  </div>
</template>

<script>
import Pack from '@/components/Pack';

export default {
  name: 'BasePreview',
  components: { Pack },
  data() {
    return {
        components: [],
        cList: [],
        componentName: '',
    }
  },
  methods: {
  },
  created() {

  },
  mounted() {
    let path = this.$router.currentRoute.name;
    if(this.$P.__pathUuidMap[path]){
        this.cList = this.$P.__pathUuidMap[path].map(uuid => this.$C.__componentsUuidMap[uuid]);
        this.$C.install(this.cList.map(c => c.name));
    }
  }
}
</script>
