import Route from '../../interfaces/Route';
import LoginRoute from './LoginRoute'
import Page from '../../interfaces/Page';
import File from '../../utils/File';
import RouteBase from './RouteBase';
import PageConfig from '../../interfaces/PageConfig';
import LayoutRoute from './LayoutRoute';
/**
 * 路由构建类
 */
export default class RouterBuilder extends File {
    /**
     * 配置的页面数组
     */
    routerInfo: Array<Page> = [];
    /**
     * 要写入的页面数组
     */
    routerResult: Array<Route> = [];

    annotation: string = '路由配置文件';

    openNavMenuAble: boolean;
    
    constructor(pageConfig: PageConfig) {
        super();
        this.routerInfo = pageConfig.pages;
        this.openNavMenuAble = pageConfig.frame.openNavMenuAble;
    }
    /**
     * 开始构建
     */
    start(): void {
        try {
            /**
             * 如果有导航, 插入带导航的路由
             */
            if (this.openNavMenuAble){
                this.routerResult.push(new LayoutRoute());
            }

            for(let page of this.routerInfo){

                if(page.isLogin) {
                    this.routerResult.push(new LoginRoute(page));
                }else {
                    if(this.openNavMenuAble){
                        this.routerResult[0].children.push(new RouteBase(page));
                    }else {
                        this.routerResult.push(new RouteBase(page));
                    }
                }
                

            }
            this.writeFile(this.routerResult);
        } catch (e) {
            throw this.logger.error("路由生成失败", e);
        }
    }
    /**
     * 写入路由文件
     */
    writeFile(routeList: Array<Route>): void {
        let context = `${routeList.map(route => route.getImport()).join('\r\n')}
/**
 * ${this.annotation}
 */
export default [
    ${routeList.join(',\r\n\t')}
];`;
        this.write((this.targetRoot + "src/router/router.js"), context);
    }
}