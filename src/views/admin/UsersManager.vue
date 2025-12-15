<template>
  <div class="users-manager">
    <div class="page-header">
      <h1>👥 Управление пользователями</h1>
      <p class="subtitle">{{ users.length }} пользователей</p>
    </div>

    <!-- ✅ Контейнер для всех состояний -->
    <div class="users-table-container">
      <!-- Пустое состояние -->
      <div v-if="users.length === 0" class="empty-state">
        <p>Нет пользователей</p>
      </div>

      <!-- НЕПУСТОЙ список: таблица ИЛИ карточки -->
      <div v-else class="users-content">
        <!-- Десктоп: таблица -->
        <div class="users-table-wrapper desktop-only">
          <table class="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Имя</th>
                <th>Роль</th>
                <th>Дата регистрации</th>
                <th>Действия</th>
              </tr>
            </thead>
            <!-- <tbody>
              <tr v-for="user in users" :key="user.id" class="user-row">
                <td>{{ user.id }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.name }}</td>
                <td>
                  <span :class="['role-badge', user.role]">
                    {{ user.role === 'admin' ? 'Админ' : 'Пользователь' }}
                  </span>
                </td>
                <td>{{ formatDate(user.createdAt || user.id) }}</td>
                <td>
                  <button @click="toggleAdmin(user)" class="btn btn-small btn-secondary">
                    {{ user.role === 'admin' ? 'Убрать админ' : 'Сделать админ' }}
                  </button>
                  <button @click="deleteUser(user.id)" class="btn btn-small btn-danger">
                    Удалить
                  </button>
                </td>
              </tr>
            </tbody> -->
          </table>
        </div>

        <!-- Мобилка: карточки -->
        <div class="users-cards mobile-only">
          <div v-for="user in users" :key="user.id" class="user-card">
            <div class="user-card-header">
              <div class="user-main">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-email">{{ user.email }}</div>
              </div>
              <span :class="['role-badge', user.role]">
                {{ user.role === 'admin' ? 'Админ' : 'Пользователь' }}
              </span>
            </div>

            <div class="user-meta">
              <div class="meta-item">
                <span class="meta-label">ID:</span>
                <span class="meta-value">{{ user.id }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Регистрация:</span>
                <span class="meta-value">{{ formatDate(user.createdAt || user.id) }}</span>
              </div>
            </div>

            <div class="user-actions">
              <button @click="toggleAdmin(user)" class="btn btn-secondary">
                {{ user.role === 'admin' ? 'Убрать админ' : 'Сделать админ' }}
              </button>
              <button @click="deleteUser(user.id)" class="btn btn-danger">
                Удалить
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

const users = ref([])

onMounted(async () => {
  await loadUsers()
})

const loadUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/users')
    users.value = await response.json()
  } catch {
    users.value = []
  }
}

const toggleAdmin = async (user) => {
  if (confirm(`Сделать ${user.name} администратором?`)) {
    const newRole = user.role === 'admin' ? 'user' : 'admin'
    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole })
    })
    await loadUsers()
  }
}

const deleteUser = async (id) => {
  if (confirm('Удалить пользователя?')) {
    await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' })
    await loadUsers()
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU')
}
</script>

<style scoped>
.users-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-header h1 {
  font-size: clamp(1.8em, 6vw, 2.5em);
  margin: 0 0 10px 0;
  color: #2c5aa0;
}

.subtitle {
  color: #666;
  font-size: clamp(1em, 4vw, 1.1em);
  margin: 0;
}

.users-table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  overflow: hidden;
}

.users-content {
  min-height: 400px;
}

/* ====== ДЕСКТОП: ТАБЛИЦА ====== */
.desktop-only {
  display: block;
}

.users-table-wrapper {
  overflow-x: auto;
  height: 100%;
}

.users-table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
  font-size: clamp(0.85em, 3vw, 0.95em);
}

.users-table th,
.users-table td {
  padding: clamp(10px, 2vw, 16px);
  text-align: left;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
  position: sticky;
  top: 0;
  z-index: 10;
}

.user-row:hover {
  background: #f8f9fa;
}

/* ====== МОБИЛКА: КАРТОЧКИ ====== */
.mobile-only {
  display: none;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  height: 100%;
}

.users-cards {
  display: flex;
}

.user-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  padding: 16px;
}

.user-card-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 12px;
}

.user-main {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.user-name {
  font-weight: 600;
  font-size: clamp(1em, 4vw, 1.1em);
  color: #111827;
}

.user-email {
  font-size: clamp(0.85em, 3.5vw, 0.95em);
  color: #6b7280;
  word-break: break-all;
}

.user-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  font-size: clamp(0.8em, 3vw, 0.9em);
}

.meta-item {
  display: flex;
  justify-content: space-between;
}

.meta-label {
  color: #6b7280;
  font-weight: 500;
}

.meta-value {
  color: #111827;
}

.user-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ====== БЭДЖИ РОЛЕЙ ====== */
.role-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: clamp(0.75em, 2.5vw, 0.85em);
  font-weight: 500;
  white-space: nowrap;
}

.role-badge.admin {
  background: #fef3c7;
  color: #92400e;
}

.role-badge.user {
  background: #d1fae5;
  color: #065f46;
}

/* ====== КНОПКИ ====== */
.btn {
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-small {
  padding: clamp(6px, 1.5vw, 8px) clamp(12px, 2.5vw, 16px);
  font-size: clamp(0.8em, 2.8vw, 0.9em);
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
  transform: translateY(-1px);
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.user-actions .btn {
  padding: 12px;
  font-size: clamp(0.85em, 3vw, 0.95em);
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #666;
  grid-column: 1 / -1;
}

.empty-state p {
  font-size: clamp(1.1em, 4vw, 1.3em);
}

/* ====== АДАПТАЦИЯ ====== */
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  .users-manager {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .users-cards {
    padding: 15px;
    gap: 10px;
  }
  
  .user-card {
    padding: 14px;
  }
}
</style>
