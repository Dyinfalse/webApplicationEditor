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
     * isPage
     */
    isPage = true;
    /**
     * 页面样式
     */
    style = {
        background: '#ccc',
        width: 1920 + 'px',
        height: 1080 + 'px',
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
    /**
     * 索引位置, 页面级别
     */
    eindex = 0;
    /**
     * 组件数据
     */
    data = {};

    constructor(path, name, vue) {
        this.path = path || 'page';
        this.name = name || path;
        this.vue = vue || BaseView;
        this.addRouter();
    }
    /**
     * 添加一个元素
     */
    addElement(name) {
        this.elements.push(new Element(++ this.eindex, name, this));
    }
    /**
     * 删除指定组件
     */
    removeElement() {

    }
    /**
     * 获取一个元素
     */
    getElement() {

    }
    /**
     * 添加子页面
     */
    addChildPage(path) {

    }
    /**
     * 转Json 用于保存
     */
    toJson() {
        return {
            path: this.path,
            name: this.name,
            vue: this.vue.name,
            style: this.style,
            elements: this.elements.map(e => e.toJson())
        }
    }
    /**
     * 创建一个页面, 自动在页面路由中增加
     */
    addRouter () {
        let fullPath = this.path.split("/");
        let currentPath = fullPath.pop();
        let initRouter = {
            path: currentPath,
            name: this.name,
            component: this.vue,
            children: []
        }
        let designer = router.options.routes.find(r => r.name == "designer");
        let designerRoutes = designer.children;
        designerRoutes.push(initRouter);
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