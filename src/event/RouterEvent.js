import Event from './Event';
import router from '../router'
/**
 * 路由事件
 */
export default class RouterEvent extends Event {
    /**
     * 跳转路径
     */
    path = '';

    constructor () {
        super()
    }
    /**
     * @override
     * 事件执行方法, 不是箭头函数获取的this是触发事件的dom, 同一个事件不可绑定多次
     */
    run = () => {
        router.push("/pageCtrl/" + this.path);
    }
}