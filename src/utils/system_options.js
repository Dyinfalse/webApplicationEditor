/**
 * 系统配置文件/换肤等功能的引入操作
 */
import Vue from "vue";
import ViewUI from "view-design";
import { YsInitTheme, getBtnPermission } from "ys-base-js";

// 引入并挂在远舢自定义base基础插件
import YSVueBaseCom from "ys-vue-basecom";
import "ys-vue-basecom/lib/YSBaseComponents.css";

// 引入iconfont字体
import "@/assets/iconfont/iconfont.css";
import "@/theme/index.less";

// 将判断按钮权限方法挂在全局
Vue.prototype.hasPerm = getBtnPermission;

YsInitTheme(1);
Vue.use(YSVueBaseCom);
Vue.use(ViewUI);
