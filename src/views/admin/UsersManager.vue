<template>
  <div class="users-manager">
    <div class="page-header">
      <h1>👥 Управление пользователями</h1>
      <p class="subtitle">{{ users.length }} пользователей</p>
    </div>

    <!-- Таблица пользователей -->
    <div class="users-table-container">
      <div v-if="users.length === 0" class="empty-state">
        <p>Нет пользователей</p>
      </div>
      <table v-else class="users-table">
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
        <tbody>
          <tr v-for="user in users" :key="user.id" class="user-row">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.name }}</td>
            <td>
              <span :class="['role-badge', user.role]">{{ user.role === 'admin' ? 'Админ' : 'Пользователь' }}</span>
            </td>
            <td>{{ formatDate(user.createdAt || user.id) }}</td>
            <td>
              <button @click="toggleAdmin(user)" class="btn btn-small btn-secondary">
                {{ user.role === 'admin' ? ' Убрать админ' : 'Сделать админ' }}
              </button>
              <button @click="deleteUser(user.id)" class="btn btn-small btn-danger"> Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
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
}

.page-header {
  margin-bottom: 30px;
}

.subtitle {
  color: #666;
  font-size: 1.1em;
  margin: 5px 0 0 0;
}

.users-table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  overflow: hidden;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.user-row:hover {
  background: #f8f9fa;
}

.role-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 500;
}

.role-badge.admin {
  background: #fef3c7;
  color: #92400e;
}

.role-badge.user {
  background: #d1fae5;
  color: #065f46;
}

.btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.85em;
  margin-right: 8px;
}

.btn-small {
  padding: 4px 10px;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}
</style>
