import Event from './Event';
import router from '../router';
import Vue from "vue";
/**
 * 路由事件
 */
export default class RouterEvent extends Event {
    /**
     * 跳转路径
     */
    path = '';
    /**
     * 外部连接
     */
    link = 'http://';

    constructor (config) {
        super(config);
        if(config){
            this.path = config.path;
            this.link = config.link;
        }
    }
    /**
     * @Override
     * 事件执行方法, 不是箭头函数获取的this是触发事件的dom, 同一个事件不可绑定多次
     */
    run = () => {
        if(this.path !== 'http://'){
            router.push("/"+ (Vue.prototype.$P.isPreview() ? "preview" : "pageCtrl") +"/" + this.path);
        } else {
            window.open(this.link);
        }
    }

    /**
     * @Override
     */
    toJson () {
        return {
            ...super.toJson(),
            path: this.path,
            link: this.link,
        }
    }
}