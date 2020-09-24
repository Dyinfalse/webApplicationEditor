import Page from "../../interfaces/Page";
import Route from "../../interfaces/Route";
import Base from "../../utils/Base";
/**
 * 路由生成基类, 可以看成是 Page 到 Route 的转化器
 */
export default class RouteBase extends Base implements Route {
    path: string;
    name: string = '';
    component: string = '';
    redirect: string = '';
    children: Array<Route>;

    constructor (routeInfo: Page) {
        super();
        let { path, name } = routeInfo;
        this.path = path;
        this.name = name;
        this.component = name;
    }
    /** @override */
    getImport(): string {
        return `import ${this.component} from "../views/${this.component}";`;
    }

    /** @override */
    toString(): string {
        return (`{ ` +
            `path: '${this.path}',` +
            (this.name ? `name: '${this.name}',` : '') +
            (this.component ? `component: ${this.name},` : '') +
            (this.redirect ? `redirect: '${this.redirect}',` : '') +
            (this.children ? `children: ${this.children}` : '') +
        `}`)
        /** 格式化 */
        .replace(',}', ' }').replace(/\,/g, ', ');
    }
}