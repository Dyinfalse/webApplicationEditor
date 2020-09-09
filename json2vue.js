let pageConfig = require('./test.json');
let arguments = process.argv.splice(2);
let fs = require('fs');
let relativePath = arguments[0];
let targetDir = (__dirname + "/" + relativePath);

/**
 * 标签枚举, 分辨是否是默认元素还是组件
 */
const TAG_ENUM = {
    "IdeDiv": "div"
}
/**
 * 清空文件
 */
delDir(targetDir + "src/views");
/**
 * 创建新文件夹
 */
fs.mkdirSync(targetDir + "src/views");

for (let path in pageConfig) {
    let fileContext = createVuePage(pageConfig[path]);
    fs.writeFileSync(
        (targetDir + `src/views/${pageConfig[path].name}.vue`),
        fileContext,
        {encoding:'utf-8'}
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
function createVuePage(config) {
    return `<template>
    <div class="page" :style="${ json(config.style).replace(/\"/g, "'") }">
        ${ config.elements.map(e => createVueElement(e)).join("\r\n") }
    </div>
</template>

<script>

export default {
    name: "${ config.name }",
    components: {  },
    data() {
        return {
            
        }
    },
    methods: {

    },
    created() {

    },
    mounted() {
        
    }
}
</script>`;
}
/**
 * 创建vue页面中的元素
 */
function createVueElement(element) {
    /**
     * 获取标签名称
     */
    let tagName = TAG_ENUM[element.name] || element.name;
    /**
     * 单双标签, 默认都是双标签
     */
    let single = element.childElement.length === 0;
    return `
        <${tagName} :style="${json(element.style).replace(/\"/g, "'")}">
            ${ element.childElement.map(e => createVueElement(e)).join("\r\n") }
        </${tagName}>`;
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
    children: ${ buildRouter(pageConfig[path].childPage, (parentPath + '/' +path)) }
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
    return JSON.stringify(obj);
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
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}