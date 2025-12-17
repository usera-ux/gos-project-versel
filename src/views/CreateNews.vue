<template>
  <div class="create-news">
    <div class="page-header">
      <router-link to="/admin/news" class="back-link">← Назад к списку</router-link>
      <h2>Добавить новость</h2>
    </div>

    <form @submit.prevent="submitForm" class="news-form">
      <div class="form-group">
        <label for="title">Заголовок *</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          placeholder="Введите заголовок новости"
        >
      </div>

      <div class="form-group">
        <label for="content">Содержание *</label>
        <textarea
          id="content"
          v-model="form.content"
          rows="10"
          required
          placeholder="Введите текст новости..."
        ></textarea>
      </div>

      <div class="form-group">
        <label for="imageUrl">URL изображения (необязательно)</label>
        <input
          id="imageUrl"
          v-model="form.imageUrl"
          type="text"
          placeholder="https://example.com/image.jpg"
        >
      </div>

      <div class="form-group">
        <label for="category">Категория</label>
        <select id="category" v-model="form.category">
          <option value="general">Общие</option>
          <option value="events">Мероприятия</option>
          <option value="education">Обучение</option>
          <option value="announcements">Объявления</option>
        </select>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="form.published">
          Опубликовать сразу
        </label>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="success" class="success-message">
        {{ success }}
      </div>

      <div class="form-actions">
        <button type="submit" :disabled="loading" class="btn btn-primary btn-lg">
          {{ loading ? 'Сохранение...' : 'Опубликовать новость' }}
        </button>
        <button type="button" @click="saveDraft" :disabled="loading" class="btn">
          Сохранить как черновик
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  title: '',
  content: '',
  imageUrl: '',
  category: 'general',
  published: true
})

const loading = ref(false)
const error = ref('')
const success = ref('')

const submitForm = async () => {
  if (!form.value.title || !form.value.content) {
    error.value = 'Заполните обязательные поля'
    return
  }

  try {
    loading.value = true
    error.value = ''
    success.value = ''

    const newsData = {
      title: form.value.title,
      content: form.value.content,
      imageUrl: form.value.imageUrl,
      category: form.value.category,
      published: form.value.published
    }

    await authStore.addNews(newsData)
    
    success.value = 'Новость успешно добавлена!'
    

    setTimeout(() => {
      router.push('/admin/news')
    }, 2000)

  } catch (err) {
    error.value = 'Ошибка при добавлении новости: ' + err.message
  } finally {
    loading.value = false
  }
}

const saveDraft = () => {
  form.value.published = false
  submitForm()
}
</script>

<style scoped>
.create-news {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.back-link {
  color: #2c5aa0;
  text-decoration: none;
  margin-bottom: 10px;
  display: inline-block;
}

.back-link:hover {
  text-decoration: underline;
}

.news-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.form-group textarea {
  font-family: inherit;
  resize: vertical;
}

.form-group input[type="checkbox"] {
  width: auto;
  margin-right: 10px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary {
  background: #2c5aa0;
  color: white;
}

.btn-lg {
  padding: 15px 30px;
  font-size: 18px;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 6px;
  margin: 15px 0;
}

.success-message {
  background: #d4edda;
  color: #155724;
  padding: 12px;
  border-radius: 6px;
  margin: 15px 0;
}
</style>