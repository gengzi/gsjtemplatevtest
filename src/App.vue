<template>
  <!-- 模板文件 -->
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
// js
// 设置默认导出
export default {
  name: 'app'
}
</script>

<style scoped>
/* 样式文件，使用scoped 定义的样式只会对当前模板文件生效 */
</style>
