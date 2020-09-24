export default interface Route {
    path: string;
    name ?: string;
    component ?: string;
    /**
     * vue 和 component 是同一个东西, 设计器在生成vue的时候
     * 避免于route中命名相同所以使用vue命名来表示该页面对应的vue组件名称, 而在生成route.js的时候, 会保持vue和component统一
     * 在实现类 RouteImp 中并未实现该字段
     */
    vue ?: string;
    redirect ?: string;
    children ?: Array<Route>;

    getImport(): string;
}