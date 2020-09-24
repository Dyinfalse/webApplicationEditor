import Route from '../interfaces/Route';
import LoginRoute from './Route/LoginRoute'
import Page from '../interfaces/Page';
import File from '../utils/File';
import RouteBase from './Route/RouteBase';
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

    rootDir: string = '';
    
    constructor(routerInfo: Array<Page>) {
        super();
        this.routerInfo = routerInfo;
    }
    /**
     * 开始构建
     */
    start(rootDir: string): void {
        
        this.rootDir = rootDir;

        for(let page of this.routerInfo){

            if(page.isLogin) {
                this.routerResult.push(new LoginRoute(page));
            }else {
                this.routerResult.push(new RouteBase(page));
            }
        }
        this.writeFile(this.routerResult);
    }
    /**
     * 写入路由文件
     */
    writeFile(routeList: Array<Route>): void {
        let context = `${routeList.map(route => route.getImport()).join('\r\n')}
/**
 * 路由配置文件
 */
export default [
    ${routeList.join(',\r\n\t')}
];`;
        this.write((this.rootDir + "src/router/router.js"), context);
    }
}