import Logger from './Logger';
/**
 * 基础类, 提供基本依赖, 公共方法, 工具类
 */
export default class Base {
    /**
     * 注入日志打印类
     */
    logger: Logger = new Logger();
    /**
     * 驼峰转中划线
     */
    toLowerLine(str: string): string {
        var temp = str.replace(/[A-Z]/g, function (match) {
            return "-" + match.toLowerCase();
        });

        if(temp.slice(0,1) === '-'){
            temp = temp.slice(1);
        }
        return temp;
    }
}