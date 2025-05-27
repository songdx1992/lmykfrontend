<template>
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
