<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2>Вход</h2>
      <input v-model="email" type="email" placeholder="Email" required :disabled="loading">
      <input v-model="password" type="password" placeholder="Пароль" required :disabled="loading">
      <button type="submit" :disabled="loading">
        {{ loading ? 'Вход...' : 'Войти' }}
      </button>
      <p class="register-link">
        Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </form>
  </div>
</template>

<!-- <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('admin@kamp.kz')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const login = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3000/users')
    const users = await response.json()
    
    const user = users.find(u => u.email === email.value && u.password === password.value)
    
    if (user) {
      localStorage.setItem('token', 'fake-token')
      localStorage.setItem('user', JSON.stringify(user))
      window.dispatchEvent(new Event('storage'))
      router.push('/')
    } else {
      alert('❌ Неверный email/пароль')
    }
  } catch {
    // ✅ Фейк логин если сервер недоступен
    alert('✅ Вход выполнен!')
    const fakeUser = {
      id: Date.now(),
      email: email.value,
      name: email.value.split('@')[0],
      role: 'user'
    }
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('user', JSON.stringify(fakeUser))
    window.dispatchEvent(new Event('storage'))
    router.push('/')
  } finally {
    loading.value = false
  }
}

</script> -->
<script setup>
import { ref, onMounted, watch } from 'vue'  // ✅ ИМПОРТ!
import { useRouter } from 'vue-router'

const email = ref('admin@kamp.kz')
const password = ref('')
const loading = ref(false)
const router = useRouter()

// ✅ HARDCODED USERS
const USERS = [
  { id: 1, email: 'admin@kamp.kz', password: 'admin123', role: 'admin', name: 'Admin' },
  { id: 2, email: 'test@test.kz', password: 'test123', role: 'user', name: 'Test User' }
]

const login = async () => {
  loading.value = true
  try {
    const user = USERS.find(u => u.email === email.value && u.password === password.value)
    
    if (user) {
      localStorage.setItem('token', 'fake-token')
      localStorage.setItem('user', JSON.stringify(user))
      
      // ✅ window.location.href = ПОЛНЫЙ РЕФРЕШ!
      window.location.href = user.role === 'admin' ? '/admin' : '/profile'
    } else {
      alert('❌ Неверный email/пароль')
    }
  } finally {
    loading.value = false
  }
}

// ✅ УДАЛИТЕ ВСЁ остальное (onMounted, watch) - НЕ НУЖНО!
</script>


<style scoped>
.login-container { 
  max-width: 400px; 
  margin: 100px auto; 
  padding: 40px; 
  background: white; 
  border-radius: 12px; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
}
.login-form input { 
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
.register-link {
  text-align: center;
  margin-top: 20px;
}
.register-link a {
  color: #2c5aa0;
  text-decoration: none;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
</style>
