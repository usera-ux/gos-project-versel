<template>
  <div class="news-page">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>

    <!-- Hero Section -->
    <section class="news-hero">
      <div class="container">
        <h1>Новости</h1>
        <p>Актуальные события и мероприятия Казахстанской ассоциации профессиональных маркетологов</p>
      </div>
    </section>

    <!-- News Content -->
    <section class="news-content">
      <div class="news-container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Загружаем новости...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p>Ошибка загрузки: {{ error }}</p>
          <button @click="fetchNews" class="retry-btn">Попробовать снова</button>
        </div>

        <!-- News Grid -->
        <div v-else class="news-grid">
          <div 
            v-for="(news, index) in paginatedNews" 
            :key="news.id" 
            class="news-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="news-image">
              <img 
                :src="news.image || 'https://via.placeholder.com/380x220/2c5aa0/ffffff?text=KAMP'" 
                :alt="news.title"
                @error="handleImageError"
              >
              <div class="news-date-overlay">{{ formatDate(news.date) }}</div>
            </div>
            <div class="news-content-wrapper">
              <div class="news-meta">
                <div class="news-category">{{ news.category || 'Новости' }}</div>
                <div class="news-views" v-if="news.views">
                  смотрели {{ news.views }}
                </div>
              </div>
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-excerpt">{{ truncateText(news.excerpt, 150) }}</p>
              <router-link to="/DetailNews" class="news-link">
                Подробнее →
              </router-link>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loading && !error && news.length === 0" class="empty-state">
          <p>Новостей пока нет</p>
        </div>

        <!-- Пагинация -->
        <div v-if="news.length > 0" class="news-pagination">
          <button 
            v-for="page in totalPages" 
            :key="page"
            class="page-btn"
            :class="{ active: currentPage === page }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <button 
            v-if="currentPage < totalPages"
            class="page-btn"
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
      API_URL: 'https://693ad5679b80ba7262cb9443.mockapi.io/arai'
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.news.length / this.itemsPerPage)
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.news.slice(start, end)
    }
  },
  mounted() {
    this.fetchNews()
    this.initScrollAnimation()
    this.initHeaderScroll()
  },
  methods: {
    async fetchNews() {
      try {
        this.loading = true
        this.error = null
        
        // Запрос к вашему MockAPI
        const response = await fetch(this.API_URL)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Проверяем, что data - это массив
        if (Array.isArray(data)) {
          this.news = data
          // Сортируем по дате (новые первыми)
          this.news.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else {
          // Если API возвращает не массив, создаем тестовые данные
          this.news = this.createFallbackData()
        }
        
      } catch (error) {
        console.error('Error fetching news:', error)
        this.error = error.message
        // Если API не работает, используем fallback данные
        this.news = this.createFallbackData()
      } finally {
        this.loading = false
      }
    },


    formatDate(dateString) {
      if (!dateString) return 'Дата не указана'
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
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
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },

    initScrollAnimation() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards'
          }
        })
      }, observerOptions)

      setTimeout(() => {
        document.querySelectorAll('.news-card').forEach(card => {
          card.style.opacity = '0'
          observer.observe(card)
        })
      }, 100)
    },

    initHeaderScroll() {
      window.addEventListener('scroll', () => {
        const header = document.querySelector('.glass-header')
        if (header) {
          if (window.scrollY > 50) {
            header.classList.add('header-scrolled')
          } else {
            header.classList.remove('header-scrolled')
          }
        }
      })
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
            --gradient-accent: linear-gradient(135deg, #ff6b35 0%, #ff8a65 100%);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }
        
        body {
            background: var(--light);
            color: var(--dark);
            line-height: 1.6;
            overflow-x: hidden;
        }

        /* Animated Background */
        .animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
        }
        
        .floating-shape {
            position: absolute;
            border-radius: 50%;
            background: rgba(44, 90, 160, 0.05);
            animation: float 15s infinite ease-in-out;
        }
        
        .shape-1 {
            width: 150px;
            height: 150px;
            top: 10%;
            left: 5%;
            animation-delay: 0s;
        }
        
        .shape-2 {
            width: 200px;
            height: 200px;
            top: 60%;
            left: 80%;
            animation-delay: 3s;
        }
        
        .shape-3 {
            width: 100px;
            height: 100px;
            top: 80%;
            left: 10%;
            animation-delay: 6s;
        }
        
        .shape-4 {
            width: 180px;
            height: 180px;
            top: 20%;
            left: 70%;
            animation-delay: 9s;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            25% {
                transform: translateY(-20px) rotate(5deg);
            }
            50% {
                transform: translateY(10px) rotate(-5deg);
            }
            75% {
                transform: translateY(-15px) rotate(3deg);
            }
        }
        
        
        .glass-header {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(44, 90, 160, 0.1);
            z-index: 1000;
            padding: 12px 0;
            transition: all 0.3s ease;
        }
        
        .header-scrolled {
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .header-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 15px;
            text-decoration: none;
        }
        
        .logo-img {
            width: 50px;
            height: 50px;
            background: var(--gradient);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 800;
            font-size: 1.2rem;
        }
        
        .logo-text h1 {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary);
            line-height: 1.2;
        }
        
        .logo-text p {
            font-size: 0.8rem;
            color: var(--gray);
        }

        /* Main Navigation */
        .nav-main {
            display: flex;
            gap: 5px;
            align-items: center;
        }

        .nav-link {
            color: var(--dark);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            padding: 8px 16px;
            border-radius: 6px;
            transition: all 0.3s ease;
            position: relative;
            white-space: nowrap;
        }

        .nav-link:hover {
            background: var(--primary);
            color: white;
        }

        .dropdown {
            position: relative;
        }

        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            min-width: 220px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border-radius: 8px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .dropdown:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .dropdown-item {
            display: block;
            padding: 12px 20px;
            color: var(--dark);
            text-decoration: none;
            border-bottom: 1px solid #f0f0f0;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }

        .dropdown-item:hover {
            background: var(--primary);
            color: white;
        }

        .dropdown-item:last-child {
            border-bottom: none;
        }

        /* Language Switcher */
        .lang-switcher {
            display: flex;
            gap: 5px;
            margin-left: 20px;
        }

        .lang-btn {
            padding: 5px 10px;
            border: 1px solid var(--primary);
            border-radius: 4px;
            color: var(--primary);
            text-decoration: none;
            font-size: 0.8rem;
            transition: all 0.3s ease;
        }

        .lang-btn:hover {
            background: var(--primary);
            color: white;
        }
        
        /* Mobile Menu Button */
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--primary);
            cursor: pointer;
            z-index: 1001;
        }
        
        /* News Page Styles - Updated like agartu.kz */
        .news-hero {
            background: var(--gradient);
            color: white;
            padding: 150px 0 80px;
            text-align: center;
            margin-top: 70px;
        }
        
        .news-hero h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 20px;
        }
        
        .news-hero p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto;
            opacity: 0.9;
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
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 30px;
            margin-bottom: 50px;
        }
        
        /* Updated News Card Style like agartu.kz */
        .news-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .news-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }
        
        .news-image {
            width: 100%;
            height: 220px;
            position: relative;
            overflow: hidden;
        }
        
        .news-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .news-card:hover .news-image img {
            transform: scale(1.05);
        }
        
        .news-date-overlay {
            position: absolute;
            top: 15px;
            left: 15px;
            background: rgba(255, 255, 255, 0.95);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--primary);
            backdrop-filter: blur(10px);
        }
        
        .news-content-wrapper {
            padding: 25px;
        }
        
        .news-meta {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 12px;
            font-size: 0.85rem;
            color: var(--gray);
        }
        
        .news-views {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .news-category {
            background: var(--gradient);
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 500;
        }
        
        .news-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            color: var(--dark);
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .news-excerpt {
            color: var(--gray);
            margin-bottom: 20px;
            line-height: 1.6;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .news-link {
            color: var(--accent);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
        }
        
        .news-link:hover {
            color: var(--accent-light);
            transform: translateX(5px);
        }
        
        .news-pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 50px;
        }
        
        .page-btn {
            padding: 12px 20px;
            background: white;
            border: 2px solid var(--primary);
            border-radius: 8px;
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .page-btn:hover,
        .page-btn.active {
            background: var(--primary);
            color: white;
        }
        
        /* Footer */
        footer {
            background: var(--dark);
            color: white;
            padding: 40px 0;
            text-align: center;
        }
        
        /* Responsive Styles */
        @media (max-width: 1024px) {
            .nav-main {
                display: none;
            }
            
            .mobile-menu-btn {
                display: block;
            }
        }
        
        @media (max-width: 768px) {
            .news-hero {
                padding: 120px 0 60px;
                margin-top: 60px;
            }
            
            .news-hero h1 {
                font-size: 2.2rem;
            }
            
            .news-hero p {
                font-size: 1rem;
            }
            
            .news-grid {
                grid-template-columns: 1fr;
                gap: 25px;
            }
            
            .news-content-wrapper {
                padding: 20px;
            }
            
            .news-title {
                font-size: 1.2rem;
            }
        }
        
        @media (max-width: 480px) {
            .news-hero h1 {
                font-size: 1.8rem;
            }
            
            .news-image {
                height: 180px;
            }
        }

        /* Animation */
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>