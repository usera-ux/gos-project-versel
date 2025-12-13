<template>
  <div class="profile-page">
    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>

    <div class="container py-5">
      <div class="profile-header mb-5">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h1 class="profile-title">Мой профиль</h1>
            <p class="text-muted">Управление личными данными</p>
          </div>
          <div>
            <router-link to="/dashboard" class="btn btn-outline-primary">
              <i class="bi bi-arrow-left me-2"></i>Назад
            </router-link>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Левая колонка - информация профиля -->
        <div class="col-md-4">
          <div class="profile-card">
            <div class="profile-avatar">
              <div class="avatar-placeholder">
                {{ authStore.userName.charAt(0).toUpperCase() }}
              </div>
            </div>
            <div class="profile-info">
              <h3>{{ authStore.userName }}</h3>
              <p class="text-muted">{{ authStore.user?.email }}</p>
              <div class="role-badge">
                <span :class="`badge ${authStore.isAdmin ? 'bg-danger' : 'bg-primary'}`">
                  {{ authStore.isAdmin ? 'Администратор' : 'Пользователь' }}
                </span>
              </div>
            </div>

            <div class="profile-stats mt-4">
              <div class="stat-item">
                <div class="stat-label">Дата регистрации</div>
                <div class="stat-value">{{ formatDate(userInfo.registrationDate) }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Статус аккаунта</div>
                <div class="stat-value">
                  <span class="badge bg-success">Активен</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Последний вход</div>
                <div class="stat-value">{{ formatDate(userInfo.lastLogin) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Правая колонка - настройки -->
        <div class="col-md-8">
          <div class="settings-card">
            <h3 class="settings-title">Настройки профиля</h3>

            <!-- Форма редактирования профиля -->
            <form @submit.prevent="updateProfile" class="settings-form">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="name" class="form-label">Имя</label>
                    <input
                      v-model="profileForm.name"
                      type="text"
                      class="form-control"
                      id="name"
                      required
                    >
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input
                      v-model="profileForm.email"
                      type="email"
                      class="form-control"
                      id="email"
                      required
                    >
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="bio" class="form-label">О себе</label>
                <textarea
                  v-model="profileForm.bio"
                  class="form-control"
                  id="bio"
                  rows="3"
                  placeholder="Расскажите о себе..."
                ></textarea>
              </div>

              <div class="mb-4">
                <label class="form-label">Уведомления</label>
                <div class="form-check">
                  <input
                    v-model="profileForm.notifications.email"
                    class="form-check-input"
                    type="checkbox"
                    id="emailNotifications"
                  >
                  <label class="form-check-label" for="emailNotifications">
                    Email уведомления
                  </label>
                </div>
                <div class="form-check">
                  <input
                    v-model="profileForm.notifications.updates"
                    class="form-check-input"
                    type="checkbox"
                    id="updateNotifications"
                  >
                  <label class="form-check-label" for="updateNotifications">
                    Уведомления об обновлениях
                  </label>
                </div>
              </div>

              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading">
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  Сохранение...
                </span>
                <span v-else>Сохранить изменения</span>
              </button>
            </form>

            <!-- Смена пароля -->
            <div class="password-section mt-5">
              <h4 class="section-title">Смена пароля</h4>
              <form @submit.prevent="changePassword" class="password-form">
                <div class="mb-3">
                  <label for="currentPassword" class="form-label">Текущий пароль</label>
                  <input
                    v-model="passwordForm.currentPassword"
                    type="password"
                    class="form-control"
                    id="currentPassword"
                    required
                  >
                </div>
                <div class="mb-3">
                  <label for="newPassword" class="form-label">Новый пароль</label>
                  <input
                    v-model="passwordForm.newPassword"
                    type="password"
                    class="form-control"
                    id="newPassword"
                    required
                  >
                </div>
                <div class="mb-4">
                  <label for="confirmPassword" class="form-label">Подтвердите новый пароль</label>
                  <input
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    required
                  >
                </div>
                <button type="submit" class="btn btn-outline-primary" :disabled="passwordLoading">
                  <span v-if="passwordLoading">
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Изменение...
                  </span>
                  <span v-else>Изменить пароль</span>
                </button>
              </form>
            </div>

            <!-- Опасная зона -->
            <div class="danger-zone mt-5">
              <h4 class="section-title text-danger">Опасная зона</h4>
              <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle me-2"></i>
                Эти действия нельзя отменить. Будьте осторожны.
              </div>
              <button @click="deleteAccount" class="btn btn-outline-danger">
                <i class="bi bi-trash me-2"></i>Удалить аккаунт
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const loading = ref(false)
const passwordLoading = ref(false)

const userInfo = ref({
  registrationDate: '2023-11-15',
  lastLogin: new Date().toISOString().split('T')[0]
})

const profileForm = ref({
  name: authStore.userName,
  email: authStore.user?.email || '',
  bio: 'Люблю маркетинг и создание шаблонов',
  notifications: {
    email: true,
    updates: true
  }
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const updateProfile = async () => {
  loading.value = true
  
  // Имитация запроса к API
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Обновляем данные в хранилище
  if (authStore.user) {
    authStore.user.name = profileForm.value.name
    authStore.user.email = profileForm.value.email
    localStorage.setItem('user', JSON.stringify(authStore.user))
  }
  
  loading.value = false
  alert('Профиль успешно обновлен!')
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('Пароли не совпадают')
    return
  }
  
  if (passwordForm.value.newPassword.length < 6) {
    alert('Пароль должен быть не менее 6 символов')
    return
  }
  
  passwordLoading.value = true
  
  // Имитация запроса
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  
  passwordLoading.value = false
  alert('Пароль успешно изменен!')
}

const deleteAccount = () => {
  if (confirm('Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.')) {
    authStore.logout()
    alert('Аккаунт удален')
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(() => {
  // Загружаем данные профиля
  if (authStore.user) {
    profileForm.value.name = authStore.user.name || authStore.user.email.split('@')[0]
    profileForm.value.email = authStore.user.email
  }
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  position: relative;
}

.profile-header {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.profile-title {
  background: linear-gradient(135deg, #3d8bfd, #6ea8fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

.profile-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  text-align: center;
}

.profile-avatar {
  margin-bottom: 20px;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #3d8bfd, #6ea8fe);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0 auto;
}

.profile-info h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #333;
}

.profile-info .text-muted {
  font-size: 14px;
  margin-bottom: 15px;
}

.role-badge {
  margin: 15px 0;
}

.profile-stats {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

.stat-value {
  font-weight: 500;
  color: #333;
}

.settings-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  height: 100%;
}

.settings-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #333;
}

.settings-form {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: inherit;
}

.password-section {
  padding-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.danger-zone {
  padding-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>