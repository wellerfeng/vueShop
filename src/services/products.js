import { del, get, post } from "../utils/request";

/**
 * 获取商品列表
 * @returns
 */
export const loadProductsAPI = (page = 1, category = "") =>
  get("/api/v1/products", {
    page,
    category,
  });

/**
 * 根据id获取详情
 * @param {*} id
 * @returns
 */
export const loadProductByIdAPI = (id) => get("/api/v1/products/" + id);

/**
 * 获取商品分类
 * @returns
 */
export const loadCategoriesAPI = () => get("/api/v1/product_categories");

/**
 * 加入购物车
 * @param {*} product
 * @param {*} amount
 * @param {*} price
 * @returns
 */
export const addToCartAPI = (product, amount = 1, price = 0) =>
  post("/api/v1/shop_carts", {
    product,
    amount,
    price,
  });

/**
 * 获取购物车数据
 * @returns
 */
export const loadCartAPI = () => get("/api/v1/shop_carts");

/**
 * 根据id删除购物车数据
 * @param {*} id
 * @returns
 */
export const delFromCartAPI = (id) => del("/api/v1/shop_carts/" + id);
