// https://axios-http.com/zh/docs/intro
import axios from "axios";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import { getToken, serverUrl } from "./tools";

const instance = axios.create({
  timeout: 5000, // 网络请求超时时间，超过这个时间之后自动断开连接
  baseURL: serverUrl, // 网络请求的基础地址
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log("之前");
    NProgress.start(); // 显示进度条
    config.headers.token = getToken();
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // console.log("之后");
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    NProgress.done(); // 清除
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // console.dir(error);
    // 对状态码做统一的处理
    NProgress.done();
    if (error.response.status === 401) {
      // window.location.href = "/#/login";
    }
    return Promise.reject(error);
  }
);

// 封装拦截

/**
 * 自己封装一个get请求
 * @param {*} url     请求的地址
 * @param {*} params  请求的时候url中传递的参数
 * @returns
 */
export const get = (url, params) =>
  instance.get(url, {
    params,
  });

/**
 * 发起post请求
 * @param {*} url   请求的地址
 * @param {*} data  传递的数据
 * @returns
 */
export const post = (url, data) => instance.post(url, data);

/**
 * 发起put请求
 * @param {*} url
 * @param {*} data
 * @returns
 */
export const put = (url, data) => instance.put(url, data);

/**
 * 删除
 * @param {*} url
 * @returns
 */
export const del = (url) => instance.delete(url);

export default instance;
