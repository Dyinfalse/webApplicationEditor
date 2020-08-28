import Event from './Event';
/**
 * 函数调用事件
 */
export default class CallEvent extends Event {
    /**
     * 调用目标元素 uuid
     */
    target = null;
    /**
     * 调用函数名称
     */
    functionName = '';
    /**
     * 调用方法传入的参 
     */
    paramList = [];

    constructor (config) {
        super(config);
        if(config) {
            this.target = config.target;
            this.functionName = config.functionName;
            this.paramList = config.paramList;
        }
    }
    /**
     * @Override
     * 事件执行方法, 不是箭头函数获取的this是触发事件的dom, 同一个事件不可绑定多次
     */
    run = () => {
        if(!this.target) {throw "目标组件元素缺失"}
        if(!this.functionName) {throw "目标方法名称缺失"}

        return this.getVue(this.target)[this.functionName](...this.paramList.map(p => {
            if(p.mapping == 'unMapping'){
                return p.value;
            } else {
                return this.getVue(p.mapping).$data.data[p.mappingKey];
            }
        }));
    }
    /**
     * @Override
     */
    toJson() {
        return {
            ...super.toJson(),
            target: this.target,
            functionName: this.functionName,
            paramList: this.paramList
        }
    }
}