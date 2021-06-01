<template>
  <div>
    <el-button type="info" @click="logout()">信息按钮</el-button>
  </div>
</template>
<style lang="less" scoped>
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
