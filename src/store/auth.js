// src/store/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, token: null }),
  actions: { login, logout }
})
  const login = (userData) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }
  
  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }
  
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  return { 
    user, 
    login, 
    logout, 
    isAuthenticated, 
    isAdmin 
  }
})
