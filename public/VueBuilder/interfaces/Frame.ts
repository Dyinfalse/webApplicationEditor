/**
 * 设计器中的整体框架
 */
export default interface Frame {
    /**
     * 显示器宽度
     */
    displayWidth: number;
    /**
     * 显示器高度
     */
    displayHeight: number;
    /**
     * 是否开启左侧导航
     */
    openNavMenuAble: boolean;
    /**
     * 是否开启公共头部
     */
    openHeaderAble: boolean;
}