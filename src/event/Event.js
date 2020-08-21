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

    constructor () {

    }
    /**
     * 事件绑定
     */
    bind(EventTree) {
        this.unbind();
        this.bindFunction = this.buildRun(EventTree);
        this.source.$el.addEventListener(this.action.replace(/^on/, ''), this.bindFunction);
    }
    /**
     * 事件解绑
     */
    unbind() {
        this.source.$el.removeEventListener(this.action.replace(/^on/, ''), this.bindFunction);
    }
    /**
     * 构建run
     */
    buildRun (EventTree) {
        
        let _run = EventTree.instance.run;

        return () => {
            
            let r = _run();

            if(r && r.toString() === '[object Promise]') {
                r.then((resault) => {
                    console.log(resault)
                    if(EventTree.childrenEvent.length > 0) {
                        for(let i = 0; i < EventTree.childrenEvent.length; i++){
                            this.buildRun(EventTree.childrenEvent[i])();
                        }
                    }
                })
            }else {
                if(EventTree.childrenEvent.length > 0) {
                    for(let i = 0; i < EventTree.childrenEvent.length; i++){
                        this.buildRun(EventTree.childrenEvent[0])();
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
}