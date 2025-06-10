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
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      const accounts = {
        "admin": { password: "lmyk9999", role: "admin" },
        "lmyk": { password: "lmyk9999", role: "basic" }
      };

      const account = accounts[this.username];
      if (account && account.password === this.password) {
        // ✅ 登录成功，保存登录信息到 localStorage
        localStorage.setItem('username', this.username);
        localStorage.setItem('role', account.role);

        // ✅ 通知父组件登录成功
        this.$emit('on-login', { username: this.username, role: account.role });
       
      } else {
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