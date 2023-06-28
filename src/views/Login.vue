<script>
import "vant/es/toast/style";
import { showToast } from "vant";
import Logo from "../components/Logo.vue";
import { loginAPI } from "../services/auth";
import { setToken } from "../utils/tools";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {
    Logo,
  },
  methods: {
    async onSubmit(v) {
      const res = await loginAPI(v);
      if (res.code == 1) {
        showToast("登录成功");
        setToken(res.data);
        this.$router.push({
          name: "User",
        });
      } else {
        showToast(res.data);
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
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <router-link style="float: right; margin-right: 12px" :to="{ name: 'Reg' }"
      >没有账号,我要注册</router-link
    >
  </div>
</template>
<style scoped lang="scss">
.title {
  text-align: center;
}
</style>
