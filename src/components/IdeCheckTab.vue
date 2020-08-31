<template>
    <div class="IdeCheckTab">
        <div class="tab" :style="style">
            <i :class="data.check ? 'active' : ''" @click="changeCheck()"></i>
            <span>{{data.value}}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'IdeCheckTab',
    data() {
        return {
            style: {
                background: '#191E2A'
            },
            data: {
                value: '',
                check: false,
            }
        }
    },
  methods: {
    /**
     * 改变check
     */
    changeCheck() {
        this.data.check = !this.data.check
    }
  },
  mounted(){
    this.$C.addFunction(this);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.IdeCheckTab {
    display: inline-block;
    width: 100%;
    height: 100%;
}
.IdeCheckTab .tab {
    color: #FFFFFF;
    width: 100%;
    height: 100%;
    font-size: 18px;
    line-height: 60px;
    background: #1F2531;
    padding: 0px 30px;
    margin-bottom: 20px;
    text-align: left;
}

.IdeCheckTab i {
    display: inline-block;
    font-style: normal;
    width: 16px;
    height: 16px;
    cursor: pointer;
    background: transparent;
    border-radius: 4px;
    background-clip: content-box;
    border: 1px solid #83A9C9;
    padding: 3px;
    top: 2px;
    position: relative;
    margin-right: 10px;
}
.IdeCheckTab i.active {
    background: #83A9C9;
    background-clip: content-box;
}

</style>
