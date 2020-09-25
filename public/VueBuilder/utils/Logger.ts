import { ColorEnum } from "../enum/ColorEnum";

/**
 * 日志工具
 */
export default class Logger {
    /**
     * 基础打印方法
     */
    print(info: string, stack ?: any) :void {
        stack = stack || '';
        console.log(info, stack);
    }
    
    error(info: string, stack ?: any) {
        stack = stack || '';
        this.print(`${ColorEnum.RED}${ColorEnum.BLACK_BG}ERROR${ColorEnum.CLEAR}${ColorEnum.RED}: ` + info, stack);
        this.clearColor();
    }

    success(info: string) :void {
        this.print(`${ColorEnum.GREEN}${ColorEnum.BLACK_BG}SUCCESS${ColorEnum.CLEAR}${ColorEnum.GREEN}: ` + info);
        this.clearColor();
    }
    
    clearColor(): void {
        console.log(ColorEnum.CLEAR);
    }
}