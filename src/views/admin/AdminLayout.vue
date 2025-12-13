<template>
  <div class="admin-layout">
    <!-- БОКОВОЕ МЕНЮ -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>⚙️ Админ панель</h2>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item active">
          📊 Дашборд
        </router-link>
        <router-link to="/admin/users" class="nav-item">
          👥 Пользователи
        </router-link>
        <router-link to="/admin/news" class="nav-item">
          📰 Новости
        </router-link>
      
      </nav>
    </aside>
    
    <!-- КОНТЕНТ -->
    <main class="admin-content">
      <header class="admin-header">
        <h1>{{ $route.meta.title || 'Админ панель' }}</h1>
        <router-link to="/profile" class="user-info">
          <div class="user-avatar">{{ userInitial }}</div>
          <span>{{ userName }}</span>
        </router-link>
      </header>
      <div class="admin-main">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const user = computed(() => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
})

const userInitial = computed(() => user.value?.name?.[0]?.toUpperCase() || 'U')
const userName = computed(() => user.value?.name || 'Гость')
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
}

.sidebar {
  width: 250px;
  background: #2c5aa0;
  color: white;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.3em;
}

.sidebar-nav {
  padding: 10px 0;
}

.nav-item {
  display: block;
  padding: 15px 20px;
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  transition: all 0.3s;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(255,255,255,0.2);
  color: white;
}

.admin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.admin-header {
  background: white;
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-header h1 {
  margin: 0;
  color: #333;
  font-size: 1.8em;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #333;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: #2c5aa0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.admin-main {
  padding: 30px;
  flex: 1;
}
</style>
