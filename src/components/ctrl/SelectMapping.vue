<template>
    <div class="SelectMapping">
        <span v-if="hasKey">key: <input class="param-key" type="text" v-model="set.key"></span>
        val: <input v-if="set.mapping == 'unMapping'" class="param-value" type="text" v-model="set.value">

        <i-select v-model="set.mapping" style="width: 100px" @on-change="mappingChange(set)">
            <!-- 目前是获取整个实例的所有组件实例, 但是存在一些页面没有加载的, 所以组件也没有实例化 -->
            <i-option value="unMapping">手动输入</i-option>
            <i-option @mouseenter.native="selectedComponent(k)" @mouseleave.native="clearSelected(k)" :value="k" v-for="(v, k) in $C.componentsUuidMap" :key="k">{{v.name}}</i-option>
        </i-select>
        
        <!-- 从选中组件中选择一个属性绑定映射 -->
        <i-select v-if="$C.componentsUuidMap[set.mapping]" v-model="set.mappingKey" style="width: 100px" @on-change="mappingKeyChange(set)">
            <i-option :value="k" v-for="(v, k) in $C.componentsUuidMap[set.mapping].extend.$data.data" :key="k">{{k}}</i-option>
        </i-select>
    </div>
</template>

<script>

export default {
  name: 'SelectMapping',
  props: {
      /**
       * 是否需要key
       */
      hasKey: {
          type: Boolean,
          default: true
      },
      /**
       * 存储映射关系的集合
       */
      set: {
          type: Object,
          default: () => {
              return {key: '', value: '', mapping: 'unMapping', mappingKey: ''}
          }
      }
  },
  data() {
    return {
        
    }
  },
  methods: {
    /**
     * 选择字段映射
     */
    mappingChange(set) {
        if(set.mapping != 'unMapping'){
            set.mappingKey = set.mapping;
        } else {
            set.mappingKey = '';
        }
    },
    /**
     * 选择映射的key
     */
    mappingKeyChange(set){

    },
    /**
     * 选中组件
     */
    selectedComponent(uuid){
        this.$C.setActiveComponent(uuid);
    },
    clearSelected() {
        this.$C.clearActiveComponent();
    }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SelectMapping .param-value,
.SelectMapping .param-key {
    padding: 0px 3px;
    width: 100px;
    font-size: 12px;
}
</style>
