<template>
  <div class="dashboard-page">
    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>

    <div class="container py-5">
      <!-- Хедер -->
      <div class="dashboard-header mb-5">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h1 class="dashboard-title">Добро пожаловать, {{ authStore.userName }}!</h1>
            <p class="text-muted">Личный кабинет пользователя</p>
          </div>
          <div class="d-flex gap-3">
            <router-link to="/profile" class="btn btn-outline-primary">
              <i class="bi bi-person me-2"></i>Профиль
            </router-link>
            <button @click="authStore.logout" class="btn btn-outline-danger">
              <i class="bi bi-box-arrow-right me-2"></i>Выйти
            </button>
          </div>
        </div>
      </div>

      <!-- Статистика -->
      <div class="row mb-5">
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-file-earmark-text"></i>
            </div>
            <div class="stat-content">
              <h3>Всего шаблонов</h3>
              <p class="stat-number">24</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-download"></i>
            </div>
            <div class="stat-content">
              <h3>Мои загрузки</h3>
              <p class="stat-number">{{ userStats.downloads }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-star"></i>
            </div>
            <div class="stat-content">
              <h3>Избранное</h3>
              <p class="stat-number">{{ userStats.favorites }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-clock-history"></i>
            </div>
            <div class="stat-content">
              <h3>Активность</h3>
              <p class="stat-number">{{ userStats.activity }} дней</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Быстрый доступ к шаблонам -->
      <div class="section mb-5">
        <h2 class="section-title">Быстрый доступ к шаблонам</h2>
        <div class="row g-4">
          <div class="col-md-4" v-for="template in quickAccessTemplates" :key="template.id">
            <div class="template-quick-card">
              <div class="template-icon mb-3">
                <i :class="template.icon"></i>
              </div>
              <h4>{{ template.title }}</h4>
              <p>{{ template.description }}</p>
              <router-link :to="template.path" class="btn btn-sm btn-primary">
                Перейти
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Недавние действия -->
      <div class="section">
        <h2 class="section-title">Недавние действия</h2>
        <div class="recent-actions">
          <div v-for="action in recentActions" :key="action.id" class="action-item">
            <div class="action-icon">
              <i :class="action.icon"></i>
            </div>
            <div class="action-content">
              <div class="d-flex justify-content-between">
                <h5>{{ action.title }}</h5>
                <span class="text-muted">{{ action.time }}</span>
              </div>
              <p class="text-muted mb-0">{{ action.description }}</p>
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

// Mock данные
const userStats = ref({
  downloads: 8,
  favorites: 5,
  activity: 7
})

const quickAccessTemplates = ref([
  {
    id: 1,
    title: 'Шаблоны PowerPoint',
    description: 'Презентации для бизнеса',
    icon: 'bi bi-file-earmark-slides',
    path: '/powerpoint'
  },
  {
    id: 2,
    title: 'Шаблоны анкет',
    description: 'Опросы и исследования',
    icon: 'bi bi-clipboard-check',
    path: '/question'
  },
  {
    id: 3,
    title: 'Маркетинговые анализы',
    description: 'Аналитика и отчеты',
    icon: 'bi bi-graph-up',
    path: '/marketing-analysis'
  }
])

const recentActions = ref([
  {
    id: 1,
    title: 'Скачан шаблон',
    description: 'Business Services Conference.pptx',
    icon: 'bi bi-download',
    time: '2 часа назад'
  },
  {
    id: 2,
    title: 'Добавлено в избранное',
    description: 'Marketing Activity Plan Template',
    icon: 'bi bi-star',
    time: 'Вчера'
  },
  {
    id: 3,
    title: 'Просмотр шаблона',
    description: 'Competitor Analysis Summary',
    icon: 'bi bi-eye',
    time: '2 дня назад'
  }
])

onMounted(() => {
  // Здесь можно загрузить реальные данные с API
})
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  position: relative;
}

.dashboard-header {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.dashboard-title {
  background: linear-gradient(135deg, #3d8bfd, #6ea8fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

.stat-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #3d8bfd, #6ea8fe);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
}

.stat-content h3 {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #333;
  margin: 0;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #333;
}

.template-quick-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  text-align: center;
  transition: transform 0.3s ease;
}

.template-quick-card:hover {
  transform: translateY(-5px);
}

.template-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #3d8bfd, #6ea8fe);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  margin: 0 auto;
}

.recent-actions {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.action-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.action-item:last-child {
  border-bottom: none;
}

.action-icon {
  width: 50px;
  height: 50px;
  background: rgba(61, 139, 253, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #3d8bfd;
}

.action-content {
  flex: 1;
}

.section {
  margin-bottom: 40px;
}
</style>