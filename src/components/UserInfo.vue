<template>
  <div class="user-info">
    欢迎，{{ username || '未登录' }}
    <el-button size="small" type="primary" @click="logout">退出登录</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')

onMounted(() => {
  try {
    const userStr = localStorage.getItem("currentUser")
    const user = userStr ? JSON.parse(userStr) : null
    username.value = localStorage.getItem("username") || ''
  } catch (err) {
    console.error("解析用户信息失败:", err)
    username.value = ''
  }
})

function logout() {
  localStorage.removeItem("currentUser")
  router.push("/login")
}
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}
</style>
