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

    constructor (config) {
        super(config);
        if(config){
            this.url = config.url;
            this.method = config.method;
            this.data = config.data;
        }
    }
    /**
     * @Override
     * 请求方法封装
     */
    run = () => {
        let _data = {};
        this.data.map(field => {
            /**
             * 判断该参数是组件映射还是手动输入
             */
            if(field.mapping == 'unMapping') {
                _data[field.key] = field.value;
            } else {
                _data[field.key] = this.getVue(field.mapping).$data.data[field.mappingKey];
            }
        })

        return axios({
            method: this.method,
            url: this.url,
            data: _data
        });
    }


    /**
     * @Override
     */
    toJson() {
        return {
            ...super.toJson(),
            url: this.url,
            method: this.method,
            data: this.data
        }
    }
}