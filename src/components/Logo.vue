<template>
  <div class="logo">
    <img
      class="logo"
      src="https://img0.baidu.com/it/u=1817437106,546016970&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      alt=""
      @click="
        $router.push({
          name: 'Home',
        })
      "
    />
  </div>
</template>
<style scoped lang="scss">
.logo {
  display: block;
  margin: 24px auto;
  width: 35vw;
  height: 35vw;
  border-radius: 20px;
}
</style>
