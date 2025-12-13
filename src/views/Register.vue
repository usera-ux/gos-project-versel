<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card mt-5">
            <div class="card-header">
              <h3 class="text-center">Регистрация</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleRegister">
                <div class="mb-3">
                  <label for="name" class="form-label">Имя</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    v-model="form.name"
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="form.email"
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Пароль</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    v-model="form.password"
                    required
                    minlength="6"
                  >
                </div>
                
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Подтвердите пароль</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="confirmPassword" 
                    v-model="form.confirmPassword"
                    required
                  >
                </div>
                
                <div v-if="error" class="alert alert-danger">
                  {{ error }}
                </div>
                
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span v-if="loading">Регистрация...</span>
                    <span v-else>Зарегистрироваться</span>
                  </button>
                  
                  <router-link to="/login" class="btn btn-link">
                    Уже есть аккаунт? Войти
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  // Валидация
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Пароли не совпадают'
    return
  }
  
  if (form.value.password.length < 6) {
    error.value = 'Пароль должен содержать минимум 6 символов'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const result = await authStore.register({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    })
    
    if (result.success) {
      router.push('/dashboard')
    }
  } catch (err) {
    error.value = 'Ошибка регистрации. Попробуйте снова.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
}

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

.card-header {
  background-color: #007bff;
  color: white;
  border-radius: 10px 10px 0 0 !important;
}
</style>