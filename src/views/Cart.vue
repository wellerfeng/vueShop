<script>
import {
  loadCartAPI,
  delFromCartAPI,
  addToCartAPI,
} from "../services/products";
import { dalImg } from "../utils/tools";
export default {
  data() {
    return {
      // checked: false,
      carts: [],
    };
  },
  created() {
    this.loadCartData();
  },
  computed: {
    chkAll: {
      set(v) {
        this.carts.forEach((item) => (item.checked = v));
      },
      get() {
        return this.carts.every((item) => item.checked);
      },
    },
    totalPrice() {
      return (
        this.carts
          .filter((item) => item.checked)
          .reduce((pre, cur) => pre + cur.amount * cur.product.price, 0) * 100
      );
    },
  },
  methods: {
    async loadCartData() {
      const res = await loadCartAPI();
      // console.log(res);
      this.carts = res.data
        .filter((item) => item.product)
        .map((item) => {
          // 处理服务器端返回的数据
          return {
            ...item,
            checked: false,
            product: {
              ...item.product,
              coverImage: dalImg(item.product.coverImage),
            },
          };
        });
    },
    onSubmit() {},
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({
        name: "Home",
      });
    },
    // 删除
    async delFromCart(id) {
      await delFromCartAPI(id);
      this.loadCartData();
    },
    // 改变数量
    async addToCart(id, amount, price) {
      await addToCartAPI(id, amount, price);
    },
  },
};
</script>
<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-swipe-cell v-for="i in carts">
      <van-card
        :price="i.product.price.toFixed(2)"
        :title="i.product.name"
        class="goods-card"
        :thumb="i.product.coverImage"
      >
        <template #tag>
          <van-checkbox v-model="i.checked"></van-checkbox>
        </template>
        <template #footer>
          <van-stepper
            v-model="i.amount"
            @minus="addToCart(i.product.id, -1, i.product.price)"
            @plus="addToCart(i.product.id, 1, i.product.price)"
          />
        </template>
      </van-card>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          @click="delFromCart(i.id)"
          class="delete-button"
        />
      </template>
    </van-swipe-cell>
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="chkAll">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>
<style scoped lang="scss">
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>
