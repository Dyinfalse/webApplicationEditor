import Page from './Page';
import Vue from 'vue';
/**
 * 构建多页路由工具类
 */
export default class PageUtils {
    /**
     * Vue router对象
     */
    router;
    /**
     * 页面集合对象
     */
    pageSet = {};
    /**
     * 页面标识id
     */
    pageId = 0;
    /**
     * 响应式数据源
     */
    store = {};

    constructor(router) {
        this.router = router;
        this.store = Vue.observable({
            focus: [],
            pageConfig: {
                displayWidth: 1920,
                displayHeight: 1080,
                openNavMenuAble: false,
            },
            /**
             * 导航配置
             */
            navConfig: []
        });

    }

    /**
     * 增加一个页面
     */
    addPage() {
        let path = "base_" + this.pageId;
        let page = new Page(path);
        this.pageSet[path] = page;
        this.pageId ++;
        return { path, page };
    }

    /**
     * 获取当前页面的配置
     */
    getPage(path){
        path = path ? path : this.router.currentRoute.fullPath;
        path = path.replace(/^\/designer\//, '');
        return this.pageSet[path];
    }
    /**
     * 删除选中组件
     */
    removeFocus(){
        this.store.focus.map(f => f.remove());
        this.store.focus = [];
    }
    /**
     * 设置选中元素
     */
    setFocus(element) {
        if(this.store.focus[0]) {
            this.store.focus[0].isFocus = false;
        }
        if(!element) {
            return this.store.focus = [];
        }
        element.isFocus = true;
        this.store.focus = [element];
    }
    /**
     * 获取页面的所有配置JSON信息
     */
    toJson() {
        let config = {};
        for(let k in this.pageSet) {
            config[k] = this.pageSet[k].toJson();
        }
        return JSON.stringify(config);
    }
}