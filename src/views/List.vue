<script>
import { loadProductsAPI, loadCategoriesAPI } from "../services/products";
import { dalImg } from "../utils/tools";
export default {
  data() {
    return {
      active: 0,
      categories: [],
      products: [],
      loading: false, // 是否在加载中
      finished: false, // 是否完成
      page: 1, // 页码
      tid: this.$route.query.tid,
    };
  },
  created() {
    // this.loadProductData();
    this.loadCategories();
  },
  // 路由地址改变,但是组件被复用的时候执行
  beforeRouteUpdate(to, from) {
    // console.log(to);
    this.page = 1; // 重置页码
    this.loading = false; // 设置loading为false
    this.finished = false; // 设置没有加载完成
    this.tid = to.query.tid; // 设置当前的分类id
    this.products = [];
    this.loadProductData();
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        name: "Detail",
        params: {
          id,
        },
      });
    },
    async loadCategories() {
      const res = await loadCategoriesAPI();
      this.categories = res.data.map((item) => ({
        ...item,
        coverImage: dalImg(item.coverImage),
      }));
      this.categories.unshift({
        id: "",
        name: "全部",
      });
      // 设置侧边栏导航选中的位置
      const index = this.categories.findIndex(
        (item) => item.id == this.$route.query.tid
      );
      this.active = index > -1 ? index : 0;
    },
    // load
    async loadProductData() {
      this.loading = true; // 设置正在加载中
      const res = await loadProductsAPI(this.page, this.tid); // 取数据
      this.finished = res.data.length === 0; // 长度为0表示加载完成
      this.loading = false; // 取数据完成
      this.page++; // 页码加一
      // 数据拼接
      this.products.push(
        ...res.data.map((item) => ({
          ...item,
          coverImage: dalImg(item.coverImage),
        }))
      );
    },
  },
};
</script>
<template>
  <div class="list">
    <van-sidebar v-model="active">
      <van-sidebar-item
        v-for="item in categories"
        :title="item.name"
        :key="item.id"
        :to="{
          name: 'List',
          query: {
            tid: item.id,
          },
        }"
      />
    </van-sidebar>
    <!-- <div class="right-content"> -->
    <van-list
      class="right-content"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadProductData"
    >
      <van-card
        num="2"
        :key="i.id"
        @click-thumb="toDetail(i.id)"
        v-for="i in products"
        :price="i.price.toFixed(2)"
        :title="i.name"
        :thumb="i.coverImage"
      />
    </van-list>

    <!-- </div> -->
  </div>
</template>
<style scoped lang="scss">
.list {
  display: flex;
  .right-content {
    flex: 1;
    overflow: auto;
  }
}
</style>
