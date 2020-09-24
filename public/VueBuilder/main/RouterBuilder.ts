import Page from '../interfaces/Page';
import Base from '../utils/Base';
/**
 * 路由构建类
 */
export default class RouterBuilder extends Base {
    
    routerInfo: Array<Page>;

    constructor(routerInfo: Array<Page>) {
        super();
        this.routerInfo = routerInfo;
    }
    /**
     * 开始构建
     */
    start(): void {
        console.log(this.routerInfo);
    }
}