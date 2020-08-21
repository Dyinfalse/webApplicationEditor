import Event from './Event';
import axios from 'axios';
/**
 * Http请求事件
 */
export default class HttpEvent extends Event {
    /**
     * 请求地址
     */
    url = '';
    /**
     * 请求方法
     */
    method = 'POST';
    /**
     * 请求参数
     */
    data = [];

    constructor () {
        super()
    }
    /**
     * @override
     * 请求方法封装
     */
    run = () => {
        let _data = {}
        this.data.map(field => {
            _data[field.key] = field.value;
        })
        return axios({
            method: this.method,
            url: this.url,
            data: {"org_user_id":"admin",
            "org_dept_id":"",
            "org_term_no":"",
            "orguser_cn_name":"",
            "orgdept_cn_name":"",
            "org_channel_code":"01",
            "org_work_code":"",
            "submit_type":"1",
            "org_dprl_expls":"",
            "br_sbsbno":"",
            "work_seq":"",
            "user_passwd":"ys123456",
            "org_srv_name":"us_UserLoginInAction"}
          });
    }
}