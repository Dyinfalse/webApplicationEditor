import RouteBase from "./RouteBase";
import Page from "../../interfaces/Page";
import Route from "../../interfaces/Route";
/**
 * layout 路由没有页面配置的实体, 其组件是固定的, 在super使用强转给一个站位配置
 */
export default class LayoutRoute extends RouteBase {
    path: string = '/content';
    name: string = 'NavMenu';
    component: string = 'NavMenu';
    children: Array<Route> = [];

    constructor () {
        super(<Page>{path: '', name: '', vue: ''});
    }

    /** @override */
    getImport(): string {
        let importString = '';
        for(let route of this.children){
            importString += (route.getImport() + '\r\n');
        }
        importString += `import ${this.component} from "../components/${this.component}";`
        return importString;
    }

    /** @override */
    toString(): string {
        return (`{ ` +
            `path: '${this.path}',` +
            (this.name ? `name: '${this.name}',` : '') +
            (this.component ? `component: ${this.name},` : '') +
            (this.redirect ? `redirect: '${this.redirect}',` : '') +
            (this.children ? `children: [\r\n\t\t${this.children.join(',\r\n\t\t')}\r\n\t]` : '') +
        `}`)
        /** 格式化 */
        .replace(',}', ' }').replace(/\,/g, ', ');
    }

}