
// src/stores/user.js

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    username: '',
    role: ''  // ✅ 添加角色信息
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setUser(username, role) {
      this.username = username
      this.role = role  // ✅ 设置角色
    },
    logout() {
      this.token = ''
      this.username = ''
      this.role = ''
    },
    restoreFromLocalStorage() {
      this.token = localStorage.getItem('token') || '';
      this.username = localStorage.getItem('username') || '';
      this.role = localStorage.getItem('role') || '';
    }
  }
})
