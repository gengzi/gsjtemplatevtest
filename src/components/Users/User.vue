<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" class="breadcrumb_style">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片导航区域 -->
    <el-card class="card_style">
      <!-- 栅格布局 -->
      <el-row>
        <!-- 查询框 -->
        <el-col :span="10">
          <el-input
            v-model="qryParams.query"
            placeholder="请输入内容"
            class="input-with-select"
            clearable
            @clear="clearParams()"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="qryUserListByUsername()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 添加用户按钮 -->
          <el-button
            style="margin-left:10px;"
            type="primary"
            @click="showUserInfo()"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <template>
        <!-- 数据表格 -->
        <el-table :data="userList" style="width: 100%" v-loading="loading">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="username" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="editMgstate(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <!-- template 作用域插槽 -->
            <template slot-scope="scope">
              <!-- 编辑 -->
              <el-tooltip
                content="编辑"
                placement="top-start"
                :enterable="false"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="editUserInfoById(scope.row)"
                ></el-button>
              </el-tooltip>
              <!-- 分配角色 -->
              <el-tooltip content="分配角色" placement="top" :enterable="false">
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  circle
                ></el-button>
              </el-tooltip>
              <!-- 删除 -->
              <el-tooltip content="删除" placement="top-end" :enterable="false">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="delUsrInfoById(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="qryParams.pagenum"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="qryParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加的dialog  -->
    <el-dialog
      title="添加用户信息"
      :visible.sync="adddialogVisible"
      width="50%"
      @close="addDialogClosed()"
    >
      <!-- 对话框主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserInfo()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑的dialog  -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editdialogVisible"
      width="50%"
      @close="editDialogClosed()"
    >
      <!-- 对话框主体区域 -->
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 邮箱校验规则  rule  value 现在的值 ， callback 回调函数
    var validateEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        // 成功
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的邮箱'))
    }
    // 电话号码校验规则
    var validateMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
    return {
      // 请求参数
      qryParams: {
        query: null,
        pagenum: 1,
        pagesize: 3
      },
      // 总条数
      total: 0,
      // 用户列表数据
      userList: [],
      // loading 加载
      loading: true,
      // add dialog 是否展示
      adddialogVisible: false,
      // 添加页面表单数据项
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑页面是否展示
      editdialogVisible: false,
      // 编辑表单数据项
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 表单校验规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          {
            validator: validateMobile,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  // 生命周期函数 创建时，加载用户列表数据
  created() {
    this.getUsersList()
  },
  methods: {
    // 获取用户列表信息
    async getUsersList() {
      // 加载loading动画
      this.loading = true
      let { data: res } = await this.$http.get('users', {
        params: this.qryParams
      })
      // 判断是否返回成功
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表数据失败，请联系管理员！')
      }
      this.userList = res.data.users
      this.total = res.data.total
      // 关闭加载loading
      this.loading = false
    },
    // pagesize 改变时触发 pagesize每页显示的条数
    handleSizeChange(newSize) {
      // 赋值pagesize
      console.log('newSize :', newSize)
      this.qryParams.pagesize = newSize
      // 重新加载数据列表
      this.getUsersList()
    },
    // 页码发生改变时触发
    handleCurrentChange(current) {
      this.qryParams.pagenum = current
      // 重新加载数据列表
      this.getUsersList()
    },
    // 修改用户的状态方法
    async editMgstate(row) {
      let { data: res } = await this.$http.put(
        `users/${row.id}/state/${row.mg_state}`
      )
      if (res.meta.status !== 200) {
        // 修改失败，将用户状态重新修改回来
        row.mg_state = !row.mg_state
        return this.$message.error('修改用户状态失败，请联系管理员！')
      }
      this.$message.success('修改用户状态成功！')
    },
    // 根据用户名查询数据
    qryUserListByUsername() {
      // 只有搜索框中有数据，才查询
      if (this.qryParams.query !== null) {
        this.getUsersList()
      }
    },
    // 清空搜索框
    clearParams() {
      this.getUsersList()
    },
    // 添加用户信息
    showUserInfo() {
      // 弹出添加页面
      this.adddialogVisible = true
    },
    // 新增用户
    addUserInfo() {
      // 判断是否满足校验规则
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整用户信息')
        let { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          // 添加用户失败
          return this.$message.error('添加用户失败')
        }
        this.$message.success('添加用户成功')
        // 关闭对话框
        this.addDialogVisible = false
        // 重新加载数据列表
        this.getUsersList()
      })
    },
    // 关闭添加表单事件
    addDialogClosed() {
      // 对话框关闭之后，重置表达
      this.$refs.addFormRef.resetFields()
    },
    // 删除用户
    async delUsrInfoById(row) {
      const confirmResult = await this.$confirm('是否删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用户点击确认，则confirmResult 为'confirm'
      // 如果用户点击取消, 则confirmResult获取的就是catch的错误消息'cancel'
      if (confirmResult !== 'confirm') {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      } else {
        const { data: res } = await this.$http.delete('users/' + row.id)
        if (res.meta.status !== 200) {
          return this.$message.error('删除该用户失败，请联系管理员！')
        }
        // 修改成功的提示
        this.$message.success('删除用户成功')
        // 重新请求最新的数据
        this.getUsersList()
      }
    },
    // 显示编辑用户信息页面
    async editUserInfoById(row) {
      console.log('row :', row)
      // 先查询后台封装编辑的信息数据
      const { data: res } = await this.$http.get('users/' + row.id)
      if (res.meta.status !== 200) {
        // 获取数据失败
        return this.$message.error('编辑用户失败,请联系管理员！')
      }
      // 弹出编辑页面
      this.editForm = res.data
      this.editdialogVisible = true
    },
    // 修改用户信息
    async editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整用户信息')
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          this.editForm
        )
        if (res.meta.status !== 200) {
          this.editdialogVisible = false
          return this.$message.error('修改用户信息失败,请联系管理员！')
        }
        this.$message.success('修改用户信息成功！')
        // 关闭编辑页面
        this.editdialogVisible = false
        // 重新加载数据
        this.getUsersList()
      })
    },
    // 关闭编辑页面
    editDialogClosed() {
      // 对话框关闭之后，重置表达
      this.$refs.editFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.breadcrumb_style {
  margin: 20px 0;
  margin-left: 20px;
  font-size: 15px;
}
.card_style {
  margin: 0 20px;
}
</style>
