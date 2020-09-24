import RouteBase from "./RouteBase";
import Page from "../../interfaces/Page";

export default class LoginRoute extends RouteBase {
    path: string = '/';
    name: string = 'Login';
    component: string = 'Login';

    constructor (routeInfo: Page) {
        super(routeInfo);
        if(!routeInfo.isLogin) {
            this.logger.error("不能生成LoginRoute实例, 传入页面并不是登录页面");
        }
    }

}