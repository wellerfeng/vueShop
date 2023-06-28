import { get, post, put } from "../utils/request";

/**
 * 登录
 * @param {*} data useName password
 * @returns
 */
export const loginAPI = (data) => post("/api/v1/auth/login", data);

/**
 * 注册
 * @param {*} data
 * @returns
 */
export const regAPI = (data) => post("/api/v1/auth/reg", data);

/**
 * 获取个人信息
 * @returns
 */
export const loadUserInfoAPI = () => get("/api/v1/user/info");

/**
 * 修改个人信息
 * @param {*} data
 * @returns
 */
export const modifyUserInfoAPI = (data) => put("/api/v1/user/modify", data);
