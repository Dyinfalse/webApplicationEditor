import PageConfig from "../interfaces/PageConfig";
import Base from "../utils/Base";
import File from '../utils/File';
import RouterBuilder from './RouterBuilder';
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
     * 项目跟路径
     */
    rootPath: string = __dirname.replace('public/VueBuilder/main', '');
    /**
     * 目标项目跟路径
     */
    targetPath: string = this.rootPath + '../webApplicationRunner/';
    /**
     * 配置信息
     */
    pageConfig: PageConfig = require('../../../test.json');

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
        if(this.file.delete(this.targetPath + 'src/views')){
            this.logger.print('删除views成功');
        }
        /**
         * 构建路由文件
         */
        new RouterBuilder(this.pageConfig.pages).start(this.targetPath);
    }

    successful(): void {
        this.logger.success('构建成功, 本次构建耗时: ' + (new Date().getTime() - this.startDate.getTime()) + 'ms');
    }
}