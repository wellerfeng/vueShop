<script>
import { dalImg, removeToken } from "../utils/tools";
import { loadUserInfoAPI } from "../services/auth";
export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.loadUserData();
  },
  methods: {
    logOutHandle() {
      removeToken();
      this.$router.push({ name: "Home" });
    },
    async loadUserData() {
      const res = await loadUserInfoAPI();
      this.user = { ...res.data, avatar: dalImg(res.data.avatar) };
    },
  },
};
</script>
<template>
  <div class="user">
    <img class="avatar" :src="user.avatar" alt="" />
    <h3 class="txt-name">{{ user.nickName || user.userName }}</h3>
    <p class="txt-price">余额:￥200</p>
    <van-cell-group>
      <van-cell title="我的订单" is-link />
      <van-cell title="我的积分" is-link />
      <van-cell title="我的余额" is-link />
      <van-cell title="收货地址" is-link />
      <van-cell title="个人信息" is-link :to="{ name: 'UserInfo' }" />
      <van-cell title="修改密码" is-link />
    </van-cell-group>

    <van-button
      type="danger"
      block
      style="width: 80vw; margin: 8px auto"
      @click="logOutHandle"
      >退出</van-button
    >
  </div>
</template>
<style scoped lang="scss">
.user {
  .avatar {
    display: block;
    margin: 16px auto;
    width: 45vw;
    height: 45vw;
    border-radius: 50%;
  }
  .txt-name {
    text-align: center;
  }
  .txt-price {
    text-align: center;
    color: red;
    font-weight: bold;
  }
}
</style>
