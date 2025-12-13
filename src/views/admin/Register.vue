<template>
  <div class="register-container">
    <form @submit.prevent="register" class="register-form">
      <h2>Регистрация</h2>
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Пароль" required>
      <input v-model="name" type="text" placeholder="Имя" required>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
      </button>
      <p class="login-link">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const name = ref('')
const loading = ref(false)
const router = useRouter()

// ✅ ФУНКЦИЯ ГЕНЕРАЦИИ ТОКЕНА
const generateToken = () => {
  return btoa(email.value + ':' + Date.now() + ':' + Math.random().toString(36).substr(2))
}

const register = async () => {
  loading.value = true
  
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email.value, 
        password: password.value, 
        name: name.value, 
        role: 'user',
        createdAt: new Date().toISOString()
      })
    })
    
    let userData;
    
    if (response.ok) {
      const fullUser = await response.json()
      // ✅ БЕЗ ПАРОЛЯ!
      userData = {
        id: fullUser.id,
        email: fullUser.email,
        name: fullUser.name,
        role: fullUser.role
      }
    } else {
      // Локальная регистрация
      userData = {
        id: Date.now().toString(),
        email: email.value,
        name: name.value,
        role: 'user'
      }
    }
    
    // ✅ ТОКЕН + USER БЕЗ ПАРОЛЯ
    const token = btoa(email.value + Date.now())
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    
    window.dispatchEvent(new Event('storage'))
    router.push('/')
    
  } catch {
    // Локальная регистрация
    const userData = {
      id: Date.now().toString(),
      email: email.value,
      name: name.value,
      role: 'user'
    }
    const token = btoa(email.value + Date.now())
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userUser))
    
    window.dispatchEvent(new Event('storage'))
    router.push('/')
  } finally {
    loading.value = false
  }
}


</script>

<style scoped>
.register-container { 
  max-width: 400px; 
  margin: 100px auto; 
  padding: 40px; 
  background: white; 
  border-radius: 12px; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
}
.register-form input { 
  width: 100%; 
  padding: 12px; 
  margin: 10px 0; 
  border: 1px solid #ddd; 
  border-radius: 6px; 
  box-sizing: border-box;
}
button { 
  width: 100%; 
  padding: 12px; 
  background: #2c5aa0; 
  color: white; 
  border: none; 
  border-radius: 6px; 
  cursor: pointer; 
  font-size: 16px;
}
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.login-link {
  text-align: center;
  margin-top: 20px;
}
.login-link a {
  color: #2c5aa0;
  text-decoration: none;
}
</style>
