<template>
    <div class="IdeTabBox">
        <div class="tab" v-for="(tab, index) in $C.store.tabList" :key="tab.value">
            <span>{{tab.value}}</span>
            <i class="close" @click="removeTab(index)">x</i>
        </div>
    </div>
</template>

<script>

export default {
  name: 'IdeTabBox',
  data() {
    return {
      style: {
      },
      data: {

      }
    }
  },
  methods: {
    /**
     * 删除一个标签
     */
    removeTab(index) {
        if(index < 0) return;
        this.$C.store.tabList.splice(index, 1);
        console.log(this.$C.store.tabList)
    },
    /**
     * 增加一个标签
     */
    addTab(value) {
        if(this.$C.store.tabList.find(t => t.value == value)) return;
        this.$C.store.tabList.push({
            value
        })
    },
    /**
     * 操作list
     */
    operationTab(value, check){
        if(check){
            this.addTab(value);
        }else {
            this.removeTab(this.$C.store.tabList.findIndex(t => t.value == value));
        }
    }
  },
  created() {
    this.$C.addStore({ tabList :[
        {value: 'test'},
        {value: 'test2'},
    ]})
  },
  mounted(){
    this.$C.addFunction(this);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.IdeTabBox {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.IdeTabBox .tab {
    color: #AABACA;
    font-size: 16px;
    line-height: 60px;
    width: 228px;
    height: 60px;
    background: #1F2531;
    display: flex;
    justify-content: space-between;
    padding: 0px 30px;
    float: right;
    margin-bottom: 20px;
}

.IdeTabBox .tab:nth-child(odd) {
    float: left;
}

.IdeTabBox .close {
    font-style: normal;
    font-size: 20px;
    cursor: pointer;
}
</style>
