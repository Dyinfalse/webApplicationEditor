import Event from './Event';
/**
 * 函数调用事件
 */
export default class CustomEvent extends Event {
    /**
     * 事件运行的依赖
     */
    dependents = [];
    dependentsMap = {};
    /**
     * 事件的执行代码
     */
    code = 'return function (event, $parent) {\r\n}';

    constructor (config) {
        super(config);
        if(config) {
            this.dependents = config.dependents;
            this.code = config.code;
        }
    }
    /**
     * @Override
     * 事件执行方法, 不是箭头函数获取的this是触发事件的dom, 同一个事件不可绑定多次
     */
    run = ($parent) => {
        if(!this.code || !this.dependents) throw "自定义事件配置异常";
        let tempFunction;
        try { 
            this.dependents.map(dependent => {
                this.dependentsMap[dependent.key] = {
                    vue: this.getVue(dependent.mapping),
                    field: dependent.mappingKey
                }
            })
            tempFunction = new Function(this.code);
            return tempFunction()(this, $parent);
        } catch (e) {
            console.error("自定义函数执行异常", e);
        }
    }
    /**
     * @Override
     */
    toJson() {
        return {
            ...super.toJson(),
            dependents: this.dependents,
            code: this.code
        }
    }
}