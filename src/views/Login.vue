<template>
  <login-form @on-login="onLogin" />
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import { useUserStore } from "/src/stores/user";

export default {
  name: "Login",
  components: { LoginForm },
  methods: {
    onLogin(userInfo) {
      const userStore = useUserStore();
      userStore.restoreFromLocalStorage()
      // 保存用户信息到 Pinia
      console.log('登录后的userStore.department:', userInfo.department);
      userStore.setUser(userInfo.username, userInfo.role, userInfo.department);
      userStore.setToken(userInfo.token);
      // 保存用户信息到 localStorage
      // localStorage.setItem("token", userInfo.token);    
      // localStorage.setItem("username", userInfo.username);
      // localStorage.setItem("role", userInfo.role);
      this.$router.push("/dashboard");
    }
  }
};
</script>
