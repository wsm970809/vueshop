<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="navUser">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入要搜索的内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <!-- slot="append 在input尾部追加button -->
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="isaddUser=true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border class="tableMsg">
        <el-table-column prop="id" label="#" width="100"></el-table-column>
        <el-table-column prop="username" label="姓名" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="190"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="150"></el-table-column>
        <el-table-column label="状态" width="120">
          <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#B3B7BF"
              @change="changeStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" width="137">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              title="s"
              @click="editUser(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="delUser(scope.row.id)"
            ></el-button>
            <!-- 分配角色 -->
            <el-button
              type="warning"
              icon="el-icon-star-off"
              circle
              size="mini"
              @click="rolUser(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2,4,6,8]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog :visible.sync="isaddUser" width="40%" title="添加用户" @close="closeAdd">
      <el-form
        :model="addForm"
        ref="addFormRef"
        :rules="addFormRules"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser()">提交</el-button>
          <el-button @click="closeAdd()">重置</el-button>
          <el-button @click="isaddUser = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="isEditUser" width="40%" title="添加用户" @close="closeEdit">
      <el-form
        :model="editForm"
        ref="editFormRef"
        :rules="editFormRules"
        status-icon
        @close="closeAdd"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmEdit()">提交</el-button>
          <el-button @click="closeEdit()">重置</el-button>
          <el-button @click="isEditUser = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <!-- <el-dialog title="分配角色" :visible.sync="isrolUser" width="50%" @close="rolUserClosed">
      <div>
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.role_name}}</p>
        <p>
          分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<style lang="less" scoped>
.navUser {
  margin-bottom: 10px;
}
.tableMsg {
  margin-top: 10px;
}
</style>
<script>
export default {
  data() {
    var validatename = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!/^[A-Za-z\d]{2,6}$/.test(value)) {
        callback(new Error('用户名格式不正确，用户名由2-6数字字母组成'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!/^[A-Za-z\d]{6,10}$/.test(value)) {
        callback(new Error('密码格式不正确，密码由6~10数字字母组成'))
      } else {
        callback()
      }
    }
    var validateemail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (
        !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(value)
      ) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    var validatemobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(
          value
        )
      ) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 添加用户的弹框是否隐藏
      isaddUser: false,
      isEditUser: false,
      //保存请求回来的用户列表数据
      userList: [],
      total: 0,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      // 添加表单的验证规则对象
      addFormRules: {
        username: [{ validator: validatename, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        email: [{ validator: validateemail, trigger: 'blur' }],
        mobile: [{ validator: validatemobile, trigger: 'blur' }]
      },
      editForm: {
        username: '',
        email: '',
        mobile: ''
      },
      editFormRules: {
        username: [{ validator: validatename, trigger: 'blur' }],
        email: [{ validator: validateemail, trigger: 'blur' }],
        mobile: [{ validator: validatemobile, trigger: 'blur' }]
      },
      isrolUser: false
    }
  },
  methods: {
    async getUserList() {
      const res = await this.$http.get('users', { params: this.queryInfo })
      const userData = res.data
      // console.log(JSON.stringify(userData))
      if (userData.meta.status != 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userList = userData.data.users
      this.queryInfo.pagenum = userData.data.pagenum
      // this.queryInfo.pagesize = userData.data.pagesize
      this.total = userData.data.total
    },
    async editUser(id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.isEditUser = true
      this.editForm = res.data
    },
    closeEdit() {
      this.$refs.editFormRef.resetFields()
    },
    async confirmEdit() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          }
        )

        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }

        // 关闭对话框
        this.isEditUser = false
        // 刷新数据列表
        this.getUserList()
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    async delUser(id) {
      const condirmDel = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(error => error)
      if (condirmDel != 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete('users/' + id)

      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }

      this.$message.success('删除用户成功！')
      this.getUserList()
    },
    rolUserClosed() {
      this.isrolUser=false;
    },
    // 分配角色
    rolUser(id) {
      this.isrolUser=true;
    },
    // (pagesize改变时触发)
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 页码发生改变时触发
    handleCurrentChange(current) {
      this.queryInfo.pagenum = current
      this.getUserList()
    },
    // 修改用户状态
    async changeStatus(row) {
      const { data: res } = await this.$http.put(
        `users/${row.id}/state/${row.mg_state}`
      )
      if (res.meta.status != 200) {
        row.mg_state = !row.mg_state
        return this.$message.error('修改用户状态失败')
      }
      this.$message.success('修改用户状态成功')
      this.getUserList()
    },
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整用户信息')
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error('添加用户失败')
        //添加成功的提示
        this.$message.success('添加用户成功')
        //关闭对话框
        this.isaddUser = false
        //重新请求最新的数据
        this.getUserList()
      })
    },
    closeAdd() {
      this.$refs.addFormRef.resetFields()
    }
  },
  created() {
    this.getUserList()
  }
}
</script>
