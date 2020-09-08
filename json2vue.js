let pageConfig = require('./test.json');
/**
 * 标签枚举, 分辨是否是默认元素还是组件
 */
const TAG_ENUM = {
    "IdeDiv": "div"
}

for (let path in pageConfig) {
    let fileContext = createVuePage(pageConfig[path]);
}
/**
 * 构建路由
 */
let router = buildRouter(pageConfig, '');
/**
 * 创建一个Vue页面
 * 页面模版可以根据config.vue指定的vue文件去查找
 */
function createVuePage(config) {
    return `
        <template>
            <div class="page" :style="${ json(config.style) }">
                ${ config.elements.map(e => createVueElement(e)).join("\r\n") }
            </div>
        </template>

        <script>

        export default {
            name: ${ config.name },
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
    let tagName = TAG_ENUM[element.name];
    /**
     * 单双标签
     */
    let single = element.childElement.length === 0;
    if(single){
        return `
                <${tagName} :style="${json(element.style)}"/>`;
    } else {
        return `<${tagName} :style="${element.style}">
                    ${ element.childElement.map(e => createVueElement(e)).join("\r\n") }
                </${tagName}>`;
    }
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
 * 转json
 */
function json (obj) {
    return JSON.stringify(obj);
}