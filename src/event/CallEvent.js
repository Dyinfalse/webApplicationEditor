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

    constructor () {
        super()
    }
    /**
     * @override
     * 事件执行方法, 不是箭头函数获取的this是触发事件的dom, 同一个事件不可绑定多次
     */
    run = () => {
        this.target[this.functionName]();
    }
}