import Vue from "vue"
let installed = {};
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
   }
   /**
    * 当前子元素的个数
    */
   childCount = 0;

   constructor(id, name) {
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
      this.childElement.push(new Element(this.id + '-' + this.childCount, name));
   }

   /**
    * 转JSON
    */
   toJson() {
      return {
         uuid: this.uuid,
         name: this.name,
         style: this.style,
         childElement: this.childElement.map(e => e.toJson())
      }
   }
}