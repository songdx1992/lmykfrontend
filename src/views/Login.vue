<template>
  <login-form @on-login="onLogin" />
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  name: "Login",
  components: { LoginForm },
  methods: {
    onLogin(userInfo) {
      localStorage.setItem("username", userInfo.username);
      localStorage.setItem("role", userInfo.role);
      this.$router.push("/dashboard");
    }
  }
};
</script>
