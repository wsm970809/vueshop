<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_logo">
        <img src="../assets/logo.png" alt>
      </div>
      <div class="login_form">
        <!-- :model绑定表单数据 ref获取表单对象-->
        <el-form
          :model="loginFrom"
          :rules="rules"
          status-icon
          ref="loginFrom"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="loginFrom.username"
              autocomplete="off"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginFrom.password"
              autocomplete="off"
              placeholder="请输入密码"
              prefix-icon="el-icon-unlock"
            ></el-input>
          </el-form-item>
          <el-form-item class="buttons">
            <el-button type="primary" @click="submitForm('loginFrom')">提交</el-button>
            <el-button @click="resetForm('loginFrom')" type="info">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.login_container {
  background-color: darkblue;
  height: 100%;
}
.login_box {
  width: 380px;
  height: 250px;
  background-color: aliceblue;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .login_logo {
    width: 120px;
    height: 120px;
    position: absolute;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: aliceblue;
    border: 2px solid rgb(233, 234, 236);
    padding: 10px;
    box-shadow: 0 0 10px antiquewhite;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: rgb(233, 216, 194);
    }
  }
  .login_form {
    width: 300px;
    height: 170px;
    background-color: aliceblue;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 45%);
    .buttons {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
<script>
export default {
  data () {
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
    return {
      loginFrom: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validatename, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      //   validate对整个表单进行校验
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const res = await this.$http.post('login', this.loginFrom)
        if (res.data.meta.status === 200) {
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
          window.sessionStorage.setItem('token', res.data.data.token)
          this.$router.push('/home')
        } else {
          this.$message.error('错误信息：' + res.data.meta.msg)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
