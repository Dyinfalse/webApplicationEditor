import Vue from "vue"
let installed = {};
let isBlockSet = new Set(['IdeDiv']);
/**
 * 元素类
 */
export default class Element {
   /**
    * 元素的uuid
    */
   uuid;
   /**
    * 元素的组件
    */
   name;
   /**
    * isElement
    */
   isElement = true;
   /**
    * 子元素
    */
   childElement = [];
   /**
    * 是否是块级元素
    */
   isBlock = true;
   /**
    * 组件样式
    */
   style = {
      width: 100 + 'px',
      height: 100 + 'px',
      background: '#fff',
      border: 'none',
      fontSize: '14px',
      borderRadius: '0px',
   }
   /**
    * 包装样式
    */
   packStyle = {
      position: 'unset',
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
      verticalAlign: 'top'
   }
   /**
    * 元素数据
    */
   data = {};
   /**
    * 当前子元素的个数
    */
   childCount = 0;
   /**
    * 是否获得焦点
    */
   isFocus = false;
   /**
    * 父级元素
    */
   parent = {};

   constructor(id, name, parent) {
      if(!name) throw "实例化组件异常! constructorElementException: param name is required"
      if(typeof installed[name] == 'number'){
         installed[name] ++;
      }else {
         installed[name] = 0;
         let c = require(`../components/baseElement/${name}.vue`).default;
         Vue.component(c.name, c);
      }
      this.uuid = this.randomUuid();
      this.name = name;
      this.id = id;
      this.isBlock = isBlockSet.has(name);
      this.parent = parent;
   }

   /**
    * 生成随机Uuid
    */
   randomUuid() {
      var timestamp = new Date().getTime();

      return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-${timestamp}`.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : ( r & 0x3 | 0x8);
            return v.toString(16);
      });
   }
   /**
    * 添加一个子元素
    */
   addChildElement(name) {
      this.childCount ++;
      this.childElement.push(new Element(this.id + '-' + this.childCount, name, this));
   }
   /**
    * 从集合中删除这个元素, 页面或父节点
    */
   remove(){
         let key = this.parent.isElement ? 'childElement' : 'elements';
         let i = this.parent[key].indexOf(this);
         if(i == -1) throw "删除组件异常! removeElementException: can not find current element in parent";
         this.parent[key].splice(i, 1);
   }

   /**
    * 转JSON
    */
   toJson() {
      return {
         uuid: this.uuid,
         name: this.name,
         style: this.style,
         packStyle: this.packStyle,
         isBlock: this.isBlock,
         data: this.data,
         childElement: this.childElement.map(e => e.toJson())
      }
   }
}