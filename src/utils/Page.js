import BaseView from '../views/BaseView';
import router from '../router';
import Element from './Element';
/**
 * 页面配置类
 */
export default class Page {
    /**
     * 页面名称
     */
    name;
    /**
     * 页面 url
     */
    path;
    /**
     * 页面样式
     */
    style = {
        background: '#fff',
        width: 1920,
        height: 1080
    };
    /**
     * 页面包含的元素
     */
    elements = [];
    /**
     * 子页面
     */
    childPage = {};
    /**
     * 页面对应的Vue, 默认是BaseView
     */
    vue = null;

    constructor(path, name, vue) {
        this.path = path || page;
        this.name = name || path;
        this.vue = vue || BaseView;
        this.addRouter();
    }
    /**
     * 添加一个元素
     */
    addElement() {
        this.elements.push(new Element())
    }
    /**
     * 获取一个元素
     */
    getElement() {

    }
    /**
     * 添加子页面
     */
    addChildPage() {

    }
    /**
     * 转Json 用于保存
     */
    toJson() {
        let childPageJson = {};
        for(let k in this.childPage) {
            childPageJson[k] = this.pageSet[k].toJson();
        }

        return {
            path: this.path,
            name: this.name,
            vue: this.vue.name,
            style: this.style,
            childPage: childPageJson,
            elements: this.elements.map(e => e.toJson())
        }
    }
    /**
     * 创建一个页面, 自动在页面路由中增加
     */
    addRouter () {
        let designerRoutes = router.options.routes.find(r => r.name == "designer");
        designerRoutes.children.push({
            path: this.path,
            name: this.name,
            component: this.vue
        })
        /**
         * 更新路由信息
         */
        router.addRoutes(router.options.routes);
        /**
         * 跳转到新增加的路由
         */
        router.push("/designer/" + this.path)
    }
}