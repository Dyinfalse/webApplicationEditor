import VueBuilder from './main/VueBuilder';
/**
 * 根据设计器的json配置, 生成对应的Vue项目文件, 结合类base项目
 */
const vueBuilder: VueBuilder = new VueBuilder();

vueBuilder.start();

vueBuilder.successful();
