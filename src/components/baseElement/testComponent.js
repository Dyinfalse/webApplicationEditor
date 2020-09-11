window.testComponent = {
    name: "testComponent",
    template: `<div>{{msg}}</div>`,
    data() {
        return {
            msg: "测试远程组件"
        }
    },
    mounted() {
        console.log("测试组件被挂载完毕")
    }
}