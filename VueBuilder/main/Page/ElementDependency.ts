/**
 * 元素依赖类
 */
export default class ElementDependency {
    name: string = '';
    type: string = '';

    constructor (name: string, type: string) {
        this.name = name;
        this.type = type;   
    }
}