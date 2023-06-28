<script>
import { dalImg } from "../utils/tools";
import { loadProductsAPI, loadCategoriesAPI } from "../services/products";

export default {
  data() {
    return {
      keyword: "",
      banners: [
        {
          id: 1,
          img: "https://m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/127372/23/30729/141309/6406e969F770482c5/de2bf999cfb1db14.jpg!cr_1053x420_4_0!q70.jpg",
        },
        {
          id: 2,
          img: "https://m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/127372/23/30729/141309/6406e969F770482c5/de2bf999cfb1db14.jpg!cr_1053x420_4_0!q70.jpg",
        },
      ],
      products: [],
      categories: [],
    };
  },
  async created() {
    // get("/api/v1/products").then((res) => {
    //   console.log(res);
    // });
    // loadProductsAPI().then((res) => {
    //   console.log(res);
    // });
    const res = await loadProductsAPI();
    const resCategories = await loadCategoriesAPI();
    // console.log(res);
    this.products = res.data.map((item) => ({
      ...item,
      coverImage: dalImg(item.coverImage),
    }));

    this.categories = resCategories.data.map((item) => ({
      ...item,
      coverImage: dalImg(item.coverImage),
    }));
  },
  methods: {
    loadData() {},
    onClickButton() {},
    toDetail(id) {
      this.$router.push({
        name: "Detail",
        params: {
          id,
        },
      });
    },
  },
};
</script>
<template>
  <div class="home">
    <van-search v-model="keyword" show-action placeholder="请输入搜索关键词">
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      :show-indicators="true"
    >
      <van-swipe-item v-for="item in banners" :key="item.id">
        <img :src="item.img" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in categories"
        :key="item.id"
        :icon="item.coverImage"
        :text="item.name"
        :to="{ name: 'List', query: { tid: item.id } }"
      />
    </van-grid>
    <van-card
      v-for="item in products"
      num="2"
      @click-thumb="toDetail(item.id)"
      :price="item.price.toFixed(2)"
      :title="item.name"
      :thumb="item.coverImage"
    />
  </div>
</template>
<style scoped lang="scss">
/* .my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
} */
.my-swipe {
  img {
    width: 100%;
  }
}
</style>
