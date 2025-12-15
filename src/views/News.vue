<template>
  <div class="news-page">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>


    <section class="news-hero">
      <div class="container">
        <h1>Новости</h1>
        <p>Актуальные события и мероприятия Казахстанской ассоциации профессиональных маркетологов</p>
      </div>
    </section>


    <div class="search-container">
      <div class="container">
        <input 
          v-model="search" 
          :placeholder="` Поиск из новостей...`" 
          class="search-input"
          @input="handleSearch"
        >
      </div>
    </div>

    <!-- News Content -->
    <section class="news-content">
      <div class="news-container">
        


        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Загружаем новости с API...</p>
        </div>

      
        <div v-else-if="error" class="error-state">
          <p>Ошибка API: {{ error }}</p>
          <button @click="fetchNews" class="retry-btn"> Попробовать снова</button>
        </div>

  
        <div v-else-if="filteredNews.length === 0" class="empty-state">
          <p>{{ search ? ' Новостей не найдено' : 'Новостей пока нет' }}</p>
        </div>

    
        <div v-else class="news-grid">
          <div 
            v-for="(newsItem, index) in paginatedFilteredNews" 
            :key="newsItem.id" 
            class="news-card"
          >
            <div class="news-image">
              <img 
                :src="newsItem.image || 'https://via.placeholder.com/380x220/2c5aa0/ffffff?text=KAMP'" 
                :alt="newsItem.title"
                @error="handleImageError"
              >
              <div class="news-date-overlay">{{ formatDate(newsItem.date) }}</div>
            </div>
            <div class="news-content-wrapper">
              <div class="news-meta">
                <div class="news-category">{{ newsItem.category || 'Новости' }}</div>
                <div class="news-views" v-if="newsItem.views">
                  {{ newsItem.views }} просмотров
                </div>
              </div>
              <h3 class="news-title">{{ newsItem.title }}</h3>
              <p class="news-excerpt">{{ truncateText(newsItem.excerpt || newsItem.content, 150) }}</p>
              
              <router-link to="/detailnews" class="news-link">
                Подробнее →
              </router-link>
            </div>
          </div>
        </div>

        <div v-if="filteredNews.length > itemsPerPage" class="news-pagination">
          <button 
            v-for="page in filteredTotalPages" 
            :key="page"
            class="page-btn"
            :class="{ active: currentPage === page }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <button 
            v-if="currentPage < filteredTotalPages"
            class="page-btn next-btn"
            @click="nextPage"
          >
            →
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NewsPage',
  data() {
    return {
      news: [],
      loading: true,
      error: null,
      currentPage: 1,
      itemsPerPage: 8,
      search: '',
      API_URL: 'https://693ad5679b80ba7262cb9443.mockapi.io/arai',
    }
  },
  computed: {
    filteredNews() {
      if (!this.search.trim()) return this.news
      
      return this.news.filter(newsItem =>
        newsItem.title?.toLowerCase().includes(this.search.toLowerCase()) ||
        (newsItem.excerpt || newsItem.content)?.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    paginatedFilteredNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredNews.slice(start, end)
    },
    filteredTotalPages() {
      return Math.ceil(this.filteredNews.length / this.itemsPerPage)
    }
  },
  mounted() {
    console.log('Загружаем новости с API...')
    this.fetchNews()
  },
  methods: {
    async fetchNews() {
      try {
        console.log(' Запрос:', this.API_URL)
        this.loading = true
        this.error = null
        
        const response = await fetch(this.API_URL)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        
        const data = await response.json()
        console.log(' Данные:', data.length)
      
        if (Array.isArray(data)) {
          this.news = data.map(item => ({
            id: item.id,
            title: item.title || 'Без названия',
            excerpt: item.excerpt || item.content || 'Без описания',
            date: item.date || new Date().toISOString(),
            category: item.category || 'Новости',
            image: item.image,
            views: item.views
          })).sort((a, b) => new Date(b.date) - new Date(a.date))
        } else {
          this.news = this.createFallbackData()
        }
        
      } catch (error) {
        console.error(' Ошибка:', error)
        this.error = error.message
        this.news = this.createFallbackData()
      } finally {
        this.loading = false
      }
    },

    handleSearch() {
      this.currentPage = 1
    },

    formatDate(dateString) {
      if (!dateString) return 'Дата не указана'
      try {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      } catch {
        return 'Дата не указана'
      }
    },

    truncateText(text, maxLength) {
      if (!text) return ''
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    },

    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/380x220/2c5aa0/ffffff?text=KAMP'
    },

    changePage(page) {
      this.currentPage = page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    nextPage() {
      if (this.currentPage < this.filteredTotalPages) {
        this.currentPage++
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },

    createFallbackData() {
      return [{
        id: 1,
        title: 'KAMP - Добро пожаловать!',
        excerpt: 'Казахстанская ассоциация профессиональных маркетологов. Новости скоро появятся!',
        date: new Date().toISOString(),
        category: 'Анонс'
      }]
    }
  }
}
</script>

<style>
:root {
  --primary: #2c5aa0;
  --primary-light: #3a6bc8;
  --secondary: #f8f9fa;
  --accent: #ff6b35;
  --accent-light: #ff8a65;
  --dark: #2d3748;
  --light: #ffffff;
  --gray: #718096;
  --gradient: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

body {
  background: var(--light);
  color: var(--dark);
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(44, 90, 160, 0.05);
  animation: float 15s infinite ease-in-out;
}

.shape-1 { width: 150px; height: 150px; top: 10%; left: 5%; animation-delay: 0s; }
.shape-2 { width: 200px; height: 200px; top: 60%; left: 80%; animation-delay: 3s; }
.shape-3 { width: 100px; height: 100px; top: 80%; left: 10%; animation-delay: 6s; }
.shape-4 { width: 180px; height: 180px; top: 20%; left: 70%; animation-delay: 9s; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(10px) rotate(-5deg); }
  75% { transform: translateY(-15px) rotate(3deg); }
}

.news-hero {
  background: var(--gradient);
  color: white;
  padding: 150px 0 80px;
  text-align: center;
  margin-top: 70px;
  position: relative;
}

.news-hero h1 { 
  font-size: 3.5rem; 
  font-weight: 800; 
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.news-hero p { 
  font-size: 1.3rem; 
  max-width: 700px; 
  margin: 0 auto; 
  opacity: 0.95;
}

.search-container {
  padding: 40px 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  margin: -20px 0 0 0;
}

.search-input {
  padding: 18px 28px;
  border: 2px solid #e0e6ed;
  border-radius: 50px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: block;
}

.search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(44, 90, 160, 0.1), 0 12px 35px rgba(0,0,0,0.15);
  transform: translateY(-2px);
  outline: none;
}

.news-content { 
  padding: 80px 0; 
  background: #f8fafc; 
}

.news-container { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 20px; 
}

.news-grid { 
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 30px; 
  margin-bottom: 60px; 
}

.news-card {
  background: white !important;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255,255,255,0.2);
}

.news-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
}

.news-image {
  width: 100%;
  height: 240px;
  position: relative;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-card:hover .news-image img { 
  transform: scale(1.08); 
}

.news-date-overlay {
  position: absolute;
  top: 18px;
  left: 18px;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--primary);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.news-content-wrapper { 
  padding: 30px; 
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 18px;
  font-size: 0.85rem;
}

.news-category {
  background: var(--gradient);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.news-views {
  color: var(--gray);
  display: flex;
  align-items: center;
  gap: 6px;
}

.news-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 18px;
  color: var(--dark);
  line-height: 1.35;
}

.news-excerpt {
  color: var(--gray);
  margin-bottom: 25px;
  line-height: 1.65;
  font-size: 0.95rem;
}

.news-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
}

.news-link:hover {
  color: var(--accent-light);
  transform: translateX(8px);
}

.news-pagination {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 60px;
  flex-wrap: wrap;
}

.page-btn {
  padding: 14px 22px;
  background: white;
  border: 2px solid var(--primary);
  border-radius: 12px;
  color: var(--primary);
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover, .page-btn.active {
  background: var(--gradient);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(44, 90, 160, 0.3);
}

.next-btn {
  background: var(--gradient);
  color: white;
  border-color: var(--primary);
}

.loading-state, .error-state, .empty-state {
  text-align: center;
  padding: 100px 20px;
  color: var(--gray);
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 30px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  background: var(--gradient);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;
}

.retry-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(44, 90, 160, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .news-hero { 
    padding: 120px 0 60px; 
    margin-top: 60px; 
  }
  .news-hero h1 { font-size: 2.5rem; }
  .news-hero p { font-size: 1.1rem; }
  .news-grid { 
    grid-template-columns: 1fr; 
    gap: 25px; 
  }
  .news-content-wrapper { padding: 25px; }
  .news-title { font-size: 1.3rem; }
}

@media (max-width: 480px) {
  .news-hero h1 { font-size: 2rem; }
  .news-image { height: 200px; }
  .container { padding: 0 15px; }
}
</style>
