import Data from "../../interfaces/Data";
import Element from "../../interfaces/Element";
import Base from "../../utils/Base";
import ElementDependency from "./ElementDependency";
import PageBuilder from "./PageBuilder";

export default class ElementBuilder extends Base implements Element {

    /**@override */
    uuid: string = '';
    name: string = '';
    style: CSSStyleDeclaration;
    packStyle: CSSStyleDeclaration;
    isBlock: boolean;
    data: Data;
    childElement: Element[] = [];

    eId: number = 0;
    tagName: string = '';
    isSingle: boolean = false;
    className: string = '';

    constructor (element: Element) {
        super();
        this.uuid = element.uuid;
        this.name = element.name;
        this.style = element.style;
        this.packStyle = element.packStyle;
        this.isBlock = element.isBlock;
        this.data = element.data;
        this.childElement = element.childElement;
    }
    /**
     * 生成一个 element 元素
     */
    start(page: PageBuilder): string {
        page.eId ++;
        /**
         * 元素的className
         */
        this.className = "element-" + page.eId;
        /**
         * 获取标签名称
         */
        this.tagName = page.TAG_MAP.get(this.name) || this.name;
        /**
         * 是否是单标签
         */
        this.isSingle = (this.tagName == 'input' || this.tagName == 'img');
        /**
         * 注册数据
         */
        page.setDataMapping(this.data);
        /**
         * 注册样式
         */
        page.setStyleMapping({...this.style, ...this.packStyle, display: (this.isBlock ? 'block' : 'inline-block')}, this.className);
        /**
         * 判断该元素是否是外部依赖, 如果是, 需要从设计器拷贝vue文件到Runner
         */
        if(!page.TAG_MAP.get(this.name)){
            let src = __dirname.replace('VueBuilder/main/Page', '') + 'src/components/graceComponents/' + this.name + '.vue';
            /**
             * 文件是否存在
             */
            if(page.fileHas(src)){
                page.copy(src, this.targetRoot + 'src/components/' + this.name + '.vue');
            } else {
                throw `组件查找失败! 依赖文件[${this.name}] 在设计器中未找到, 查看src/components/graceComponents文件夹下是否存在该组件`;
            }
            page.dependency.push(new ElementDependency(this.name, 'component'));
        }
    
        if(this.isSingle){
            return `
            <${this.tagName} class="base ${this.className}" ${page.getDataMapping(this)}/>
            `;
        }else {
            return `
            <${this.tagName} class="base ${this.className}" ${ this.tagName == 'select' ? page.getDataMapping(this) : "" }>
                ${
                    this.tagName == 'select' ?
                    this.data.options.map((o:{ name: string, value: string }) => `<option value="${o.value}">${o.name}</option>`).join('\r\n'):
                    this.isBlock ?
                    this.childElement.map((e: Element) => new ElementBuilder(e).start(page)).join('\r\n'):
                    page.getDataMapping(this)
                }
            </${this.tagName}>`;
        }
    }
}