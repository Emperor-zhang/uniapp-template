import axios from "axios";
//创建axios对象

// 使用多种创建方法 是为了应对多个域名  如果要创建多个请求需求 使用第一种
// ##两种创建方法：
// 1.定义一个instance变量 发送请求是把axios替换成instance
export let instance = axios.create({
  baseURL: "https://wb.jaas.ac.cn/ketianxia.se.201027", //会在发送请求的时候自动拼接在url前面
  timeout: 5000,
});

// 2.使用defaults.baseURL直接赋值  发送请求的时候 方法不变
// axios.defaults.baseURL = "https://api-hmugo-web.itheima.net/api/public/v1/";
// export function getResquest(url, params) {
//   return axios.get(url, {
//     params,
//   });
// }
// 请求拦截
// 所有的请求都会先走这个方法
instance.interceptors.request.use(
  function(config) {
    // debugger;
    config.url = config.baseURL + config.url;
    // console.group("全局请求拦截");
    // console.log(config);
    // console.groupEnd();
    uni.showLoading({
      title: "加载中",
    });
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);
// 响应拦截
// 所有的网络请求返回数据之后都会走这个方法
instance.interceptors.response.use(
  function(response) {
    // console.group("全局响应拦截");
    // console.log(response);
    // console.groupEnd();
    uni.hideLoading();
    return response;
  },
  function(err) {
    return Promise.reject(err);
  }
);

//真机获取
axios.defaults.adapter = function(config) {
  return new Promise((resolve, reject) => {
    var settle = require("axios/lib/core/settle");

    var buildURL = require("axios/lib/helpers/buildURL");

    uni.request({
      method: config.method.toUpperCase(),

      url: buildURL(config.url, config.params, config.paramsSerializer),

      header: config.headers,

      data: config.data,

      dataType: config.dataType,

      responseType: config.responseType,

      sslVerify: config.sslVerify,

      complete: function complete(response) {
        response = {
          data: response.data,

          status: response.statusCode,

          errMsg: response.errMsg,

          header: response.header,

          config: config,
        };

        settle(resolve, reject, response);
      },
    });
  });
};
