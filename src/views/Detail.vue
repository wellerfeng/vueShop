<script>
import { showToast } from "vant";
import { getToken } from "../utils/tools";
import { loadProductByIdAPI, addToCartAPI } from "../services/products";
export default {
  data() {
    return {
      product: {},
    };
  },
  async created() {
    const res = await loadProductByIdAPI(this.$route.params.id);
    this.product = res.data;
  },
  methods: {
    async addToCart() {
      if (getToken()) {
        await addToCartAPI(this.product.id, 1, this.product.price);
        showToast("加入购物车成功");
      } else {
        showToast("请登录");
      }
    },
    toCart() {
      this.$router.push({
        name: "Cart",
      });
    },
  },
};
</script>
<template>
  <div class="detail">
    <h1>{{ product.name }}</h1>
    <div class="content" v-html="product.content"></div>
    <van-action-bar>
      <van-action-bar-icon
        icon="home-o"
        text="首页"
        @click="$router.push({ name: 'Home' })"
        dot
      />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        badge="5"
        @click="toCart"
      />
      <!-- <van-action-bar-icon icon="shop-o" text="店铺" badge="12" /> -->
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="addToCart"
      />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
  </div>
</template>
