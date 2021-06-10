<template>
  <el-container class="home_content">
    <el-header>
      <img src="../assets/heima.png" alt>
      <span class="title_header">电商后台管理系统</span>
      <!-- <el-button type="info" @click="logout()">信息按钮</el-button> -->
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b" router='' :default-active="activePath"
        >
          <el-menu-item  class="first">
            <span slot="title">|||</span>
          </el-menu-item>

          <el-submenu :index="item.id+''" :key="item.id" v-for="item in menuList" >
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="'/'+child.path" :key="child.id" v-for="child in item.children" @click="savePath(child.path)">
                <i class="el-icon-menu"></i>{{child.authName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="less" scoped>
.first {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.home_content {
  height: 100%;
  background-color: #333744;
  .el-header {
    background-color: #373d41;
    padding: 0;
    font-size: 27px;
    color: #eaedf1;
    display: flex;
    align-items: center;
    img {
      margin-right: 10px;
    }
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
  data() {
    return {
      menuList: [],
      iconList: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-s-cooperation',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-s-order',
        '145': 'el-icon-data-line'
      },
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.getMenuLIst();
    this.activePath = window.sessionStorage.getItem('path')
  },
  methods: {
    logout: function() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async  getMenuLIst() {
      const menus= await this.$http.get('menus')
      console.log(menus.data.data);
      this.menuList = menus.data.data
    },
    savePath(path){
      window.sessionStorage.setItem("path","/"+path)
    }
  }
}
</script>
