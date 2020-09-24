import Page from "../../interfaces/Page";
import File from "../../utils/File";
/**
 * 页面构建类
 */
export default class PageBuilder extends File {

    pageList: Array<Page>;

    targetRoot: string;

    eId: number = 0;

    TAG_MAP: Map<string, string> = new Map([
        ["IdeDiv", "div"],
        ["IdeText", "div"],
        ["IdeImage", "img"],
        ["IdeButton", "button"],
        ["IdeSelect", "select"],
        ["IdeInput", "input"]
    ])

    constructor (pageList: Array<Page>) {
        super();
        this.pageList = pageList;
    }
    
    start(targetRoot: string): void {
        this.targetRoot = targetRoot;
        for (let page of this.pageList){
            this.writeFile(page);
        }
    }

    getCSS(styleMapping): string {
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
        ${this.getStyleMapping(styleMapping)}
    </style>`
    }

    getScript(page: Page, dataMapping, dependency): string {
        return `<script>
        ${this.getDependency(dependency)}
        export default {
            name: "${ page.name }",
            components: {${this.getComponents(dependency)}},
            data() {
                return ${this.json(dataMapping)}
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

    getHTML(page: Page, dataMapping: any, styleMapping: any, dependency: any): string {
        return `<template>
        <div class="page" :style="${ this.json(page.style).replace(/\"/g, "'") }">
            ${ page.elements.map(e => this.createVueElement(e, dataMapping, styleMapping, dependency)).join("\r\n") }
        </div>
    </template>`
    }


    /**
     * 整合元素中的样式到页面样式集合
     */
    setStyleMapping (style, styleMapping, elementClassName) {
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
        styleMapping[elementClassName] = this.json(s).replace(/\,\n/g, ';\n').replace(/\"/g, '');
    }
    /**
     * 创建vue页面中的元素
     */
    createVueElement(element, dataMapping, styleMapping, dependency): string {
        this.eId++;
        /**
         * 元素的className
         */
        let elementClassName = "element-" + this.eId;
        /**
         * 获取标签名称
         */
        element.tagName = this.TAG_MAP.get(element.name) || element.name;
        /**
         * 是否是单标签
         */
        element.isSingle = (element.tagName == 'input' || element.tagName == 'img');
        /**
         * 注册数据
         */
        this.setDataMapping(element.data, dataMapping);
        /**
         * 注册样式
         */
        this.setStyleMapping({...element.style, ...element.packStyle, display: (element.isBlock ? 'block' : 'inline-block')}, styleMapping, elementClassName);
        /**
         * 判断该元素是否是外部依赖, 如果是, 需要从设计器拷贝vue文件到Runner
         */
        if(!this.TAG_MAP.get(element.name)){
            let src = __dirname.replace('public/VueBuilder/main/Page', '') + 'src/components/graceComponents/' + element.name + '.vue';
            /**
             * 文件是否存在
             */
            if(this.fileHas(src)){
                this.copy(src, this.targetRoot + 'src/components/' + element.name + '.vue');
            } else {
                throw `组件查找失败! 依赖文件[${element.name}] 在设计器中未找到, 查看src/components/graceComponents文件夹下是否存在该组件`;
            }
            dependency.push({
                name: element.name,
                type: 'component'
            })
        }
    
        // console.log(styleMapping)
        if(element.isSingle){
            return `
            <${element.tagName} class="base ${elementClassName}" ${this.getDataMapping(element, dataMapping)}/>
            `;
        }else {
            return `
            <${element.tagName} class="base ${elementClassName}" ${ element.tagName == 'select' ? this.getDataMapping(element, dataMapping) : "" }>
                ${
                    element.tagName == 'select' ?
                    element.data.options.map(o => `<option value="${o.value}">${o.name}</option>`).join('\r\n'):
                    element.isBlock ?
                    element.childElement.map(e => this.createVueElement(e, dataMapping, styleMapping, dependency)).join('\r\n'):
                    this.getDataMapping(element, dataMapping)
                }
            </${element.tagName}>`;
        }
    }
    /**
     * 整合元素中的数据到页面数据集合
     */
    setDataMapping (data, dataMapping) {
        for(let k in data) {
            dataMapping[k + this.eId] = data[k];
        }
    }
    /**
     * 从依赖中查找组件, 写入文件
     */
    getComponents (dependency) {
        return dependency.filter(d => d.type == 'component').map(d => {
            return `${d.name}`;
        }).join(', ');
    }
    /**
     * 从集合中获取样式
     */
    getStyleMapping (styleMapping) {
        let s = '';
        for(let className in styleMapping){
            s += '.' + className +' '+ styleMapping[className] + '\r\n';
        }
        return s;
    }
    /**
     * 从集合中获取当前元素的渲染数据key
     */
    getDataMapping (element, dataMapping) {
        if(this.TAG_MAP.get(element.name)){
            for(let k in element.data){
                if(dataMapping.hasOwnProperty(k + this.eId)){
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
    getDependency (dependency) {
        return dependency.map(d => {
            return `import ${d.name} from '../${d.type == 'component' ? 'components' : 'assets'}/${d.name}';`;
        }).join('\r\n');
    }
    /**
     * 写入一个vue 文件
     */
    writeFile(page: Page):void {
        /**
         * 页面数据集合
         */
        let dataMapping = {};
        /**
         * 页面样式集合
         */
        let styleMapping = {};
        /**
         * 页面依赖集合
         */
        let dependency = [];
        let context: string = this.getHTML(page, dataMapping, styleMapping, dependency) + this.getScript(page, dataMapping, dependency) + this.getCSS(styleMapping);
        this.write(this.targetRoot + '/src/views/' + page.name + '.vue', context);
    }
}