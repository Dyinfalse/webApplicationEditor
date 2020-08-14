import Vue from "vue"
/**
 * 组件工具类
 */
export default class ComponentUtils {
    /**
     * 基础组件定义
     */
    baseComponents = ['Pack'];

    /**
     * 所有组件的Uuid映射
     */
    componentsUuidMap = {};

    /**
     * 当前焦点组件uuid
     */
    stroe = {};

    /**
     * 组件id, 自增
     */
    cid = 0;

    constructor () {
        /**
         * 安装基础组件
         */
        this.installBase();
        /**
         * 响应式数据集合, 目前存放焦点组件的Uuid, 后面可以扩展存放全项目响应式数据
         * 缺点 -> 没有主动函数可以调用, 如果要调用方法 只能监听(watch) $C.stroe.focus
         */
        this.stroe = Vue.observable({ focus: [] });
    }
    /**
     * 指定文件名称挂载组件 - 必须在 created 里面调用才生效
     * 支持单个安装和批量安装
     * @param {Array | String} cname 组件文件名list
     * @return {Boolean} 是否挂载成功
     */
    install(cname) {
        /**
         * @TODO
         * 判断参数类型支持批量安装和单个安装
         * 
         * @TODO
         * 安装之前给组件增加唯一hash值 uuid, 在组件集合当中
         */
        try {
            let components = this.getComponents(cname);
            components.map(component => Vue.component(component.name, component));
            return true;
        } catch (e) {
            console.error('组件挂载异常', e);
            return false;
        }
    }

    /**
     * 指定文件名获取组件
     * @param {Array} names 组件文件名list
     * @return {Array} 组件list
     */
    getComponents (names) {
        try{
            return names.map((name) => {
                return require(`../components/${name}`).default;
            });
        }catch (e) {
            console.error('文件查找异常', e);
            return [];
        }
    }

    /**
     * 安装基础组件, 目前只有一个 Pack
     */
    installBase() {
        return this.install(this.baseComponents);
    }
    /**
     * 增加一个组件的配置信息到映射中
     * @param {number} uuid 组件uuid 等同于Vue实例的_uid 非必传
     * @param {Object}} config 增加的当前组件的配置信息, 其中包含base和extend
     * 
     * 创建组件的时候该方法会被执行两次, 第一次创建映射, 第二次更新组件引用
     * 
     * base是基础配置, 组件的Pack消化
     * extend是组件的配置信息, 由组件自身消化
     */
    addComponentsUuidMap(uuid, config) {
        if(typeof uuid == 'string' && config) {
            /** update */
            this.componentsUuidMap[uuid] = config;
        } else if(typeof uuid == 'string' && !config) {
            /** create by name */
            if(!uuid) throw "创建映射异常: 缺少必要的name字段";
            let name = uuid;
            uuid = this.randomUuID();
            let _config = {
                name,
                base: {style: {}},
                extend: {style: {}},
            }
            this.componentsUuidMap[uuid] = _config;
        }else if(typeof uuid == 'object' && !config) {
            if(!uuid.name) throw "创建映射异常: 缺少必要的name字段";
            /** create by config */
            let _config = uuid;
            uuid = this.randomUuID();
            this.componentsUuidMap[uuid] = {
                base: { style: {}},
                extend: { style: {}},
                ..._config
            }
        }
        this.componentsUuidMap[uuid].base.uuid = uuid;
        return this.componentsUuidMap[uuid];
    }
    /**
     * 获取当前focus的组件的配置信息
     */
    getFocusUuidMap(){
        if(this.stroe.focus.length == 0) {
            console.warn("没有激活的组件");
            return [];
        };
        return this.stroe.focus.map(uuid => this.componentsUuidMap[uuid]);
    }
    /**
     * 删除 componentsUuidMap 当中的映射配置数据
     * @param {String} uuid 要删除的Uuid
     */
    deleteUuidMap(uuid) {
        if(!delete this.componentsUuidMap[uuid]){
            console.error("Uuid映射关系删除失败");
        }
    }
    /**
     * 设置当前的焦点组件, 可以是多个
     * @param {Array<Uuid>}} uuids 组件的Uuid数组
     */
    setFocus(uuids) {
        /**
         * @TODO 需要add方法, 单纯覆盖不满足业务需要
         */
        // this.stroe.focus.push(...uuids);
        // this.stroe.focus = Array.from(new Set(this.stroe.focus));
        this.stroe.focus = uuids;
    }
    /**
     * 生成随机Uuid
     */
    randomUuID() {
        var timestamp = new Date().getTime();

        return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-${timestamp}`.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    /**
     * 包装组件信息, 提供全局唯一自增key
     * @param {Array|String} cname 组件名称, 可以接受多个
     * @return 返回包含自增id的组件信息, 不需要人为维护
     */
    pack(cname) {
        if(Array.isArray(cname)){
            return cname.map(name => {
                this.cid++;
                return { name, id: this.cid};
            })
        }else {
            this.cid ++;
            return {name: cname, id: this.cid};
        }
    }
}