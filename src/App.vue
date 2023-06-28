<script>
export default {
  data() {
    return {
      isShowTabBar: true,
    };
  },
  watch: {
    $route(v) {
      if (v.meta.hideTabBar) {
        this.isShowTabBar = false;
      } else {
        this.isShowTabBar = true;
      }
    },
  },
};
</script>
<template>
  <div class="container">
    <router-view class="main"></router-view>
    <van-tabbar route :fixed="false" v-show="isShowTabBar">
      <van-tabbar-item icon="home-o" :to="{ name: 'Home' }"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="fire-o" :to="{ name: 'List' }"
        >热卖</van-tabbar-item
      >
      <van-tabbar-item icon="shopping-cart-o" :to="{ name: 'Cart' }"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" :to="{ name: 'User' }"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    overflow: auto;
  }
}
</style>
