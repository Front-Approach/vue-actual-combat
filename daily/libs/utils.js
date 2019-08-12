import axios from 'axios';

// 基本配置
const Util = {
    imgPath: 'http://127.0.0.1:8011/img/',
    apiPath: 'http://127.0.0.1:8010;'
};

// ajax通用配置
Util.ajax = axios.create({
    basicURL: Util.apiPath
});

// 添加相应拦截器
Util.ajax.interceptors.response.use(res => {
    return res.data;
})

export default Util;
