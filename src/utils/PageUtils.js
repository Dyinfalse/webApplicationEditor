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
    pageId = window.localStorage.getItem("pageId") || -1;

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
     * 删除一个页面, 同时删除映射
     * 跳转至附近页面, 如果没有附近页面, 跳转至上一层路由, pageId归零
     */
    removePage(pathName) {
        delete this.pathUuidMap[pathName];
        let routes = this.router.options.routes;
        let childrenPage = routes.find(item => item.path == "/pageCtrl").children;
        let index = childrenPage.findIndex(item => item.name === pathName);
        childrenPage.splice(index, 1);
        this.router.addRoutes(routes);
        window.localStorage.setItem("router", JSON.stringify(routes));

        let target = '/pageCtrl';
        if(childrenPage[index - 1]){
            target += '/' + childrenPage[index - 1].name;
        } else if (childrenPage[index + 1]) {
            target += '/' + childrenPage[index + 1].name;
        }else {
            this.pageId = -1;
            window.localStorage.setItem("pageId", -1);
        }

        this.router.push(target);
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
    deletePathUuidMap(path, uuids) {
        for(let i = 0; i < this.pathUuidMap[path].length; i++){
            if(uuids.find(u => u === this.pathUuidMap[path][i])){
                this.pathUuidMap[path].splice(i, 1);
                i--;
            }
        }
    }

    /**
     * 获取所有增加的子页面
     */
    getAllRouterInfo () {
        return this.router.options.routes.find(p => p.path === '/pageCtrl').children;
    }
}