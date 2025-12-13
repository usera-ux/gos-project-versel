<template>
  <div class="admin-page">
    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>

    <div class="container py-5">
      <!-- Хедер админки -->
      <div class="admin-header mb-5">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h1 class="admin-title">Панель администратора</h1>
            <p class="text-muted">Управление контентом и пользователями</p>
          </div>
          <div class="d-flex gap-3">
            <button @click="showCreateModal = true" class="btn btn-primary">
              <i class="bi bi-plus-circle me-2"></i>Добавить шаблон
            </button>
            <router-link to="/dashboard" class="btn btn-outline-primary">
              <i class="bi bi-speedometer2 me-2"></i>Личный кабинет
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
            <div class="stat-icon bg-primary">
              <i class="bi bi-people"></i>
            </div>
            <div class="stat-content">
              <h3>Пользователи</h3>
              <p class="stat-number">{{ stats.users }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-success">
              <i class="bi bi-file-earmark-text"></i>
            </div>
            <div class="stat-content">
              <h3>Шаблоны</h3>
              <p class="stat-number">{{ stats.templates }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-warning">
              <i class="bi bi-download"></i>
            </div>
            <div class="stat-content">
              <h3>Загрузки</h3>
              <p class="stat-number">{{ stats.downloads }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-info">
              <i class="bi bi-activity"></i>
            </div>
            <div class="stat-content">
              <h3>Активность</h3>
              <p class="stat-number">{{ stats.activity }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Управление шаблонами -->
      <div class="section mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="section-title">Управление шаблонами</h2>
          <div class="search-box">
            <input 
              v-model="searchQuery" 
              type="text" 
              class="form-control" 
              placeholder="Поиск шаблонов..."
            >
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Категория</th>
                <th>Автор</th>
                <th>Загрузки</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="template in filteredTemplates" :key="template.id">
                <td>{{ template.id }}</td>
                <td>{{ template.title }}</td>
                <td>
                  <span class="badge bg-secondary">{{ template.category }}</span>
                </td>
                <td>{{ template.author }}</td>
                <td>{{ template.downloads }}</td>
                <td>
                  <span :class="`badge ${template.status === 'active' ? 'bg-success' : 'bg-warning'}`">
                    {{ template.status === 'active' ? 'Активен' : 'На модерации' }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button @click="editTemplate(template)" class="btn btn-outline-primary">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button @click="deleteTemplate(template.id)" class="btn btn-outline-danger">
                      <i class="bi bi-trash"></i>
                    </button>
                    <button @click="toggleTemplateStatus(template.id)" class="btn btn-outline-secondary">
                      <i class="bi" :class="template.status === 'active' ? 'bi-eye-slash' : 'bi-eye'"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="templates.length === 0" class="text-center py-5">
          <i class="bi bi-inbox display-1 text-muted"></i>
          <p class="mt-3">Шаблонов пока нет</p>
          <button @click="showCreateModal = true" class="btn btn-primary">
            Добавить первый шаблон
          </button>
        </div>
      </div>

      <!-- Управление пользователями -->
      <div class="section">
        <h2 class="section-title mb-4">Пользователи</h2>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Дата регистрации</th>
                <th>Активность</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span :class="`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`">
                    {{ user.role === 'admin' ? 'Админ' : 'Пользователь' }}
                  </span>
                </td>
                <td>{{ formatDate(user.createdAt) }}</td>
                <td>
                  <span :class="`badge ${user.isActive ? 'bg-success' : 'bg-secondary'}`">
                    {{ user.isActive ? 'Активен' : 'Неактивен' }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button @click="editUser(user)" class="btn btn-outline-primary">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button 
                      @click="toggleUserStatus(user.id)" 
                      class="btn btn-outline-warning"
                    >
                      <i class="bi" :class="user.isActive ? 'bi-person-x' : 'bi-person-check'"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Модальное окно для создания/редактирования шаблона -->
    <div v-if="showCreateModal" class="modal-overlay" @click.self="showCreateModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ editingTemplate ? 'Редактировать шаблон' : 'Добавить новый шаблон' }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveTemplate">
            <div class="mb-3">
              <label for="title" class="form-label">Название</label>
              <input 
                v-model="form.title" 
                type="text" 
                class="form-control" 
                id="title" 
                required
              >
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Описание</label>
              <textarea 
                v-model="form.description" 
                class="form-control" 
                id="description" 
                rows="3"
                required
              ></textarea>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="category" class="form-label">Категория</label>
                  <select v-model="form.category" class="form-select" id="category" required>
                    <option value="">Выберите категорию</option>
                    <option value="powerpoint">PowerPoint</option>
                    <option value="questionnaire">Анкеты</option>
                    <option value="analysis">Маркетинговые анализы</option>
                    <option value="plan">Маркетинговые планы</option>
                    <option value="brief">Брифы</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="slides" class="form-label">Количество слайдов</label>
                  <input 
                    v-model="form.slides" 
                    type="number" 
                    class="form-control" 
                    id="slides" 
                    min="1"
                  >
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="imageUrl" class="form-label">URL изображения</label>
              <input 
                v-model="form.imageUrl" 
                type="url" 
                class="form-control" 
                id="imageUrl" 
                placeholder="https://example.com/image.jpg"
              >
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="viewUrl" class="form-label">URL для просмотра</label>
                  <input 
                    v-model="form.viewUrl" 
                    type="url" 
                    class="form-control" 
                    id="viewUrl" 
                    required
                  >
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="downloadUrl" class="form-label">URL для скачивания</label>
                  <input 
                    v-model="form.downloadUrl" 
                    type="url" 
                    class="form-control" 
                    id="downloadUrl" 
                    required
                  >
                </div>
              </div>
            </div>
            <div class="mb-3 form-check">
              <input 
                v-model="form.isPublic" 
                type="checkbox" 
                class="form-check-input" 
                id="isPublic"
              >
              <label class="form-check-label" for="isPublic">Опубликовать сразу</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Отмена</button>
          <button type="button" class="btn btn-primary" @click="saveTemplate">
            {{ editingTemplate ? 'Обновить' : 'Создать' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Состояние
const stats = ref({
  users: 42,
  templates: 24,
  downloads: 156,
  activity: 7
})

const templates = ref([
  {
    id: 1,
    title: "Business Services Conference",
    category: "powerpoint",
    author: "Администратор",
    downloads: 123,
    status: "active",
    createdAt: "2023-12-01"
  },
  {
    id: 2,
    title: "Customer Satisfaction Assessment",
    category: "questionnaire",
    author: "Пользователь",
    downloads: 45,
    status: "active",
    createdAt: "2023-12-05"
  },
  {
    id: 3,
    title: "Competitor Analysis Summary",
    category: "analysis",
    author: "Администратор",
    downloads: 89,
    status: "pending",
    createdAt: "2023-12-10"
  }
])

const users = ref([
  {
    id: 1,
    name: "Администратор",
    email: "admin@kamp.kz",
    role: "admin",
    createdAt: "2023-11-01",
    isActive: true
  },
  {
    id: 2,
    name: "Пользователь",
    email: "user@kamp.kz",
    role: "user",
    createdAt: "2023-11-15",
    isActive: true
  }
])

const showCreateModal = ref(false)
const editingTemplate = ref(null)
const searchQuery = ref('')

// Форма
const form = ref({
  title: '',
  description: '',
  category: '',
  slides: 10,
  imageUrl: 'https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg',
  viewUrl: '',
  downloadUrl: '',
  isPublic: true
})

// Вычисляемые свойства
const filteredTemplates = computed(() => {
  if (!searchQuery.value) return templates.value
  
  return templates.value.filter(template =>
    template.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    template.author.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Методы
const editTemplate = (template) => {
  editingTemplate.value = template
  form.value = { ...template }
  showCreateModal.value = true
}

const deleteTemplate = (id) => {
  if (confirm('Вы уверены, что хотите удалить этот шаблон?')) {
    templates.value = templates.value.filter(t => t.id !== id)
  }
}

const toggleTemplateStatus = (id) => {
  const template = templates.value.find(t => t.id === id)
  if (template) {
    template.status = template.status === 'active' ? 'pending' : 'active'
  }
}

const saveTemplate = () => {
  if (editingTemplate.value) {
    // Обновление существующего шаблона
    const index = templates.value.findIndex(t => t.id === editingTemplate.value.id)
    if (index !== -1) {
      templates.value[index] = {
        ...editingTemplate.value,
        ...form.value,
        status: form.value.isPublic ? 'active' : 'pending'
      }
    }
  } else {
    // Создание нового шаблона
    const newTemplate = {
      id: templates.value.length + 1,
      ...form.value,
      author: authStore.userName,
      downloads: 0,
      status: form.value.isPublic ? 'active' : 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }
    templates.value.push(newTemplate)
  }
  
  closeModal()
}

const closeModal = () => {
  showCreateModal.value = false
  editingTemplate.value = null
  resetForm()
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    category: '',
    slides: 10,
    imageUrl: 'https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg',
    viewUrl: '',
    downloadUrl: '',
    isPublic: true
  }
}

const editUser = (user) => {
  // Реализация редактирования пользователя
  console.log('Редактирование пользователя:', user)
}

const toggleUserStatus = (id) => {
  const user = users.value.find(u => u.id === id)
  if (user) {
    user.isActive = !user.isActive
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU')
}

// Проверка прав доступа
onMounted(() => {
  if (!authStore.isAdmin) {
    // Перенаправляем если не админ
    window.location.href = '/dashboard'
  }
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  position: relative;
}

.admin-header {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.admin-title {
  background: linear-gradient(135deg, #dc3545, #ff6b6b);
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

.section {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  margin-bottom: 30px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.search-box {
  width: 300px;
}

.table {
  background: rgba(255, 255, 255, 0.5);
}

.table th {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #555;
}

.table td {
  vertical-align: middle;
}

.badge {
  font-weight: 500;
  padding: 5px 10px;
}

.btn-group-sm .btn {
  padding: 5px 10px;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 25px 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-title {
  margin: 0;
  font-weight: 700;
}

.modal-body {
  padding: 30px;
}

.modal-footer {
  padding: 20px 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>