
// src/stores/user.js

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    username: '',
    role: '' ,
    department: ''  // ✅ 添加角色信息
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setUser(username, role,department) {
      this.username = username
      this.role = role 
      this.department = department  // ✅ 设置角色
    },
    logout() {
      this.token = ''
      this.username = ''
      this.role = ''
      this.department = ''
    },
    restoreFromLocalStorage() {
      this.token = localStorage.getItem('token') || '';
      this.username = localStorage.getItem('username') || '';
      this.role = localStorage.getItem('role') || '';
      this.department = localStorage.getItem('department') || '';
    }
  }
})
