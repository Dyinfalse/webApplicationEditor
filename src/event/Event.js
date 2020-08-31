import Vue from "vue";
/**
 * 基本事件类
 */
export default class Event {
    /**
     * 事件触发动作, 参考addEventListener API
     */
    action = 'onclick';
    /**
     * 触发元素 VueComponent
     */
    source = null;
    /**
     * 绑定的事件函数
     */
    bindFunction = null;

    constructor (config) {
        if(config){
            this.action = config.action;
            this.source = this.getVue(config.source);
            this.bindFunction = config.binded ? () => {} : null;
        }
    }
    /**
     * 事件绑定
     */
    bind(EventTree) {
        if(this.bindFunction) {
            this.unbind();
        }
        this.bindFunction = this.buildRun(EventTree);
        this.source.$el.addEventListener(this.action.replace(/^on/, ''), this.bindFunction);
    }
    /**
     * 事件解绑
     */
    unbind() {
        this.source.$el.removeEventListener(this.action.replace(/^on/, ''), this.bindFunction);
        this.bindFunction = null;
    }
    /**
     * 构建run
     */
    buildRun (EventTree) {
        
        let _run = EventTree.instance.run;

        return ($parent) => {
            let r;
            try {
                r = _run($parent);
            } catch (e) {
                console.error("事件执行异常! 异常提示信息: ", e, "\r\n事件实例信息:", EventTree);
            }
            if(r && r.toString() === '[object Promise]') {
                r.then((resault) => {
                    if(EventTree.childrenEvent.length > 0) {
                        for(let i = 0; i < EventTree.childrenEvent.length; i++){
                            this.buildRun(EventTree.childrenEvent[i])(resault);
                        }
                    }
                })
            }else {
                if(EventTree.childrenEvent.length > 0) {
                    for(let i = 0; i < EventTree.childrenEvent.length; i++){
                        this.buildRun(EventTree.childrenEvent[i])(r);
                    }
                }
            }
        }
    }
    /**
     * 事件执行方法, 不是箭头函数获取的this是触发事件的dom, 同一个事件不可绑定多次
     * return Promise 会使子事件等待执行
     */
    run () { }


    /**
     * 用于存储的方法, 将当前事件的实例转为JSON
     */
    toJson() {
        return {
            action: this.action,
            source: this.source.$parent.uuid,
            binded: this.bindFunction ? 1 : 0
        }
    }

    /**
     * 根据uuid获取组件Vue实例
     */
    getVue(uuid){
        return Vue.prototype.$C.componentsUuidMap[uuid].extend;
    }
}