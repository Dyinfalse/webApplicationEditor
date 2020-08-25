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
        super();
    }
    /**
     * @override
     * 请求方法封装
     */
    run = () => {
        let _data = {};
        this.data.map(field => {
            _data[field.key] = field.value;
        })

        return axios({
            method: this.method,
            url: this.url,
            data: _data
        });
    }
}