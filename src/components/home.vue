<template>
    <el-container class="home_content">
      <el-header>
        <el-button type="info" @click="logout()">信息按钮</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>
<style lang="less" scoped>
.home_content {
  height: 100%;
  background-color: #333744;
  .el-header {
    background-color: #373d41;
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
<script>
export default {
  methods: {
    logout: function() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
