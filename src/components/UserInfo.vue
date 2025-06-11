<template>
  <div class="user-info">
    欢迎，{{ username || '未登录' }}
    <el-button size="small" type="primary" @click="logout">退出登录</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '/src/stores/user'

const router = useRouter()

const userStore = useUserStore()

const username = ref('')

onMounted(() => {
  userStore.restoreFromLocalStorage()
  username.value = userStore.username || ''
})

function logout() {
  userStore.logout()
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
