let pageConfig = require('./test.json');
let arguments = process.argv.splice(2);
let fs = require('fs');
let targetPath = arguments[0];
let targetDir = (__dirname + "/" + targetPath);
let viewsDir = targetDir + "src/views";
/**
 * 标签枚举, 分辨是否是默认元素还是组件, 其中[input, img]会被写成单标签
 */
const TAG_MAP = new Map([
    ["IdeDiv", "div"],
    ["IdeText", "div"],
    ["IdeImage", "img"],
    ["IdeButton", "button"],
    ["IdeSelect", "select"],
    ["IdeInput", "input"]
])
const BR = "\r\n";
/**
 * 元素渲染的唯一标识
 */
let eId = 0;
/**
 * 清空 views文件
 */
delDir(viewsDir);
/**
 * 解析配置
 */
for (let path in pageConfig) {
    let fileContext = getVueContext(pageConfig[path]);
    fs.writeFileSync(
        (`${ viewsDir }/${ pageConfig[path].name }.vue`),
        fileContext,
        { encoding:'utf-8' }
    );
    console.log(`${path}文件写入成功`);
}
/**
 * 构建路由
 */
writeRouter(buildRouter(pageConfig, ''));
/**
 * 创建一个Vue页面
 * 页面模版可以根据config.vue指定的vue文件去查找
 */
function getVueContext(config) {
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
    // console.log(config.elements)
    return `<template>
    <div class="page" :style="${ json(config.style).replace(/\"/g, "'") }">
        ${ config.elements.map(e => createVueElement(e, dataMapping, styleMapping, dependency)).join("\r\n") }
    </div>
</template>

<script>
${getDependency(dependency)}
export default {
    name: "${ config.name }",
    components: {${getComponents(dependency)}},
    data() {
        return ${json(dataMapping, null, 4)}
    },
    methods: {

    },
    created() {

    },
    mounted() {
        
    }
}
</script>
<style scoped>
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
    ${getStyleMapping(styleMapping)}
</style>
`;
}
/**
 * 创建vue页面中的元素
 */
function createVueElement(element, dataMapping, styleMapping, dependency) {
    eId++;
    /**
     * 元素的className
     */
    let elementClassName = "element-" + eId;
    /**
     * 获取标签名称
     */
    element.tagName = TAG_MAP.get(element.name) || element.name;
    /**
     * 是否是单标签
     */
    element.isSingle = (element.tagName == 'input' || element.tagName == 'img');
    /**
     * 注册数据
     */
    setDataMapping(element.data, dataMapping);
    /**
     * 注册样式
     */
    setStyleMapping({...element.style, ...element.packStyle, display: (element.isBlock ? 'block' : 'inline-block')}, styleMapping, elementClassName);
    /**
     * 判断该元素是否是外部依赖, 如果是, 需要从设计器拷贝vue文件到Runner
     */
    if(!TAG_MAP.get(element.name)){
        let src = __dirname + '/src/components/graceComponents/' + element.name + '.vue';
        /**
         * 文件是否存在
         */
        if(fs.existsSync(src)){
            copyfile(src, targetDir + 'src/components/' + element.name + '.vue');
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
        <${element.tagName} class="base ${elementClassName}" ${getDataMapping(element, dataMapping)}/>
        `;
    }else {
        return `
        <${element.tagName} class="base ${elementClassName}" ${ element.tagName == 'select' ? getDataMapping(element, dataMapping) : "" }>
            ${
                element.tagName == 'select' ?
                element.data.options.map(o => `<option value="${o.value}">${o.name}</option>`).join(BR):
                element.isBlock ?
                element.childElement.map(e => createVueElement(e, dataMapping, styleMapping, dependency)).join(BR):
                getDataMapping(element, dataMapping)
            }
        </${element.tagName}>`;
    }
}
/**
 * 从依赖中查找组件, 写入文件
 */
function getComponents (dependency) {
    return dependency.filter(d => d.type == 'component').map(d => {
        return `${d.name}`;
    }).join(', ');
}
/**
 * 读取依赖, 生成import 语句
 */
function getDependency (dependency) {
    return dependency.map(d => {
        return `import ${d.name} from '../${d.type == 'component' ? 'components' : 'assets'}/${d.name}';`;
    }).join('\r\n');
}
/**
 * 整合元素中的数据到页面数据集合
 */
function setDataMapping (data, dataMapping) {
    for(let k in data) {
        dataMapping[k + eId] = data[k]
    }
}
/**
 * 从集合中获取当前元素的渲染数据key
 */
function getDataMapping (element, dataMapping) {
    if(TAG_MAP.get(element.name)){
        for(let k in element.data){
            if(dataMapping.hasOwnProperty(k + eId)){
                if(element.tagName == 'input' || element.tagName == 'select'){
                    return 'v-model="'+ k + eId +'"';
                }
                if(element.tagName == 'img'){
                    return ':src="'+ k + eId +'"';
                }
                return "{{"+ k + eId +"}}";
            }
        }
    }
    return "";
}
/**
 * 整合元素中的样式到页面样式集合
 */
function setStyleMapping (style, styleMapping, elementClassName) {
    let s = {};
    for(let k in style){
        if(style[k]){
            if(
                (style.display == 'block' && k == 'verticalAlign') ||
                (style.position == 'unset' && (k == 'position' || k == 'left' || k == 'right' || k == 'top' || k == 'bottom'))
            ){
                continue;
            }
            s[toLowerLine(k)] = style[k];
        }
    }
    styleMapping[elementClassName] = json(s).replace(/\,\n/g, ';\n').replace(/\"/g, '');
}
/**
 * 从集合中获取样式
 */
function getStyleMapping (styleMapping) {
    let s = '';
    for(let className in styleMapping){
        s += '.' + className +' '+ styleMapping[className] + '\r\n';
    }
    console.log("css 写入完毕")
    return s;
}
/**
 * 构建路由文件
 */
function buildRouter (pageConfig, parentPath) {
    let router = [];
    for(let path in pageConfig) {
        router.push(`{
    path: '${parentPath + '/' +path}',
    name: '${ pageConfig[path].name }',
    component: ${ pageConfig[path].name },
}`);
    }
    return `[${ router.join(',') }]`;
}
/**
 * 写入路由
 */
function writeRouter (context) {
    let _import = '';
    for(let path in pageConfig) {
        _import += `
import ${pageConfig[path].name} from "../views/${pageConfig[path].name}"`;
    }

    let data = `import Vue from 'vue'
import VueRouter from 'vue-router'
${_import}

Vue.use(VueRouter)

const routes = ${context}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
    `;
    fs.writeFileSync(
        (targetDir + "src/router/index.js"),
        data,
        {encoding:'utf-8'}
    );
    console.log("路由文件写入成功");
}
/**
 * 转json
 */
function json (obj) {
    return JSON.stringify(obj, null, 4);
}
/**
 * 递归删除文件夹下所有文件
 */
function delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        // fs.rmdirSync(path);
    }
}

/**
 * 驼峰转中划线
 */
function toLowerLine(str) {
	var temp = str.replace(/[A-Z]/g, function (match) {	
		return "-" + match.toLowerCase();
  	});
  	if(temp.slice(0,1) === '-'){
  		temp = temp.slice(1);
  	}
	return temp;
};
/**
 * 复制文件
 */
function copyfile(src,dir) {
    fs.writeFileSync(dir,fs.readFileSync(src));
}