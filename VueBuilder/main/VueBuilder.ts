import PageConfig from "../interfaces/PageConfig";
import Base from "../utils/Base";
import File from '../utils/File';
import RouterBuilder from './Route/RouterBuilder';
import PageBuilder from './Page/PageBuilder';
import NavBuilder from "./NavBuilder";
/**
 * 构建主要入口类
 */
let isConstructor: boolean = false;

export default class VueBuilder extends Base {
    /**
     * 构建开始时间
     */
    startDate: Date;

    file: File = new File();
    /**
     * 配置信息
     */
    pageConfig: PageConfig = require('../../test.json');

    constructor () {
        super();
        if(isConstructor){ throw this.logger.error("VueBuilder 只能实例化一次") };
        isConstructor = true;
        this.startDate = new Date();
    }
    /**
     * 开始构建
     */
    start(): void {
        if(this.file.delete(this.targetRoot + 'src/views')){
            this.logger.print('删除views成功');
        }
        /**
         * 构建路由文件
         */
        new RouterBuilder(this.pageConfig).start();
        /**
         * 构建页面 vue 文件
         */
        for (let page of this.pageConfig.pages){
            new PageBuilder(page).start();
        }
        /**
         * 构建导航
         */
        if(this.pageConfig.frame.openNavMenuAble){
            new NavBuilder(this.pageConfig.navConfig).start();
        }
    }

    successful(): void {
        this.logger.success('构建成功, 本次构建耗时: ' + (new Date().getTime() - this.startDate.getTime()) + 'ms');
    }
}