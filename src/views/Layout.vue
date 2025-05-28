<!-- src/views/Layout.vue -->
<template>
  <div class="layout">
   
    <el-container style="height: 100vh">
      <el-aside width="200px" class="sidebar">
        <el-menu :default-active="activePath" router>
          <el-menu-item index="/dashboard">📊 计算测算</el-menu-item>
          <el-menu-item index="/fixed-costs">💰 固定费用</el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  computed: {
    activePath() {
      return this.$route.path;
    }
  }
}
</script>

<style scoped>
.sidebar {
  background-color: #f5f7fa;
}
.main-content {
  padding: 20px;
  overflow: auto;
}
</style>
