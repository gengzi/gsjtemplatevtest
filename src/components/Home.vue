<template>
  <div class="home_style">
    <!-- 引入布局容器 -->
    <el-container>
      <el-header>
        <!-- header头部 -->
        <div class="login_style">
          <!-- 图标，标题 -->
          <img src="../assets/logo.png" alt="" class="icon_img" />
          <span>后台管理</span>
        </div>
        <!-- 菜单项的展开关闭按钮 -->
        <div class="header_content_style">
          <el-button
            type="text"
            class="el-icon-s-fold"
            @click="toggleCollapse()"
          ></el-button>
        </div>
        <!-- 退出登陆按钮 -->
        <el-button type="info" round @click="loginOut()">退出</el-button>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 左菜单列表区域 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <!-- 菜单项区域  unique-opened 是否只保持一个子菜单的展开默认 fasle-->
          <el-menu
            :unique-opened="true"
            active-text-color
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
          >
            <!-- 菜单项 -->
            <!-- 一级菜单 index:唯一标志 -->
            <el-submenu
              :index="'/' + menuItem.path"
              v-for="menuItem in menuList"
              :key="menuItem.id"
            >
              <template slot="title">
                <!-- 菜单项图标 -->
                <i :class="iconsObj[menuItem.id]"></i>
                <!-- 菜单项内容 -->
                <span slot="title">{{ menuItem.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/' + menuItem.path"
                v-for="menu in menuItem.children"
                :key="menu.id"
              >
                <template slot="title">
                  <!-- 菜单项图标 -->
                  <i :class="iconsObj[menu.id]"></i>
                  <!-- 菜单项内容 -->
                  <span slot="title">{{ menu.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-menu-item> </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 内容页区域 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- 底部区域 -->
      <el-footer style="height:25px;">Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 侧边菜单项数据
      menuList: null,
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false
    }
  },
  // 生命周期函数（钩子函数）- 创建时，去获取菜单数据
  created() {
    // 调用获取侧边菜单数据方法
    this.getMenuItems()
  },
  methods: {
    // 获取菜单项数据
    async getMenuItems() {
      // 使用 async  和 await 简化 axios 获取得到的 promise 对象
      const { data: res } = await this.$http.get('menus')
      // 获取失败，提示
      if (res.meta.status !== 200) {
        this.$message.error('获取菜单数据失败')
      }
      this.menuList = res.data
      console.log('menuList :', this.menuList)
    },
    // 退出登录
    loginOut() {
      // 把 sessionStorage 的token 清空
      window.sessionStorage.clear()
      // 返回到登陆页面
      this.$router.push('/login')
    },
    // 菜单栏水平展开关闭
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home_style,
.el-container {
  height: 100%;
}
.el-header {
  padding-left: 0;
  line-height: 60px;
  // 弹性布局
  display: flex;
  // justify-content容器属性定义了项目在主轴上的对齐方式, 两端对齐
  justify-content: space-between;
  // 定义元素对齐方式
  align-items: center;
  .login_style {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 235px;
    color: #35495e;
  }
  .header_content_style {
    width: 100%;
    display: flex;
    margin-left: 15px;
    justify-content: flex-start;
  }
  span {
    // margin-left: 15px;
  }
}

.icon_img {
  width: 28px;
  height: 28px;
}
.el-main {
  background-color: #f2edf3;
}
.el-menu {
  font-size: 12px;
}
</style>
