import { createRouter, createWebHashHistory } from "vue-router";
import { getToken } from "./utils/tools";

const routes = [
  {
    path: "/", // url中访问的地址
    component: () => import("./views/Home.vue"), // 访问这个地址的时候对应的组件
    name: "Home", // 就是一个名字
  },
  {
    path: "/list",
    component: () => import("./views/List.vue"),
    name: "List",
  },
  {
    path: "/cart",
    component: () => import("./views/Cart.vue"),
    name: "Cart",
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/user",
    component: () => import("./views/User.vue"),
    name: "User",
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/user/info",
    component: () => import("./views/UserInfo.vue"),
    name: "UserInfo",
    meta: {
      needLogin: true,
      hideTabBar: true,
    },
  },
  {
    path: "/login",
    component: () => import("./views/Login.vue"),
    name: "Login",
    meta: {
      hideTabBar: true,
    },
  },
  {
    path: "/reg",
    component: () => import("./views/Reg.vue"),
    name: "Reg",
    meta: {
      hideTabBar: true,
    },
  },
  {
    path: "/list/:id",
    component: () => import("./views/Detail.vue"),
    name: "Detail",
    meta: {
      hideTabBar: true,
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫，判断是否登录
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (getToken()) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  } else {
    next();
  }
});

export default router;
