import Event from './Event';
/**
 * 函数调用事件
 */
export default class CallEvent extends Event {
    /**
     * 调用目标元素 VueComponent
     */
    target = null;
    /**
     * 调用函数名称
     */
    functionName = '';

    constructor (config) {
        super(config);
        if(config) {
            this.target = this.getVue(config.target);
            this.functionName = config.functionName;
        }
    }
    /**
     * @Override
     * 事件执行方法, 不是箭头函数获取的this是触发事件的dom, 同一个事件不可绑定多次
     */
    run = () => {
        if(!this.target) {throw "请选择目标组件元素"}
        if(!this.functionName) {throw "请选择方法名称"}
        this.target[this.functionName]();
    }
    /**
     * @Override
     */
    toJson() {
        return {
            ...super.toJson(),
            target: this.target.$parent.uuid,
            functionName: this.functionName
        }
    }
}