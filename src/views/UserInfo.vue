<script>
import { post } from "../utils/request";
import { dalImg } from "../utils/tools";
import { modifyUserInfoAPI, loadUserInfoAPI } from "../services/auth";
export default {
  async created() {
    const res = await loadUserInfoAPI();
    this.img = [
      {
        url: dalImg(res.data.avatar),
      },
    ];
    this.imgUrl = res.data.avatar;
    this.nickName = res.data.nickName;
  },
  data() {
    return {
      nickName: "",
      img: [], // 组件展示的数据 [{url: '图片地址'}]
      imgUrl: "", // 我们存储的数据
    };
  },
  methods: {
    async afterRead(file) {
      // console.log(file);
      const formData = new FormData();
      formData.append("file", file.file);
      const res = await post("/api/v1/common/upload_file", formData);
      // console.log(res);
      this.imgUrl = res.data;
      this.img = [
        {
          url: dalImg(res.data),
        },
      ];
    },
    async save() {
      // 修改个人信息
      await modifyUserInfoAPI({
        avatar: this.imgUrl,
        nickName: this.nickName,
      });
      this.$router.push({
        name: "User",
      });
    },
  },
};
</script>
<template>
  <div class="info">
    <van-nav-bar
      title="修改个人信息"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-uploader
      style="display: block; margin: 16px auto"
      v-model="img"
      :max-count="1"
      :after-read="afterRead"
    />
    <van-cell-group inset>
      <van-field
        :border="true"
        v-model="nickName"
        label="昵称"
        placeholder="请输入昵称"
      />
    </van-cell-group>
    <van-button
      type="primary"
      style="width: 70%; display: block; margin: 16px auto"
      @click="save"
      >保存</van-button
    >
  </div>
</template>
<style scoped>
/* :deep这种写法可以改变组件内的样式 */
/* https://cn.vuejs.org/api/sfc-css-features.html#scoped-css */
:deep(.van-uploader__wrapper) {
  justify-content: center;
}
</style>
