<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2>Вход</h2>
      
      <input 
        id="login-email" 
        name="email" 
        v-model="email" 
        type="email" 
        placeholder="Email" 
        required 
        :disabled="loading"
        autocomplete="email"
      >
      <input 
        id="login-password" 
        name="password" 
        v-model="password" 
        type="password" 
        placeholder="Пароль" 
        required 
        :disabled="loading"
        autocomplete="current-password"
      >
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Вход...' : 'Войти' }}
      </button>
      
      <p v-if="error" class="error">{{ error }}</p>
      
      <p class="register-link">
        Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('admin@kamp.kz')
const password = ref('')
const loading = ref(false)
const error = ref('')

const login = () => {
  console.log('🔥 LOGIN:', email.value, password.value)
  
  if (!email.value || !password.value) {
    error.value = 'Заполните все поля!'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]')
    console.log('📋 Все пользователи:', allUsers)
    
    const storedUser = allUsers.find(u => 
      u.email === email.value && 
      u.password === password.value
    )
    
    let userData, token
    
    if (storedUser) {
      userData = {
        id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email,
        role: storedUser.role,
      }
      token = `user-jwt-${storedUser.id}-${Date.now()}`
      
    } else if (email.value === 'admin@kamp.kz' && password.value === 'admin123') {
      userData = {
        id: 0,
        name: 'Администратор',
        email: email.value,
        role: 'admin',
      }
      token = `admin-jwt-${Date.now()}`
      
    } else {
      throw new Error('Неверный email или пароль')
    }
    
   
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
    localStorage.setItem('authToken', token)
    localStorage.setItem('userId', userData.id.toString())
    
    console.log('🎉 Токен:', token)
    
    setTimeout(() => {
      window.location.href = userData.role === 'admin' ? '/admin/users' : '/'
    }, 1500)
    
  } catch (err) {
    error.value = err.message || 'Ошибка авторизации'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container { max-width: 400px; margin: 100px auto; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
.login-form input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
button { width: 100%; padding: 12px; background: #2c5aa0; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; }
button:disabled { background: #ccc; cursor: not-allowed; }
.register-link { text-align: center; margin-top: 20px; }
.register-link a { color: #2c5aa0; text-decoration: none; }
h2 { text-align: center; margin-bottom: 20px; color: #333; }
.error { color: #ef4444; text-align: center; margin: 10px 0; }
</style>
