# WEB应用编辑器开发方案

2020.8.14 author by QC & DWY

## 整体思路

在组件方面做到响应式渲染, 尽量使用映射避免循环来保证渲染效率, 配置方面使用组件中的`data`代替原来单独的配置文件, 原因是可以响应式, 不需要人为干预, 使用JS可以操作配置, 每个组件有一个唯一的`uuid`, 在工具类里维护所有组件的配置信息, 和`uuid`是一对一的映射关系, 组件的响应式处理由基础组件`Pack`来处理

页面方面使用`addRoutes`动态添加页面路由, 在页面工具类中维护一个页面路由`path`和组件`uuid`一对多的映射关系来保存页面中的组件, 组件的读取和渲染有基础页面`BaseView`来完成.

组件中`data`的定义方式尽量保证如下格式:

``` js
data() {
    return {
        ... 其他业务属性
        style: {
            ...样式
        },
        chart: {
            ...图表
        },
        data: {
            ...数据
        },
    }
}
```

暂定将`style`, `chart`, `data`作为关键字段, 配置需要注意, 这三个字段的内容会在控制面板直接循环渲染出来.

## ComponentUtils

**说明**

组件工具类, 主要功能是处理组件配置和组件实例的关系, 存放位置在`src/utils/ComponentUtils.js`, 全局唯一实例, 不需要人为再去实例化, 可以理解成是一个静态工具类, 在`main.js`中以`Vue.prototype.$C`的形式挂载到全局.

**ComponentUtils属性**

`baseComponents`是基础组件名称数组, 会在`ComponentUtils`类实例化的时候被挂载, 也就是在`Vue`实例被创建之前挂载到`Vue`上, 后续在代码中修改将无效, 所以可以理解为常量数组.

`componentsUuidMap`中保存这所有组件的配置信息, 使用`uuid`进行映射, 同一个组件的不同实例会有不同的`uuid`, 其结构大致如下:

``` js
{
    "3d60e006-5d8d-4796-9752-176d83f44833-1597301087229": { name: "Input", base: {}, extend: {}},
    "45390486-3b36-4e34-aae4-84fc26b0626b-1597301089232": { name: "Block", base: {}, extend: {}},
    ...
}
```

`uuid`所映射的数据, 结构一定是包含`base`和`extend`, 它们都是响应式的, 修改时要注意.

所有的组件都会包含一个`Pack`基础组件, 其中`base`就是当前组件对应的`Pack`组件的`$data`的引用, `extend`则是当前组件本身的`$data`的引用, 其中组件开发者只需要关心`extend`的变化, 基础组件的引用`base`会统一在`Pack`进行管理, 当我们要改变组件的样式或配置的时候, 我们只需要在`extend`赋值即可, 但是直接修改引用会存在一些不可捕获的风险, 后面还需要做一些优化.

`stroe`是一个使用`Vue.observable()`方法处理过的全局响应式对象, 可以理解成一个小型的`vuex`, 但在这个应用中没那么复杂, 目前只包含了一个`focus`数组, 其中保存着当前点击(激活)了的组件的`uuid`, 之所以做成响应式的, 是为了让全局时刻都能拿到最新的激活组件, [点击查看Vue.observable](https://cn.vuejs.org/v2/api/#Vue-observable)

**ComponentUtils核心方法**

`Boolean install(String|Array<String>)`接收组件名称用来往`Vue`上挂载组件, 根据组件名称查找对应的组件文件, 返回是否挂载成功

`ComponentConfig addComponentsUuidMap(String|ComponentConfig|Uuid, ComponentConfig)`增加或更新一个组件的映射关系, 通常是增加, 更新映射关系统一放在`Pack`组件里处理, 可以指定初始的组件配置, 也可以使用默认的, `uuid`会自动添加, 返回增加进去的配置

`void setFocus(Uuid|Array<Uuid>)`接收组件的`uuid`, 可以是多个, 设置为激活选中状态

`Array<ComponentConfig> getFocusUuidMap()` 获取当前激活了的组件配置

## PageUtils

**说明**

页面工具类, 主要功能是处理页面路径和组件`uuid`的关系, 存放位置在`src/utils/PageUtils.js`, 全局唯一实例, 不需要人为再去实例化, 可以理解成是一个静态工具类, 在`main.js`中以`Vue.prototype.$P`的形式挂载到全局.

**PageUtils属性**

`pageId`内部维护的页面唯一标识

`pathUuidMap`页面路径和当前页面所有组件的`uuid`, `Map<Path, Array<Uuid>>`结构

**PageUtils核心方法**

`Path addPage()`增加一个页面路由, 返回增加的路由Url

`Boolean setPathUuidMap(Path, Uuid)` 给路径增加一个组件的`uuid`, 返回是否添加成功, 最好在该方法执行完之后再跳转路径

`Boolean deletePathUuidMap(Path, Uuid)`删除一个路径的组件`uuid`, 返回是否删除成功

## 约定

遵循约定优于配置(Convention Over Configuration)的编程方式, 使用该类之前对组件开发者作出以下约定:

- 组件名称必须和组件文件名称保持一致, 大写字母开头
- 组件中所有内容必须包含在基础组件`Pack`内, 并且接收`uuid`, 同时传递给`Pack`, 例如: `src/components/Input.vue`
- 组件内需要被控制面板修改的样式, 必须采用驼峰, 保证`:style=""`属性可以直接渲染
- 不可直接操作`this.$C.componentsUuidMap`, 只能读取的时候使用, 如果要添加或删除,必须使用`addComponentsUuidMap()`和`deleteUuidMap()`
- 不可直接操作`this.$P.pathUuidMap`, 只能读取的时候使用, 如果要添加或删除, 只能通过`addPage()`和`deletePage()`

... 待补充


## 配置 & 传输

一个页面的配置分两部分, 一部分是页面的配置, 一部分是组件的配置, 配置的消费者是组件本身以及`Pack`基础组件, 生产者是`Ctrl`组件和所在的页面组件, 一个完整的配置如下.

``` js
// 页面
pathUuidMap = {
    "/pageCtrl/baseView_3": ["uuid1"]
}

// 组件
componentsUuidMap = {
    "uuid1": {
        name: "Input",
        base: {
            style: {
                width: 200,
                height: 100,
                background: "#ccc",
                left: 0,
                top: 10
            }
        },
        extend: {
            style: {
                fontSize: 14,
                border: "2px solid #000",
                marginLeft: 20
            },
            data: {
                value: 'Test Text',
            },
            chart: {
                // ... Echart Config
            }
        }
    }
}
```

以上配置会在`/pageCtrl/baseView_3`页面中渲染一个输入框组件, 内容是: `Test Text`, 一个组件会有很多样式, 不一定所有样式都需要响应式的修改, 我们只把需要变动的属性写在配置中, 其他样式还是以`CSS`为主, 并且控制面板`Ctrl`组件也是根据这个配置来渲染控制器的.

属性的配置没有传输的概念, `Updater`拿到的永远是最新的展示层`data`的引用, 只要产生更新, 都能立即被消费.

## 方法

`componentsUuidMap`维护`Array<Function>`触发注册进来发方法, 可以在属性变更或需要的时候调用

