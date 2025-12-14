<template>
  <div class="profile-layout mt-5">
    <!-- Левая колонка меню -->
    <aside class="profile-sidebar">
    
      <nav class="side-nav">
        <div class="side-section-title">Settings</div>

        <button
          class="side-item"
          :class="{ active: activeTab === 'profile' }"
          @click="activeTab = 'profile'"
        >
          <span>Profile Settings</span>
        </button>

        <button
          class="side-item"
          :class="{ active: activeTab === 'password' }"
          @click="activeTab = 'password'"
        >
          <span>Password</span>
        </button>

        <button class="side-item logout" @click="logout">
          <span>Log out</span>
        </button>
      </nav>
    </aside>

    <!-- Правая часть: профиль -->
    <main class="profile-main">
      <header class="profile-top">
        <h1>{{ activeTab === 'profile' ? 'Profile Settings' : 'Change Password' }}</h1>
      </header>

      <section class="profile-content">
        <!-- Вкладка: профиль -->
        <template v-if="activeTab === 'profile'">
          <div class="profile-header-row">
            <div class="avatar-wrapper">
              <div class="avatar-circle">
                <img
                  v-if="editForm.avatar"
                  :src="editForm.avatar"
                  alt="Avatar"
                />
                <span v-else>{{ userInitial }}</span>
              </div>
              <div class="avatar-actions">
                <label class="btn btn-primary small">
                  Upload New
                  <input 
                    type="file" 
                    class="hidden-input" 
                    accept="image/*"
                    @change="onAvatarChange"
                  />
                </label>
                <button 
                  class="btn btn-secondary small" 
                  @click="clearAvatar"
                  :disabled="!editForm.avatar"
                >
                  Delete avatar
                </button>
              </div>
            </div>
          </div>

          <form class="profile-form" @submit.prevent="saveProfile">
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input v-model="editForm.firstName" type="text" placeholder="First name" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input v-model="editForm.lastName" type="text" placeholder="Last name" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Email</label>
                <input v-model="editForm.email" type="email" placeholder="example@gmail.com" />
              </div>
              <div class="form-group">
                <label>Mobile Number</label>
                <input v-model="editForm.phone" type="tel" placeholder="+7 ___ ___ __ __" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full">
                <label>Residential Address</label>
                <input v-model="editForm.address" type="text" placeholder="Street, city" />
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </template>

        <!-- Вкладка: пароль -->
        <template v-else>
          <form class="profile-form" @submit.prevent="changePassword">
            <div class="form-row">
              <div class="form-group full">
                <label>Current password</label>
                <input v-model="passwordForm.current" type="password" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group full">
                <label>New password</label>
                <input 
                  v-model="passwordForm.newPass" 
                  type="password" 
                  required 
                  minlength="6"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group full">
                <label>Confirm new password</label>
                <input v-model="passwordForm.confirm" type="password" required />
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Change password</button>
            </div>
          </form>
        </template>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref(null)
const activeTab = ref('profile')

const editForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  avatar: ''
})

const passwordForm = ref({
  current: '',
  newPass: '',
  confirm: ''
})

const userInitial = computed(() => {
  const name = editForm.value.firstName || user.value?.name || user.value?.firstName
  return name ? name[0].toUpperCase() : 'U'
})

onMounted(() => {
  const data = localStorage.getItem('user')
  if (!data) {
    router.push('/')
    return
  }

  user.value = JSON.parse(data)

  // Заполняем форму данными пользователя
  editForm.value.firstName = user.value.firstName || user.value.name || ''
  editForm.value.lastName = user.value.lastName || ''
  editForm.value.email = user.value.email || ''
  editForm.value.phone = user.value.phone || ''
  editForm.value.address = user.value.address || ''
  editForm.value.avatar = user.value.avatar || ''
})

const onAvatarChange = (event) => {
  const file = event.target.files?.[0]
  if (!file || !file.type.startsWith('image/')) {
    alert('Выберите изображение')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    editForm.value.avatar = e.target.result
  }
  reader.onerror = () => {
    alert('Ошибка чтения файла')
  }
  reader.readAsDataURL(file)
}

const clearAvatar = () => {
  editForm.value.avatar = ''
}

const saveProfile = () => {
  if (!user.value) return

  user.value = {
    ...user.value,
    firstName: editForm.value.firstName,
    lastName: editForm.value.lastName,
    name: editForm.value.firstName || user.value.name, // для обратной совместимости
    email: editForm.value.email,
    phone: editForm.value.phone,
    address: editForm.value.address,
    avatar: editForm.value.avatar
  }

  localStorage.setItem('user', JSON.stringify(user.value))
  window.dispatchEvent(new CustomEvent('user-updated'))
  alert('✅ Профиль сохранён')
}

const changePassword = () => {
  if (passwordForm.value.newPass !== passwordForm.value.confirm) {
    alert('❌ Пароли не совпадают')
    return
  }
  
  if (passwordForm.value.newPass.length < 6) {
    alert('❌ Новый пароль должен содержать минимум 6 символов')
    return
  }

  // Здесь можно добавить реальный запрос на сервер
  alert('✅ Пароль обновлён')
  
  // Очищаем форму
  passwordForm.value.current = ''
  passwordForm.value.newPass = ''
  passwordForm.value.confirm = ''
}

const logout = () => {
  localStorage.clear()
  router.push('/')
}
</script>

<style scoped>
.profile-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fb;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
}

/* Левая колонка */
.profile-sidebar {
  width: 240px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
}

.app-title {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 24px;
  color: #111827;
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.side-item {
  border: none;
  background: transparent;
  text-align: left;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s;
}

.side-item:hover {
  background: #f3f4ff;
  color: #1d4ed8;
}

.side-item.active {
  background: #e0e7ff;
  color: #1d4ed8;
  font-weight: 600;
}

.side-item.logout {
  margin-top: auto;
  color: #b91c1c;
}

.side-item.logout:hover {
  background: #fef2f2;
  color: #dc2626;
}

.side-section-title {
  margin: 10px 4px 4px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
  font-weight: 500;
}

/* Правая часть */
.profile-main {
  flex: 1;
  padding: 24px 32px;
  overflow: auto;
}

.profile-top h1 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #111827;
}

.profile-content {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 24px 32px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05);
}

/* Аватар и кнопки */
.profile-header-row {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 24px;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 24px;
}

.avatar-circle {
  width: 96px;
  height: 96px;
  border-radius: 9999px;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: #374151;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Форма */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group.full {
  flex-basis: 100%;
}

.form-group label {
  font-size: 13px;
  color: #4b5563;
  font-weight: 500;
}

.form-group input {
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  background: white;
}

.form-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.3);
}

.form-group input:disabled {
  background: #f9fafb;
  color: #9ca3af;
}

/* Кнопки */
.btn {
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.15s;
}

.btn.small {
  font-size: 13px;
  padding: 8px 14px;
}

.btn-primary {
  background: #2563eb;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.35);
}

.btn-secondary {
  background: #e5e7eb;
  color: #111827;
}

.btn-secondary:hover:not(:disabled) {
  background: #d1d5db;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.form-actions {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}

.hidden-input {
  display: none;
}

/* Адаптив */
@media (max-width: 900px) {
  .profile-layout {
    flex-direction: column;
  }

  .profile-sidebar {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    padding: 12px 16px;
    gap: 8px;
  }

  .side-nav {
    flex-direction: row;
  }

  .side-item {
    white-space: nowrap;
  }

  .profile-main {
    padding: 16px;
  }

  .profile-content {
    padding: 16px 16px 24px;
  }

  .form-row {
    flex-direction: column;
  }

  .form-group {
    min-width: 100%;
  }
}
</style>
