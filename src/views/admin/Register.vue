<template>
  <div class="register-container">
    <form @submit.prevent="register" class="register-form">
      <h2>Регистрация</h2>
      <input id="email" name="email" v-model="email" type="email" placeholder="Email" required>
      <input id="password" name="password" v-model="password" type="password" placeholder="Пароль" required>
      <input id="name" name="name" v-model="name" type="text" placeholder="Имя" required>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
      </button>
      <p class="login-link">
        Уже есть аккаунт? <a href="/login">Войти</a>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const name = ref('')
const loading = ref(false)

const register = () => {
  console.log('🔥 REGISTER:', email.value, name.value)
  
  const userData = {
    id: Date.now().toString(36),
    email: email.value,
    password: password.value,
    name: name.value,
    role: 'user',
    createdAt: new Date().toISOString()
  }
  
 
  let allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]')
  allUsers.push(userData)
  localStorage.setItem('allUsers', JSON.stringify(allUsers))
  

  localStorage.setItem('user', JSON.stringify(userData))
  localStorage.setItem('token', btoa(email.value + ':' + Date.now()))
  
  console.log('СОХРАНЕНО!', allUsers)
  alert('Зарегистрирован!')
  window.location.href = '/'
}
</script>

<style scoped>
.register-container { max-width: 400px; margin: 100px auto; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
.register-form input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
button { width: 100%; padding: 12px; background: #2c5aa0; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; }
button:disabled { background: #ccc; cursor: not-allowed; }
.login-link { text-align: center; margin-top: 20px; }
.login-link a { color: #2c5aa0; text-decoration: none; }
</style>
