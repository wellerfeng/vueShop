<script>
import { showToast } from "vant";
import Logo from "../components/Logo.vue";
import { regAPI } from "../services/auth";
import { setToken } from "../utils/tools";
export default {
  data() {
    return {
      username: "",
      password: "",
      repassword: "",
    };
  },
  components: {
    Logo,
  },
  methods: {
    async onSubmit(v) {
      // console.log(v);
      if (this.password == this.repassword) {
        const res = await regAPI({
          userName: this.username,
          password: this.password,
        });
        console.log(res);
        if (res.code == 1) {
          showToast("注册成功");
          setToken(res.data); // 存token
          // 页面跳转
          this.$router.push({
            name: "User",
          });
        } else {
          showToast(res.data);
        }
      } else {
        // alert("两次输入的密码不一致");
        showToast("两次输入的密码不一致");
      }
    },
  },
};
</script>
<template>
  <div class="login">
    <h1 class="title">香格里拉精选店</h1>
    <Logo />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="userName"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="repassword"
          type="password"
          name="密码"
          label="确认密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <router-link
      style="float: right; margin-right: 12px"
      :to="{ name: 'Login' }"
      >已有账号,我要登录</router-link
    >
  </div>
</template>
<style scoped lang="scss">
.title {
  text-align: center;
}
</style>
