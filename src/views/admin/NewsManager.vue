<template>
  <div class="news-manager">
    <!-- ✅ КНОПКА + СПИСОК -->
    <div class="page-header">
      <h2> Новости ({{ news.length }})</h2>
      <button 
        @click="showForm = true; form.title = ''; form.content = ''; form.image = ''" 
        class="btn btn-primary"
      >
        ➕ Новая новость
      </button>
    </div>

    <!-- ✅ ЕДИНАЯ ФОРМА (карточка сверху) -->
    <div v-if="showForm" class="card mb-4">
      <div class="card-header d-flex justify-content-between">
        <h4>{{ editingNews ? ' Редактировать' : '➕ Новая новость' }}</h4>
        <button @click="cancelEdit" class="btn btn-sm btn-outline-secondary">✕</button>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">Заголовок:</label>
          <input v-model="form.title" class="form-control" placeholder="Введите заголовок..." required>
        </div>
        <div class="mb-3">
          <label class="form-label">Содержание:</label>
          <textarea v-model="form.content" class="form-control" rows="4" placeholder="Введите текст новости..." required></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Изображение (URL):</label>
          <input v-model="form.image" class="form-control" placeholder="https://example.com/image.jpg">
        </div>
        <div class="d-flex gap-2">
          <button @click="saveNews" class="btn btn-primary">{{ editingNews ? 'Сохранить' : 'Создать' }}</button>
          <button @click="cancelEdit" class="btn btn-secondary"> Отмена</button>
        </div>
      </div>
    </div>

    <!-- ✅ СПИСОК НОВОСТЕЙ -->
    <div class="news-grid">
      <div v-if="news.length === 0" class="empty-state">
        <p>Нет новостей. Создайте первую!</p>
      </div>
      <div v-else v-for="newsItem in news" :key="newsItem.id" class="news-card">
        <img v-if="newsItem.image" :src="newsItem.image" :alt="newsItem.title" class="news-image">
        <div class="news-content">
          <h3>{{ newsItem.title }}</h3>
          <p class="news-preview">{{ (newsItem.content || newsItem.excerpt || '').substring(0, 100) }}...</p>
          <div class="news-actions">
            <button @click="editNews(newsItem)" class="btn btn-secondary"> Редактировать</button>
            <button @click="deleteNews(newsItem.id)" class="btn btn-danger"> Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const news = ref([])
const showForm = ref(false)
const editingNews = ref(null)
const form = ref({ title: '', content: '', image: '' })

// ✅ MockAPI БАЗОВЫЙ URL
const API_URL = 'https://693ad5679b80ba7262cb9443.mockapi.io/arai'

onMounted(async () => {
  await loadNews()
})

const loadNews = async () => {
  try {
    console.log('🔄 Загрузка:', `${API_URL}`)
    const response = await fetch(API_URL)
    const data = await response.json()
    console.log('✅ Данные:', data)
    news.value = data  // Уже массив новостей!
  } catch {
    news.value = []
  }
}
const addQuickNews = () => {
  const newNews = {
    id: `news${Date.now()}`,
    title: 'Авто новость',
    content: 'Авто содержание',
    excerpt: 'Авто содержание...',
    category: 'Новости', 
    date: new Date().toISOString().split('T')[0],
    image: 'https://picsum.photos/400/200',
    views: 0
  }
  
  news.value.unshift(newNews)  // ✅ Добавляем в начало списка
  alert('✅ Авто-новость добавлена!')
}


const saveNews = async () => {
  try {
    if (!form.value.title || !form.value.content) {
      alert('Заполните заголовок и содержание!')
      return
    }

    if (editingNews.value) {
      // UPDATE - заменяем в массиве
      const index = news.value.findIndex(n => n.id === editingNews.value.id)
      news.value[index] = { ...form.value, id: editingNews.value.id }
    } else {
      // CREATE - добавляем в начало
      const newNews = {
        id: `news${news.value.length + 1}`,
        ...form.value,
        excerpt: form.value.content.substring(0, 100) + '...',
        category: 'Новости',
        date: new Date().toISOString().split('T')[0],
        views: 0
      }
      news.value.unshift(newNews)
    }
    
    alert('✅ Новость сохранена!')
    cancelEdit()
  } catch {
    alert('✅ Сохранено локально!')
    cancelEdit()
  }
}

const editNews = (newsItem) => {
  editingNews.value = newsItem
  form.value = { 
    title: newsItem.title, 
    content: newsItem.content, 
    image: newsItem.image || '' 
  }
  showForm.value = true
}

const deleteNews = async (id) => {
  if (confirm('Удалить новость?')) {
    news.value = news.value.filter(n => n.id !== id)
  }
}

const cancelEdit = () => {
  showForm.value = false
  editingNews.value = null
  form.value = { title: '', content: '', image: '' }
}
</script>



<style scoped>
.news-manager {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal input,
.modal textarea {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.news-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-content {
  padding: 20px;
}

.news-content h3 {
  margin: 0 0 10px 0;
  color: #2c5aa0;
}

.news-preview {
  color: #666;
  margin-bottom: 20px;
}

.news-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;

}

.btn-primary {
  background: #2c5aa0;
  color: white;
    width: 100px;
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
