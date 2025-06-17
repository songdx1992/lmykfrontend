<template>
  <div class="login-container">
    
    <el-card class="login-card">
       <h2 class="title">欢迎登录</h2>
      <el-form @submit.native.prevent="handleLogin">
        <el-form-item label="账号">
          <el-input v-model="username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
       <div class="bg-image"></div>
    </el-card>
</div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '/src/stores/user';
import api  from '/src/utils/api';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  
  methods: {
    async handleLogin() {
      const userStore = useUserStore();
      try {
        const res = await api.post('/login', {
          username: this.username,
          password: this.password
        });
        // ✅ 登录成功，获取返回的用户名和角色
        console.log('登录返回数据', res.data);
        const { username, role, token } = res.data;

        // ✅ 保存到 Pinia 中
        userStore.setToken(token);
        userStore.setUser(username, role);
        console.log('保存到 Pinia 中的用户信息:', userStore.username);
        console.log('保存到 Pinia 中的角色:', userStore.role);
        console.log('保存到 Pinia 中的token:', userStore.token);

        // ✅ 登录成功，保存登录信息到 localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        // ✅ 通知父组件登录成功
        this.$emit('on-login', { username: username, role: role ,token: token });
      } catch (err) {
        this.$message.error('账号或密码错误');
      }
    }
  }
};
</script>
<style scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center; 
  height: 100vh;
  background-image: url('/images/login-background.jpg');
  background-size: cover;
  background-position: center;
}

.login-card {
  width: 360px;
  margin-right: 300px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.title {
  text-align: center;
  margin-bottom: 24px;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: -1; /* 确保背景在最底层 */
}

</style>