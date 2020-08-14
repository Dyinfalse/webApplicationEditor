import BaseView from '../views/BaseView';
/**
 * 构建多页路由工具类
 */
export default class PageUtils {

    /**
     * Vue router对象
     */
    router;

    /**
     * 页面自增id
     */
    pageId = window.localStorage.getItem("pageId") || 0;

    /**
     * 页面路径和 组件uuid映射
     */
    pathUuidMap = {};

    constructor (router) {
        this.router = router;
    }

    /**
     * 增加一个页面
     */
    addPage() {
        this.pageId ++;
        let routes = this.router.options.routes;

        routes.find(item => item.path == "/pageCtrl").children.push({
            path: "baseView_" + this.pageId,
            name: "baseView_" + this.pageId,
            vue: "BaseView",
            component: BaseView
        })

        this.router.addRoutes(routes);

        window.localStorage.setItem("pageId", this.pageId);
        window.localStorage.setItem("router", JSON.stringify(routes));

        return "/pageCtrl/baseView_" + this.pageId;
    }

    /**
     * @TODO 路径做成默认当前路径
     * 增加一个组件uuid映射
     */
    setPathUuidMap(path, uuid) {
        try {
            if(this.pathUuidMap[path]){
                this.pathUuidMap[path].push(uuid);
                this.pathUuidMap[path] = Array.from(new Set(this.pathUuidMap[path]));
            }else {
                this.pathUuidMap[path] = [uuid];
            }
            return true;
        } catch (e) {
            console.error("组件uuid添加到路径时错误");
            return false;
        }
    }

    /**
     * @TODO 删除页面中的组件映射关系
     * @param {String} path 非必填, 默认是当前页面, 也可以指定页面删除
     * @param {String} uuid 必填要删除的组件的uuid
     */
    deletePathUuidMap(path, uuid) {

    }

    
}