import Data from "../../interfaces/Data";
import Page from "../../interfaces/Page";
import File from "../../utils/File";
import ElementBuilder from "./ElementBuilder";
import ElementDependency from "./ElementDependency";
import Element from '../../interfaces/Element';
/**
 * 页面构建类
 */
export default class PageBuilder extends File {
    /**
     * 页面配置信息
     */
    page: Page;

    eId: number = 0;
    /**
     * 页面数据集合
     */
    dataMapping: Map<string, string> = new Map();
    /**
     * 页面样式集合
     */
    styleMapping: Map<string, string> = new Map();
    /**
     * 页面依赖集合
     */
    dependency: Array<ElementDependency> = [];

    TAG_MAP: Map<string, string> = new Map([
        ["IdeDiv", "div"],
        ["IdeText", "div"],
        ["IdeImage", "img"],
        ["IdeButton", "button"],
        ["IdeSelect", "select"],
        ["IdeInput", "input"]
    ])

    constructor (page: Page) {
        super();
        this.page = page;
    }
    
    start(): void {
        this.writeFile(this.page);
    }

    getCSS(): string {
        return `<style scoped>
.page {
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 0px;
}
.base {
    box-sizing: border-box;
    overflow: hidden;
}

${this.getStyleMapping()}
</style>`
    }

    getScript(): string {
        return `<script>
    ${this.getDependency()}
    export default {
        name: "${ this.page.name }",
        components: {${this.getComponents()}},
        data() {
            return ${this.json(this.dataMapping)}
        },
        methods: {
    
        },
        created() {
    
        },
        mounted() {
            
        }
    }
</script>`
    }

    getHTML(): string {
        return `<template>
        <div class="page" :style="${ this.json(this.page.style).replace(/\"/g, "'") }">
        ${ this.page.elements.map((e: Element) => new ElementBuilder(e).start(this)).join("\r\n") }
    </div>
</template>`
    }


    /**
     * 整合元素中的样式到页面样式集合
     */
    setStyleMapping (style: CSSStyleDeclaration, elementClassName: string) {
        let s = {};
        for(let k in style){
            if(style[k]){
                if(
                    (style.display == 'block' && k == 'verticalAlign') ||
                    (style.position == 'unset' && (k == 'position' || k == 'left' || k == 'right' || k == 'top' || k == 'bottom'))
                ){
                    continue;
                }
                s[this.toLowerLine(k)] = style[k];
            }
        }
        this.styleMapping.set(elementClassName, this.json(s).replace(/\,\n/g, ';\n').replace(/\"/g, ''));
    }
    /**
     * 整合元素中的数据到页面数据集合
     */
    setDataMapping (data: Data): void {
        for(let k in data) {
            this.dataMapping.set(k + this.eId, data[k]);
        }
    }
    /**
     * 从依赖中查找组件, 写入文件
     */
    getComponents (): string {
        return this.dependency.filter(d => d.type == 'component').map(d => {
            return `${d.name}`;
        }).join(', ');
    }
    /**
     * 从集合中获取样式
     */
    getStyleMapping (): string {
        let s = '';
        this.styleMapping.forEach((value: string, key: string) => {
            s += '.' + key +' '+ value + '\r\n';
        });
        return s;
    }
    /**
     * 从集合中获取当前元素的渲染数据key
     */
    getDataMapping (element: ElementBuilder): string {
        if(this.TAG_MAP.get(element.name)){
            for(let k in element.data){
                if(this.dataMapping.has(k + this.eId)){
                    if(element.tagName == 'input' || element.tagName == 'select'){
                        return 'v-model="'+ k + this.eId +'"';
                    }
                    if(element.tagName == 'img'){
                        return ':src="'+ k + this.eId +'"';
                    }
                    return "{{"+ k + this.eId +"}}";
                }
            }
        }
        return "";
    }
    /**
     * 读取依赖, 生成import 语句
     */
    getDependency (): string {
        return this.dependency.map((d: ElementDependency) => {
            return `import ${d.name} from '../${d.type == 'component' ? 'components' : 'assets'}/${d.name}';`;
        }).join('\r\n');
    }
    /**
     * 写入一个vue 文件
     */
    writeFile(page: Page): void {
        let context: string = this.getHTML() + '\r\n' + this.getScript() + '\r\n' + this.getCSS();
        this.write(this.targetRoot + '/src/views/' + page.name + '.vue', context);
    }
}