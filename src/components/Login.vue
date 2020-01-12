<template>
  <!-- login 组件 -->
  <div class="login_container">
    <!-- 登陆盒子 ，栅格布局-->
    <div class="login_box">
      <!-- 登陆头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="头像" />
      </div>
      <!-- 登陆表单 -->
      <el-form
        ref="LoginFormRef"
        :model="loginForm"
        :rules="rules"
        class="login_form"
      >
        <!-- 登陆名称 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 登陆密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <!-- 登陆按钮 -->
          <el-button type="primary" @click="sublogin('LoginFormRef')"
            >登陆</el-button
          >
          <!-- 重置按钮 -->
          <el-button @click="resetLoginForm('LoginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单绑定的属性
      loginForm: {
        username: '',
        password: ''
      },
      // 添加校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登陆请求
    sublogin(formName) {
      // 首选验证表单输入项是否有误
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 请求后台，进行登陆
          console.log('this.$http :', this.$http)
          const { data: res } = await this.$http.post('login', this.loginForm)
          console.log('res :', res)
          if (res.meta.status !== 200) {
            // 登陆失败,提示用户
            return this.$message({ message: '登陆失败', type: 'warning' })
          } else {
            // 登陆成功，跳转到登录页面
            this.$message({
              message: '登陆成功，正在跳转请稍等...',
              type: 'success'
            })
            // 保存token 到 sessionStorage
            window.sessionStorage.setItem('token', res.data.token)
            // 导航到管理页面 /home
            this.$router.push('/home')
          }
        } else {
          console.log('请求失败!!')
          return false
        }
      })
    },
    // 重置表单
    resetLoginForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
// Less 是一门 CSS 预处理语言
// 没有scoped 样式就是全局的
.login_container {
  background-color: #2b5b6b;
  //  高度为100%
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  //   设置居中
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // 设置背景颜色
  background-color: #ffffff;
  border-radius: 3px;
  .avatar_box {
    border: solid 1px #eee;
    height: 130px;
    width: 130px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    box-shadow: 0 0 10px #ddd;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
      // 设置圆角
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  width: 100%;
  position: absolute;
  padding: 0 20px;
  box-sizing: border-box;
  bottom: 0;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
