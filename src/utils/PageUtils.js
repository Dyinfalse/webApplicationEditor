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
    pageSet = { };
    /**
     * 页面标识id
     */
    pageId = 0;

    store = {};

    constructor(router) {
        this.router = router;
        this.store = Vue.observable({focus: []});
    }

    /**
     * 增加一个页面
     */
    addPage() {
        let path = "base_" + this.pageId;
        let page = new Page(path);
        this.pageSet[path] = page;
        this.pageId ++;
    }

    /**
     * 获取一个页面的配置
     * @TODO 应该是树型查找
     */
    getPage(path){
        path = path.replace(/^\/designer\//, '');
        return this.pageSet[path];
    }

    /**
     * 设置选中元素
     */
    setFocus(id) {
        if(!id) {
            this.store.focus = [];
            return;
        }
        let ids = id.toString().split('-');
        let elements = this.pageSet[this.router.currentRoute.name].elements;
        ids.map((id, index) => {
            elements =
                index === ids.length -1 ?
                elements[parseInt(id) - 1] :
                elements = elements[parseInt(id) - 1].childElement;
        });
        this.store.focus = [elements];
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