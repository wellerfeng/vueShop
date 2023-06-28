<script>
import { post } from "../utils/request";
import uploadIcon from "../assets/images/upload.png"; // 需要先引入
export default {
  data() {
    return {
      avatar: "",
      uploadIcon,
    };
  },
  methods: {
    selImg() {
      this.$refs.fileCtrl.click();
    },
    selFileEnd(e) {
      // console.log(e);
      // console.log(e.target.files[0]); // 获取文件
      // 文件上传需要使用FormData
      // https://developer.mozilla.org/zh-CN/docs/Web/API/FormData
      const formData = new FormData();
      // append表示为formData设置数据的意思
      //  参数一 表示属性名，名字是由服务器端接口指定的
      //  参数二 表示数据的值
      formData.append("file", e.target.files[0]);
      post("/api/v1/common/upload_file", formData).then((res) => {
        // console.log(res);
        this.avatar = "http://localhost:1337" + res.data;
      });
    },
  },
};
</script>
<template>
  <div class="user">
    <h1>我的</h1>
    <!-- 点击之后触发input的点击事件 -->
    <img
      style="width: 100px; height: 100px; border-radius: 16px"
      :src="avatar ? avatar : uploadIcon"
      @click="selImg"
      alt=""
    />
    <!-- change事件监听选择改变 -->
    <input
      type="file"
      style="display: none"
      ref="fileCtrl"
      @change="selFileEnd"
    />
  </div>
</template>
