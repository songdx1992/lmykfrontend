<!-- src/views/Layout.vue -->
<template>
  <div class="layout">
   
    <el-container style="height: 100vh">
      <!-- 顶部栏 -->
      <el-header class="header-bar">
        <div class="header-content">
          <div class="logo">🧮 营销测算系统</div>
          <UserInfo />
        </div>
      </el-header>
      <!-- 主体内容 -->
      <el-container>
        <el-aside width="200px" class="sidebar">
          <el-menu :default-active="activePath" router>
            <el-menu-item index="/dashboard">📊 计算测算</el-menu-item>
            <el-menu-item index="/fixed-costs">💰 固定费用</el-menu-item>
            <el-menu-item index="/addproducts">📦 产品管理</el-menu-item>
          </el-menu>
        </el-aside>

        <el-main class="main-content">
        <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import UserInfo from "../components/UserInfo.vue";
export default {
  name: 'Layout',
  components: { UserInfo },
  computed: {
    activePath() {
      return this.$route.path;
    }
  }
}
</script>

<style scoped>
.header-bar {
  background-color: #1042e7;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 60px;
}
.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 18px;
  font-weight: bold;
}
.sidebar {
  background-color: #f5f7fa;
}
.main-content {
  padding: 20px;
  overflow: auto;
}
</style>
