import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Состояние
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)

  // Геттеры
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const currentUser = computed(() => user.value)

  // Действия
  const login = async (email, password) => {
    // Тестовые данные для демонстрации
    const testUsers = [
      { email: 'admin@kamp.kz', password: 'admin123', role: 'admin', name: 'Администратор', id: 1 },
      { email: 'user@kamp.kz', password: 'user123', role: 'user', name: 'Пользователь', id: 2 }
    ]

    const foundUser = testUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      // Удаляем пароль из объекта пользователя
      const { password: _, ...userWithoutPassword } = foundUser
      
      user.value = userWithoutPassword
      token.value = 'demo-token-' + Date.now()
      
      // Сохраняем в localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      localStorage.setItem('token', token.value)
      
      return { success: true, user: userWithoutPassword }
    }
    
    return { success: false, message: 'Неверный email или пароль' }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const register = async (userData) => {
    // Для демо: создаем нового пользователя
    const newUser = {
      ...userData,
      id: Date.now(),
      role: 'user' // По умолчанию обычный пользователь
    }
    
    user.value = newUser
    token.value = 'demo-token-' + Date.now()
    
    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('token', token.value)
    
    return { success: true, user: newUser }
  }

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    currentUser,
    login,
    logout,
    register
  }
})