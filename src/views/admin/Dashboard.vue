<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Дашборд</h1>
      <p>Добро пожаловать в админ панель!</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card blue">
        <h3> Пользователи</h3>
        <div class="stat-number">{{ usersCount }}</div>
      </div>
      <div class="stat-card green">
        <h3> Новости</h3>
        <div class="stat-number">{{ newsCount }}</div>
      </div>

    </div>

    <div class="recent-activity">
      <h3>Недавняя активность</h3>
      <ul>
        <li>Новый пользователь: test@test.kz</li>
        <li> Добавлена новость "Тест"</li>
        <li> Создано событие "Семинар"</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ✅ Реальные данные с json-server
const usersCount = ref(0)
const newsCount = ref(0)
const eventsCount = ref(0)

onMounted(async () => {
  try {
    // Загружаем реальные счетчики
    const usersRes = await fetch('http://localhost:3000/users')
    const users = await usersRes.json()
    usersCount.value = users.length
    
    // Пока нет новостей/событий - заглушки
    newsCount.value = 12
    eventsCount.value = 5
  } catch (error) {
    console.log('API недоступен')
  }
})
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.dashboard-header h1 {
  color: #2c5aa0;
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h3 {
  margin: 0 0 15px 0;
  font-size: 1.1em;
  opacity: 0.8;
}

.stat-number {
  font-size: 2.5em;
  font-weight: bold;
  margin: 0;
}

.blue { border-top: 5px solid #2c5aa0; }
.green { border-top: 5px solid #10b981; }
.orange { border-top: 5px solid #f59e0b; }

.recent-activity {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.recent-activity h3 {
  color: #2c5aa0;
  margin-bottom: 20px;
}

.recent-activity ul {
  list-style: none;
  padding: 0;
}

.recent-activity li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.recent-activity li:last-child {
  border-bottom: none;
}
</style>
