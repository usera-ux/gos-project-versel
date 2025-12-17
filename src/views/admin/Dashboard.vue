<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Дашборд</h1>
      <p>Добро пожаловать в админ панель!</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card blue">
        <h3>Пользователи</h3>
        <div class="stat-number">{{ usersCount }}</div>
      </div>
      <div class="stat-card green">
        <h3>Новости</h3>
        <div class="stat-number">{{ newsCount }}</div>
      </div>
    </div>

    <div class="recent-activity">
      <h3>Недавняя активность</h3>
      <ul>
        <li>Новый пользователь: {{ users[0]?.name || 'Нет данных' }}</li>
        <li>Добавлена новость "Тест"</li>
        <li>Создано событие "Семинар"</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const usersCount = ref(0)
const newsCount = ref(0)
const users = ref([])

onMounted(async () => {
  try {
    const usersRes = await fetch('http://localhost:3000/users')
    const usersData = await usersRes.json()
    usersCount.value = usersData.length
    users.value = usersData
    newsCount.value = 12
  } catch (error) {
    console.log('API недоступен')
  }
})
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.dashboard-header h1 {
  color: #2c5aa0;
  margin: 0 0 10px 0;
  font-size: clamp(1.8em, 5vw, 2.5em); 
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 25px 20px; 
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
  font-size: clamp(1em, 4vw, 1.1em);
  opacity: 0.8;
}

.stat-number {
  font-size: clamp(2em, 8vw, 2.5em);
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
}

.blue { border-top: 5px solid #2c5aa0; }
.green { border-top: 5px solid #10b981; }

.recent-activity {
  background: white;
  padding: 25px 20px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.recent-activity h3 {
  color: #2c5aa0;
  margin-bottom: 20px;
  font-size: clamp(1.2em, 4vw, 1.4em);
}

.recent-activity ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-activity li {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-size: clamp(0.9em, 3.5vw, 1em);
}

.recent-activity li:last-child {
  border-bottom: none;
}


@media (max-width: 768px) {
  .admin-dashboard {
    padding: 15px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr; 
    gap: 15px;
  }
  
  .stat-card {
    padding: 20px 15px;
  }
  
  .recent-activity {
    padding: 20px 15px;
  }
}

@media (max-width: 480px) {
  .dashboard-header {
    margin-bottom: 30px;
  }
  
  .stats-grid {
    gap: 12px;
  }
}
</style>
