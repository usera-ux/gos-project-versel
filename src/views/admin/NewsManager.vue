<template>
  <div class="news-manager">
    <!-- ✅ КНОПКА + СПИСОК -->
    <div class="page-header">
      <h2>Новости ({{ news.length }})</h2>
      <button 
        @click="showForm = true; form.title = ''; form.content = ''; form.image = ''" 
        class="btn btn-primary"
      >
        ➕ Новая новость
      </button>
    </div>

    <!-- ✅ ФОРМА (адаптивная карточка сверху) -->
    <div v-if="showForm" class="card mb-4">
      <div class="card-header">
        <h4>{{ editingNews ? 'Редактировать' : '➕ Новая новость' }}</h4>
        <button @click="cancelEdit" class="btn-close">✕</button>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Заголовок:</label>
          <input v-model="form.title" class="form-control" placeholder="Введите заголовок..." required>
        </div>
        <div class="form-group">
          <label>Содержание:</label>
          <textarea v-model="form.content" class="form-control" rows="4" placeholder="Введите текст новости..." required></textarea>
        </div>
        <div class="form-group">
          <label>Изображение (URL):</label>
          <input v-model="form.image" class="form-control" placeholder="https://example.com/image.jpg">
        </div>
        <div class="form-actions">
          <button @click="saveNews" class="btn btn-primary">{{ editingNews ? 'Сохранить' : 'Создать' }}</button>
          <button @click="cancelEdit" class="btn btn-secondary">Отмена</button>
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
            <button @click="editNews(newsItem)" class="btn btn-secondary">Редактировать</button>
            <button @click="deleteNews(newsItem.id)" class="btn btn-danger">Удалить</button>
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
    news.value = data
  } catch {
    news.value = []
  }
}

const saveNews = async () => {
  try {
    if (!form.value.title || !form.value.content) {
      alert('Заполните заголовок и содержание!')
      return
    }

    if (editingNews.value) {
      const index = news.value.findIndex(n => n.id === editingNews.value.id)
      news.value[index] = { ...form.value, id: editingNews.value.id }
    } else {
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
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.page-header h2 {
  margin: 0;
  font-size: clamp(1.4em, 5vw, 1.8em);
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  overflow: hidden;
  margin-bottom: 30px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.card-header h4 {
  margin: 0;
  font-size: clamp(1.1em, 4vw, 1.3em);
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-body {
  padding: 25px 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: clamp(0.9em, 3vw, 1em);
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: clamp(0.9em, 3.5vw, 1em);
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #2c5aa0;
  box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
}

.form-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
  transform: translateY(-3px);
}

.news-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.news-content {
  padding: 20px;
}

.news-content h3 {
  margin: 0 0 12px 0;
  color: #2c5aa0;
  font-size: clamp(1.1em, 4vw, 1.3em);
  line-height: 1.3;
}

.news-preview {
  color: #666;
  margin-bottom: 20px;
  font-size: clamp(0.9em, 3.5vw, 1em);
  line-height: 1.5;
}

.news-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: clamp(0.85em, 3vw, 0.95em);
  transition: all 0.3s;
  flex: 1;
  min-width: 100px;
}

.btn-primary {
  background: #2c5aa0;
  color: white;
}

.btn-primary:hover {
  background: #1e3f72;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  grid-column: 1 / -1;
}

.empty-state p {
  font-size: clamp(1em, 4vw, 1.1em);
}

/* ✅ МОБИЛЬНАЯ АДАПТАЦИЯ */
@media (max-width: 768px) {
  .news-manager {
    padding: 15px;
  }
  
  .page-header {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .btn-primary {
    width: 100%;
  }
  
  .news-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .news-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .card-header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  
  .card-body {
    padding: 20px 15px;
  }
  
  .news-content {
    padding: 15px;
  }
}
</style>
