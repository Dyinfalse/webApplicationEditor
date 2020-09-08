import Vue from "vue"
import IdeDiv from "../components/IdeDiv";
/**
 * 组件工具类
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
    * 组件样式
    */
   style = {
      width: 100 + 'px',
      height: 100 + 'px',
      background: 'red'
   }

   constructor(name) {
      Vue.component(IdeDiv.name, IdeDiv);
      this.uuid = this.randomUuid();
      this.name = IdeDiv.name;
   }

   /**
    * 生成随机Uuid
    */
   randomUuid() {
      var timestamp = new Date().getTime();

      return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-${timestamp}`.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
      });
   }
   /**
    * 添加一个子元素
    */
   addChildElement() {
      
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