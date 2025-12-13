<template>
  <div class="login-page">
    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>

    <div class="login-container">
      <div class="login-card">
        <div class="text-center mb-4">
          <div style="font-weight: 900; font-size: 36px; color: #3d8bfd;">KAMP</div>
          <p class="text-muted">Вход в систему</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
              placeholder="Введите email"
              required
              :disabled="authStore.loading"
            >
          </div>

          <div class="mb-4">
            <label for="password" class="form-label">Пароль</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Введите пароль"
              required
              :disabled="authStore.loading"
            >
          </div>

          <div v-if="authStore.error" class="alert alert-danger mb-3">
            {{ authStore.error }}
          </div>

          <button 
            type="submit" 
            class="btn btn-primary w-100 login-btn"
            :disabled="authStore.loading"
          >
            <span v-if="authStore.loading">
              <span class="spinner-border spinner-border-sm me-2"></span>
              Вход...
            </span>
            <span v-else>Войти</span>
          </button>

          <div class="mt-4 text-center">
            <p class="text-muted mb-2">Тестовые учетные записи:</p>
            <div class="test-accounts">
              <div class="account-item">
                <strong>Администратор:</strong>
                <div>admin@kamp.kz</div>
                <div>admin123</div>
              </div>
              <div class="account-item">
                <strong>Пользователь:</strong>
                <div>user@kamp.kz</div>
                <div>user123</div>
              </div>
            </div>
          </div>

          <div class="mt-3 text-center">
            <router-link to="/" class="text-decoration-none">
              ← Вернуться на главную
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const handleLogin = async () => {
  const result = await authStore.login(email.value, password.value)
  
  if (result.success) {
    const redirect = route.query.redirect || (authStore.isAdmin ? '/admin' : '/dashboard')
    router.push(redirect)
  }
}

onMounted(() => {
  // Если уже авторизован, перенаправляем
  if (authStore.isAuthenticated) {
    router.push(authStore.isAdmin ? '/admin' : '/dashboard')
  }
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, #ffffff, #e7ebf1, #dbe0e8);
  position: relative;
}

.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(61, 139, 253, 0.1), rgba(110, 168, 254, 0.05));
  filter: blur(40px);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 5%;
  animation: float 25s infinite ease-in-out;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 10%;
  animation: float 20s infinite ease-in-out reverse;
}

.shape-3 {
  width: 150px;
  height: 150px;
  bottom: 10%;
  left: 20%;
  animation: float 15s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -50px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.login-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 40px 30px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.login-form {
  width: 100%;
}

.login-btn {
  padding: 12px;
  border-radius: 12px;
  font-weight: 500;
  background: linear-gradient(135deg, #3d8bfd, #6ea8fe);
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(61, 139, 253, 0.3);
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(61, 139, 253, 0.5);
}

.login-btn:disabled {
  opacity: 0.7;
}

.test-accounts {
  background: rgba(61, 139, 253, 0.05);
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
}

.account-item {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.account-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.account-item div {
  font-size: 12px;
  color: #666;
}
</style>