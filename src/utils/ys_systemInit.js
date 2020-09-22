/**
 * 系统常用的服务调用，登录  验证用户是否存在 等服务
 */
const store = require("@/store");
import { YsSysAction, YsPortDispose, HttpRequest } from "ys-base-js";

// 基本服务方法实例化
const SysAction = new YsSysAction(store);
// 接口返回统一处理
const ProtDispose = new YsPortDispose().YsDispose;
// 实例化ajax请求方法
const $http = new HttpRequest();

export { SysAction, ProtDispose, $http };
