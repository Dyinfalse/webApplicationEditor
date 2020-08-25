import { Events }  from '../event';
import Vue from "vue"
/**
 * 组件工具类
 */
export default class ComponentUtils {
    /**
     * 全部组件
     */
    ALL_COMPONENTS = [
        "IdeText", "IdeInput", "IdeButton", "IdeImage"
    ];
    /**
     * 基础组件定义
     */
    baseComponents = [];

    /**
     * 已经加过的组件记录
     */
    installed = {};

    /**
     * 所有组件的Uuid映射
     */
    componentsUuidMap = {};

    /**
     * 当前焦点组件uuid
     */
    store = {};

    /**
     * 组件id, 自增
     */
    cid = 0;

    /**
     * 页面工具类实例
     */
    $P = null;

    constructor () {
        /**
         * 安装基础组件
         */
        this.installBase();
        /**
         * 响应式数据集合, 目前存放焦点组件的Uuid, 后面可以扩展存放全项目响应式数据
         * 缺点 -> 没有主动函数可以调用, 如果要调用方法 只能监听(watch) $C.store.focus
         */
        this.store = Vue.observable({ focus: [] });
        
        this.$P = Vue.prototype.$P;

        /**
         * 读缓存, 后续可能是服务端读取
         */
        let catchComponentsUuidMap = window.localStorage.getItem("componentsUuidMap");
        this.componentsUuidMap = catchComponentsUuidMap ? JSON.parse(catchComponentsUuidMap) : {};
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
            if(this.installed[cname]) return true;

            let components = this.getComponents(cname);
            components.map(component => Vue.component(component.name, component));
            this.installed[cname] = 1;
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
     * @param {Object}} config 增加的当前组件的配置信息, 其中包含base和extend, config是包含了两者的vue引用, 在vue引用上可能存在组件的预设值, 需要被之前的修改覆盖掉
     * 
     * 创建组件的时候该方法会被执行两次, 第一次创建映射, 第二次更新组件引用
     * config存在的情况下, 分为是否存在缓存, 如果componentsUuidMap已经存储过了之前的更改, 那么config的值会被覆盖
     * 
     * base是基础配置, 组件的Pack消化
     * extend是组件的配置信息, 由组件自身消化
     */
    addComponentsUuidMap(uuid, config) {
        if(typeof uuid == 'string' && config) {
            /** update */
            /**
             * 同步数据
             */
            if(
                this.componentsUuidMap[uuid].extend.$data.data &&
                this.componentsUuidMap[uuid].extend.$data.style &&
                this.componentsUuidMap[uuid].extend.$data.chart
            ) {
                config.extend.$data.style = {
                    ...config.extend.$data.style,
                    ...this.componentsUuidMap[uuid].extend.$data.style
                };
                config.extend.$data.data = {
                    ...config.extend.$data.data,
                    ...this.componentsUuidMap[uuid].extend.$data.data
                };
                config.extend.$data.chart = {
                    ...config.extend.$data.chart,
                    ...this.componentsUuidMap[uuid].extend.$data.chart
                };
            }
            /**
             * 同步引用
             */
            this.componentsUuidMap[uuid].name = config.name;
            this.componentsUuidMap[uuid].base = config.base;
            this.componentsUuidMap[uuid].extend = config.extend;
            /**
             * 同步事件, 如果新增加组件的时候 event 不为空, 则认为是渲染缓存的组件
             */
            this.componentsUuidMap[uuid].event = this.setEventConfig(this.componentsUuidMap[uuid].event);
            console.log(this.componentsUuidMap[uuid].event)
        } else if(typeof uuid == 'string' && !config) {
            /** create by name */
            if(!uuid) throw "创建映射异常: 缺少必要的name字段";
            let name = uuid;
            uuid = this.randomUuID();
            let _config = {
                name,
                base: {$data: {baseStyle: {}}},
                extend: {$data: {style: {}, data: {}, chart: {}}},
                function: [],
                event: []
            }

            this.componentsUuidMap[uuid] = _config;
        }
        this.componentsUuidMap[uuid].base.uuid = uuid;
        return this.componentsUuidMap[uuid];
    }
    /**
     * 获取当前focus的组件的配置信息
     */
    getFocusUuidMap(){
        if(this.store.focus.length == 0) {
            console.warn("没有激活的组件");
            return [];
        };
        return this.store.focus.map(uuid => this.componentsUuidMap[uuid]);
    }
    /**
     * 删除 componentsUuidMap 当中的映射配置数据
     * @param {String} uuid 要删除的Uuid
     * @return {Array<Uuid>} 被删除的uuid数组
     */
    deleteUuidMap(uuid) {
        /**
         * 默认当前选中uuid
         */
        if(!uuid){
            return this.store.focus.map(u => this.deleteUuidMap(u));
        }
        if(!delete this.componentsUuidMap[uuid]){
            console.error("Uuid映射关系删除失败");
        }else {
            this.$P.deletePathUuidMap(this.$P.router.currentRoute.name, [uuid]);
        }
        return uuid;
    }
    /**
     * 设置当前的焦点组件, 可以是多个
     * @param {Array<Uuid>}} uuids 组件的Uuid数组
     */
    setFocus(uuids) {
        /**
         * @TODO 需要add方法, 单纯覆盖不满足业务需要
         */
        // this.store.focus.push(...uuids);
        // this.store.focus = Array.from(new Set(this.store.focus));
        this.store.focus = uuids;
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
     * 添加一个对外方法给当前组件配置
     * @param {VueComponent} _this 绑定到的uuid
     * @param {String} name Function name
     */
    addFunction(_this, name) {
        try {
            if(name) {
                let uuid = _this.$parent.uuid;
                /**
                 * 相同组件内不允许同名方法
                 */
                if(this.componentsUuidMap[uuid].function.indexOf(name) > -1) return;
                this.componentsUuidMap[uuid].function.push(name);
            } else {
                /**
                 * 没有name, 添加所有方法
                 * $createElement & _c 是Vue的保留方法
                 */
                for(let attr of Object.keys(_this)){
                    if(typeof _this[attr] === 'function' && attr !== '$createElement' && attr !== '_c'){
                        this.addFunction(_this, attr);
                    }
                }
            }
        } catch (e) {
            console.error("添加函数异常", e)
        }
    }
    /**
     * 保存配置
     */
    save () {
        let _componentsUuidMap = {};
        for(let k in this.componentsUuidMap) {
            let c = this.componentsUuidMap[k];
            _componentsUuidMap[k] = {
                name: c.name,
                base: this.getBaseConfig(c.base),
                extend: this.getExtendsConfig(c.extend),
                event: this.getEventConfig(c.event),
                function: c.function,
            }
        }
        console.log(_componentsUuidMap)
        window.localStorage.setItem("componentsUuidMap", JSON.stringify(_componentsUuidMap));
    }

    /**
     * 从Vue对象中剥离base配置
     */
    getBaseConfig(base) {
        if(!base._isVue) throw "存储对象base 必须是Vue实例";
        return {
            uuid: base.uuid,
            $data: {
                baseStyle: base.baseStyle
            }
        }
    }
    /**
     * 从Vue对象中剥离base配置
     */
    getExtendsConfig(extend) {
        if(!extend._isVue) throw "存储对象extend 必须是Vue实例";
        return {
            $data: {
                data: extend.$data.data,
                style: extend.$data.style,
                chart: extend.$data.chart,
            }
        }
    }
    /**
     * 递归函数
     * 获取事件配置
     */
    getEventConfig(events) {
        if(events.length > 0){
            return events.map(event => {
                return {
                    id: event.id,
                    type: event.type.name,
                    instance: event.instance.toJson(),
                    childrenEvent: this.getEventConfig(event.childrenEvent)
                }
            });
        } else {
            return [];
        }
    }
    /**
     * 递归函数
     * 读取组件的缓存, 并且同步到componentsUuidMap里
     */
    setEventConfig (events) {
        if(events.length > 0) {
            return events.map(event => {
                return {
                    id: event.id,
                    type: Events[event.type],
                    instance: new Events[event.type](event.instance),
                    childrenEvent: this.setEventConfig(event.childrenEvent)
                }
            });
        } else {
            return [];
        }
    }
}