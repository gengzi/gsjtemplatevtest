<template>
  <div id="home">
    <el-button type="info" round @click="loginOut()">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    // 退出登录
    loginOut() {
      // 把 sessionStorage 的token 清空
      window.sessionStorage.clear()
      // 返回到登陆页面
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped></style>
