import Event from './Event';
import router from '../router'
/**
 * 路由事件
 */
export default class RouterEvent extends Event {
    /**
     * 跳转路径
     */
    path = '';

    constructor (config) {
        super(config);
        if(config){
            this.path = config.path;
        }
    }
    /**
     * @Override
     * 事件执行方法, 不是箭头函数获取的this是触发事件的dom, 同一个事件不可绑定多次
     */
    run = () => {
        router.push("/pageCtrl/" + this.path);
    }

    /**
     * @Override
     */
    toJson () {
        return {
            ...super.toJson(),
            path: this.path,
        }
    }
}

// {"bb7c4c2f-1d19-4dd6-b178-8faab12cfd9d-1598324905805":{"name":"IdeImage","base":{"uuid":"bb7c4c2f-1d19-4dd6-b178-8faab12cfd9d-1598324905805","$data":{"baseStyle":{"width":1920,"height":1080,"left":0,"top":0,"zIndex":"auto"}}},"extend":{"$data":{"data":{"src":"/img/loginbg.a7921de8.png"},"style":{"border":"1px solid #ccc"},"chart":{}}},"event":[],"function":[]},"585b2ab4-eef0-4e88-bcf8-344c1702c316-1598326191544":{"name":"IdeText","base":{"uuid":"585b2ab4-eef0-4e88-bcf8-344c1702c316-1598326191544","$data":{"baseStyle":{"width":478,"height":"36","left":1216,"top":326,"zIndex":"auto"}}},"extend":{"$data":{"data":{"value":"合肥卷烟厂智能制造集控中心"},"style":{"color":"#fff","fontSize":"36","lineHeight":"36"},"chart":{}}},"event":[],"function":[]},"5e99c2af-934c-4126-9847-a346a988840e-1598327327548":{"name":"IdeInput","base":{"uuid":"5e99c2af-934c-4126-9847-a346a988840e-1598327327548","$data":{"baseStyle":{"width":465,"height":47,"left":1222,"top":465,"zIndex":"auto"}}},"extend":{"$data":{"data":{"value":""},"style":{"color":"#fff","fontSize":"20","background":"transparent","paddingLeft":"50","paddingRight":"10","paddingTop":0,"paddingBottom":0,"borderLeft":"","borderRight":"","borderTop":"","borderBottom":"1px solid rgba(61,71,82,1)"},"chart":{}}},"event":[],"function":["add","clear"]},"521031a8-9737-4e26-abdc-2070eacc10a1-1598335990345":{"name":"IdeText","base":{"uuid":"521031a8-9737-4e26-abdc-2070eacc10a1-1598335990345","$data":{"baseStyle":{"width":46,"height":21,"left":"1222","top":"477","zIndex":"auto"}}},"extend":{"$data":{"data":{"value":"账号"},"style":{"color":"#747C86","fontSize":20,"lineHeight":20},"chart":{}}},"event":[],"function":[]},"ea35fa2a-526b-40f5-8b95-69b198200a6c-1598336206765":{"name":"IdeInput","base":{"uuid":"ea35fa2a-526b-40f5-8b95-69b198200a6c-1598336206765","$data":{"baseStyle":{"width":"465","height":"47","left":1222,"top":560,"zIndex":"auto"}}},"extend":{"$data":{"data":{"value":""},"style":{"color":"#fff","fontSize":20,"background":"transparent","paddingLeft":"50","paddingRight":10,"paddingTop":0,"paddingBottom":0,"borderLeft":"","borderRight":"","borderTop":"","borderBottom":""},"chart":{}}},"event":[],"function":["add","clear"]},"d339fcd8-7ce5-419d-b8a7-61259600de8b-1598338229396":{"name":"IdeText","base":{"uuid":"d339fcd8-7ce5-419d-b8a7-61259600de8b-1598338229396","$data":{"baseStyle":{"width":45,"height":21,"left":1222,"top":"573","zIndex":"auto"}}},"extend":{"$data":{"data":{"value":"密码"},"style":{"color":"#747C86","fontSize":20,"lineHeight":20},"chart":{}}},"event":[],"function":[]},"1ac19f09-63fa-4878-9a5e-3bd7fac1ec19-1598338298713":{"name":"IdeButton","base":{"uuid":"1ac19f09-63fa-4878-9a5e-3bd7fac1ec19-1598338298713","$data":{"baseStyle":{"width":"465","height":"60","left":1222,"top":720,"zIndex":"auto"}}},"extend":{"$data":{"data":{"value":"登录"},"style":{"color":"#fff","background":"#4198FC","fontSize":20,"borderRadius":"16px"},"chart":{}}},"event":[],"function":[]},"5b2eb600-cf62-44c7-b12b-f9e233267129-1598338748527":{"name":"IdeText","base":{"uuid":"5b2eb600-cf62-44c7-b12b-f9e233267129-1598338748527","$data":{"baseStyle":{"width":68,"height":"16","left":1561,"top":625,"zIndex":"auto"}}},"extend":{"$data":{"data":{"value":"忘记密码"},"style":{"color":"#FFFFFF","fontSize":"16","lineHeight":"16"},"chart":{}}},"event":[],"function":[]},"fd2c20a6-e468-465f-b584-5a27d8f9e9e7-1598339336086":{"name":"IdeText","base":{"uuid":"fd2c20a6-e468-465f-b584-5a27d8f9e9e7-1598339336086","$data":{"baseStyle":{"width":35,"height":"16","left":"1653","top":625,"zIndex":"auto"}}},"extend":{"$data":{"data":{"value":"注册"},"style":{"color":"#FFFFFF","fontSize":"16","lineHeight":"16"},"chart":{}}},"event":[],"function":[]}}