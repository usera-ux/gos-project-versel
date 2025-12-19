<template>
  <div class="books-page">

    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
    

    <section class="books-hero">
      <div class="container">
        <h1>Коллекция книг по продажам</h1>
        <p>Актуальные издания для развития профессиональных навыков в продажах и маркетинге</p>
      </div>
    </section>


    <section class="books-content">
      <div class="books-container">

        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Загрузка книг...</p>
        </div>


        <div v-else-if="error" class="error-state">
          <h3>Ошибка загрузки</h3>
          <p>{{ error }}</p>
          <button @click="loadBooks" class="retry-btn">Повторить</button>
        </div>


        <div v-else>
       


          <div class="books-grid" v-if="filteredBooks.length > 0">
            <div 
              v-for="(book, index) in paginatedBooks" 
              :key="book.id"
              class="book-card"
              :style="{ animationDelay: (index * 0.1) + 's' }"
              ref="bookCards"
              @click="openModal(book)"
            >
              <div class="book-cover">
                <img :src="book.cover || getPlaceholderImage(book.id)" :alt="book.title" />
                <div class="book-badge" v-if="book.isBestseller">Бестселлер</div>
              </div>
              <div class="book-content">
                <h3 class="book-title">{{ book.title }}</h3>
                <div class="book-author">{{ book.author }}</div>
                <div class="book-details">
                  <div class="book-detail">{{ book.year }}</div>
                  <div class="book-detail">{{ book.pages }} стр.</div>
                </div>
                <div class="book-publisher">{{ book.publisher }}</div>
                <button class="book-link" @click.stop="openModal(book)">Читать онлайн →</button>
              </div>
            </div>
          </div>

          
          <div v-if="!loading && filteredBooks.length === 0" class="no-results">
            <h3>Книги не найдены</h3>
            <p>Попробуйте изменить критерии поиска</p>
          </div>

      
          
          <div class="books-pagination" v-if="totalPages > 1">
            <button 
              class="page-btn"
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              ←
            </button>
            <button 
              v-for="page in visiblePages" 
              :key="page"
              class="page-btn"
              :class="{ active: currentPage === page }"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
            <button 
              class="page-btn"
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Book Modal -->
    <div class="book-modal" :class="{ active: showModal }" @click.self="closeModal">
      <div class="modal-content bg-white" v-if="selectedBook">
        <button class="modal-close" @click="closeModal">×</button>
        <div class="modal-header">
          <h2 class="modal-title">{{ selectedBook.title }}</h2>
          <div class="modal-author">Автор: {{ selectedBook.author }}</div>
        </div>
        <div class="modal-body">
          <div class="modal-cover">
            <img :src="selectedBook.cover || getPlaceholderImage(selectedBook.id)" :alt="selectedBook.title" />
          </div>
          <div class="modal-info">
            <div class="annotation">
              <h3>Аннотация</h3>
              <p>{{ selectedBook.annotation || 'Аннотация отсутствует' }}</p>
            </div>
            <div class="book-details-modal">
              <div class="detail-item">
                <div class="detail-label">Год издания</div>
                <div class="detail-value">{{ selectedBook.year }}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Количество страниц</div>
                <div class="detail-value">{{ selectedBook.pages }}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Издательство</div>
                <div class="detail-value">{{ selectedBook.publisher }}</div>
              </div>
              <div class="detail-item" v-if="selectedBook.isbn">
                <div class="detail-label">ISBN</div>
                <div class="detail-value">{{ selectedBook.isbn }}</div>
              </div>
              <div class="detail-item" v-if="selectedBook.rating">
                <div class="detail-label">Рейтинг</div>
                <div class="detail-value">{{ selectedBook.rating }} / 5</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-primary" @click="readOnline(selectedBook)">Читать онлайн</button>
          <button class="btn-secondary " @click="closeModal">Вернуться к списку</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'


export default {
  name: 'Library',

  setup() {

    const isScrolled = ref(false)
    const mobileMenuOpen = ref(false)
    const currentPage = ref(1)
    const itemsPerPage = 12
    const bookCards = ref([])
    const showModal = ref(false)
    const selectedBook = ref(null)
    const searchQuery = ref('')
    const selectedPublisher = ref('')
    const selectedYear = ref('')
    const books = ref([])
    const loading = ref(true)
    const error = ref(null)


    const API_URL = 'https://693ad5679b80ba7262cb9443.mockapi.io/library'


    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
      if (mobileMenuOpen.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }

    const loadBooks = async () => {
      try {
        loading.value = true
        error.value = null
        
        const response = await fetch(API_URL)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        books.value = Array.isArray(data) ? data : []
        

        if (books.value.length === 0) {
          console.log('Нет данных в API, загружаем примерные данные...')
          books.value = getSampleBooks()
        }
        
        setupCardAnimations()
      } catch (err) {
        console.error('Ошибка загрузки книг:', err)
        error.value = 'Не удалось загрузить книги. Пожалуйста, попробуйте позже.'
        books.value = getSampleBooks()
      } finally {
        loading.value = false
      }
    }
    const getPlaceholderImage = (id) => {
      const placeholders = [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300',
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300'
      ]
      return placeholders[id % placeholders.length]
    }
    const publishers = computed(() => {
      const uniquePublishers = new Set(books.value.map(book => book.publisher).filter(Boolean))
      return Array.from(uniquePublishers).sort()
    })

    const years = computed(() => {
      const uniqueYears = new Set(books.value.map(book => book.year).filter(Boolean))
      return Array.from(uniqueYears).sort((a, b) => b - a)
    })

    const publishersCount = computed(() => publishers.value.length)
    const latestYear = computed(() => Math.max(...years.value.map(y => parseInt(y) || 0)))
    const bestsellersCount = computed(() => {
      return books.value.filter(book => book.isBestseller).length
    })

    const filteredBooks = computed(() => {
      return books.value.filter(book => {
        const matchesSearch = searchQuery.value === '' || 
          book.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchQuery.value.toLowerCase())
        
        const matchesPublisher = selectedPublisher.value === '' || 
          book.publisher === selectedPublisher.value
        
        const matchesYear = selectedYear.value === '' || 
          book.year === selectedYear.value
        
        return matchesSearch && matchesPublisher && matchesYear
      })
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredBooks.value.length / itemsPerPage)
    })

    const paginatedBooks = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filteredBooks.value.slice(start, end)
    })

    const visiblePages = computed(() => {
      const pages = []
      const maxVisible = 5
      
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      let end = Math.min(totalPages.value, start + maxVisible - 1)
      
      start = Math.max(1, end - maxVisible + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    })
    const handleSearch = () => {
      currentPage.value = 1
      filterBooks()
    }

    const filterBooks = () => {
      currentPage.value = 1
      resetCardAnimations()
    }

    const resetFilters = () => {
      searchQuery.value = ''
      selectedPublisher.value = ''
      selectedYear.value = ''
      currentPage.value = 1
      filterBooks()
    }
    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        resetCardAnimations()
      }
    }
    const openModal = (book) => {
      selectedBook.value = book
      showModal.value = true
      document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
      showModal.value = false
      selectedBook.value = null
      document.body.style.overflow = ''
    }

    const readOnline = (book) => {
      alert(`Открытие книги "${book.title}" для чтения онлайн...`)
      closeModal()
    }

    const resetCardAnimations = () => {
      nextTick(() => {
        bookCards.value.forEach(card => {
          if (card) {
            card.style.opacity = '0'
            card.style.transform = 'translateY(30px)'
            card.style.animation = 'none'
            
            setTimeout(() => {
              card.style.opacity = '1'
              card.style.transform = 'translateY(0)'
              card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
            }, 100)
          }
        })
      })
    }

    const setupCardAnimations = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })

      nextTick(() => {
        bookCards.value.forEach(card => {
          if (card) {
            card.style.opacity = '0'
            card.style.transform = 'translateY(30px)'
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
            observer.observe(card)
          }
        })
      })
    }
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      loadBooks()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isScrolled,
      mobileMenuOpen,
      currentPage,
      books,
      filteredBooks,
      paginatedBooks,
      totalPages,
      visiblePages,
      bookCards,
      showModal,
      selectedBook,
      searchQuery,
      selectedPublisher,
      selectedYear,
      publishers,
      years,
      publishersCount,
      latestYear,
      bestsellersCount,
      loading,
      error,
      toggleMobileMenu,
      changePage,
      openModal,
      closeModal,
      readOnline,
      handleSearch,
      filterBooks,
      resetFilters,
      loadBooks,
      getPlaceholderImage
    }
  }
}
</script>

<style scoped>
.loading-state {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}


.error-state {
  text-align: center;
  padding: 60px 20px;
  color: #ef4444;
}

.error-state h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.retry-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #1d4ed8;
}

.reset-btn {
  background: #64748b;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: #475569;
}
</style>

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
	       body {
        background: var(--light);
        color: var(--dark);
        line-height: 1.6;
        overflow-x: hidden;
        position: relative;
    }

    .books-content {
        padding: 80px 0;
        background: transparent; 
        position: relative;
        z-index: 1;
    }

 
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
        
        
        :root {
            --primary: #2563eb;
            --primary-light: #3b82f6;
            --primary-dark: #1d4ed8;
            --secondary: #f8fafc;
            --accent: #f59e0b;
            --accent-light: #fbbf24;
            --dark: #1e293b;
            --light: #ffffff;
            --gray: #64748b;
            --gray-light: #f1f5f9;
            --gradient: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
            --gradient-hero: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 60%);
            --gradient-accent: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
            --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }
        
       
        
        /* Glass Header */
        .glass-header {
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(37, 99, 235, 0.1);
            z-index: 1000;
            padding: 12px 0;
            transition: all 0.3s ease;
        }
        
        .header-scrolled {
            box-shadow: var(--shadow);
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
            border-radius: 8px;
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
            box-shadow: var(--shadow-lg);
            border-radius: 12px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.3s ease;
            z-index: 1000;
            border: 1px solid var(--gray-light);
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
            border-bottom: 1px solid var(--gray-light);
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
            border-radius: 6px;
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
        
    
        .books-hero {
          
           
            padding: 160px 0 80px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
    
        
        .books-hero h1 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 20px;
            position: relative;
            color: #2c5aa0;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .books-hero p {
            font-size: 1.4rem;
            max-width: 700px;
            margin: 0 auto;
            opacity: 0.9;
            position: relative;
            font-weight: 400;
            color: #64748b;
          
        }
        
       
        
        .books-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        
        .books-header {
            text-align: center;
            margin-bottom: 60px;
            margin-top: 100px;
        }
        
        .books-title {
            font-size: 2.8rem;
            font-weight: 700;
            color: var(--dark);
            margin-bottom: 15px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .books-subtitle {
            font-size: 1.2rem;
            color: var(--gray);
            max-width: 600px;
            margin: 0 auto;
            font-weight: 400;
        }
        
        .books-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }
        
        .book-card {
            background: white;
            border-radius: 20px;
            padding: 0;
            box-shadow: var(--shadow);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            border: 1px solid var(--gray-light);
        }
        
        .book-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }
        
        .book-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-lg);
        }
        
        .book-card:hover::before {
            transform: scaleX(1);
        }
        
        .book-cover {
            height: 220px;
            background: var(--gray-light);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }
        
        .book-cover img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: transform 0.3s ease;
        }
        
        .book-card:hover .book-cover img {
            transform: scale(1.05);
        }
        
        .book-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: var(--gradient-accent);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 600;
            z-index: 2;
        }
        
        .book-content {
            padding: 25px;
        }
        
        .book-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--dark);
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .book-author {
            color: var(--primary);
            font-weight: 500;
            margin-bottom: 15px;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .book-author::before {
            content: '👤';
            font-size: 0.8rem;
        }
        
        .book-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .book-detail {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--gray);
            font-size: 0.85rem;
        }
        
        .book-detail i {
            color: var(--accent);
            width: 16px;
            text-align: center;
        }
        
        .book-publisher {
            background: var(--gray-light);
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.8rem;
            color: var(--dark);
            display: inline-block;
            margin-bottom: 20px;
            border-left: 3px solid var(--primary);
        }
        
        .book-link {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            border: 2px solid var(--primary);
            border-radius: 8px;
            font-size: 0.9rem;
            width: 100%;
            justify-content: center;
            cursor: pointer;
            background: none;
            font-family: inherit;
        }
        
        .book-link:hover {
            background: var(--primary);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        
        /* Book Modal Styles */
        .book-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 2000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .book-modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 40px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: var(--shadow-lg);
            position: relative;
            animation: modalSlideUp 0.3s ease;
        }

        @keyframes modalSlideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: var(--gray-light);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.2rem;
            color: var(--dark);
            transition: all 0.3s ease;
        }

        .modal-close:hover {
            background: var(--primary);
            color: white;
        }

        .modal-header {
            margin-bottom: 30px;
            border-bottom: 2px solid var(--gray-light);
            padding-bottom: 20px;
        }

        .modal-title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--dark);
            margin-bottom: 10px;
        }

        .modal-author {
            font-size: 1.2rem;
            color: var(--primary);
            font-weight: 500;
        }

        .modal-body {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .modal-cover {
            text-align: center;
        }

        .modal-cover img {
            width: 100%;
            max-width: 250px;
            border-radius: 10px;
            box-shadow: var(--shadow);
        }

        .modal-info {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .annotation {
            background: var(--gray-light);
            padding: 25px;
            border-radius: 15px;
            border-left: 4px solid var(--primary);
        }

        .annotation h3 {
            color: var(--primary);
            margin-bottom: 15px;
            font-size: 1.3rem;
        }

        .annotation p {
            line-height: 1.8;
            color: var(--dark);
        }

        .book-details-modal {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .detail-item {
            background: white;
            padding: 15px;
            border-radius: 10px;
            border: 1px solid var(--gray-light);
        }

        .detail-label {
            font-size: 0.8rem;
            color: var(--gray);
            margin-bottom: 5px;
        }

        .detail-value {
            font-weight: 600;
            color: var(--dark);
        }

        .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }

        .btn-primary {
            background: var(--primary);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            flex: 1;
        }

        .btn-primary:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }

        .btn-secondary {
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            flex: 1;
            background-color: #f59e0b;
        }

        .btn-secondary:hover {
            background: var(--gray);
            color: white;
        }

        .books-pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 50px;
        }
        
        .page-btn {
            padding: 12px 20px;
            background: white;
            border: 2px solid var(--primary);
            border-radius: 10px;
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .page-btn:hover,
        .page-btn.active {
            background: var(--primary);
            color: white;
            transform: translateY(-2px);
        }
        
        .library-stats {
            background: white;
            border-radius: 20px;
            padding: 50px;
            margin: 80px 0;
            box-shadow: var(--shadow);
            border: 1px solid var(--gray-light);
            position: relative;
            overflow: hidden;
        }
        
        .library-stats::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            text-align: center;
        }
        
        .stat-item {
            padding: 20px;
            position: relative;
        }
        
        .stat-item::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 3px;
            background: var(--gradient);
            border-radius: 2px;
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary);
            margin-bottom: 10px;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .stat-label {
            color: var(--gray);
            font-size: 1rem;
            font-weight: 500;
        }
        
        /* Footer */
        footer {
            background: var(--dark);
            color: white;
            padding: 50px 0;
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
            .books-hero {
                padding: 140px 0 60px;
            }
            
            .books-hero h1 {
                font-size: 2.5rem;
            }
            
            .books-hero p {
                font-size: 1.1rem;
            }
            
            .books-hero::after {
                font-size: 4rem;
            }
            
            .books-grid {
                grid-template-columns: 1fr;
                gap: 25px;
            }
            
            .book-title {
                font-size: 1.2rem;
            }
            
            .books-title {
                font-size: 2.2rem;
            }
            
            .modal-body {
                grid-template-columns: 1fr;
            }
            
            .modal-cover {
                text-align: center;
            }
            
            .modal-cover img {
                max-width: 200px;
            }
            
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 30px;
            }
            
            .library-stats {
                padding: 30px;
            }
        }
        
        @media (max-width: 480px) {
            .books-hero h1 {
                font-size: 2rem;
            }
            
            .books-title {
                font-size: 1.8rem;
            }
            
            .modal-content {
                padding: 20px;
            }
            
            .modal-title {
                font-size: 1.5rem;
            }
            
            .book-details-modal {
                grid-template-columns: 1fr;
            }
            
            .modal-actions {
                flex-direction: column;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .stat-number {
                font-size: 2.5rem;
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
 
.breadcrumbs {
    padding: 15px 0;
    margin-top:100px;
    font-size: 14px;
}

.breadcrumbs__list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
}

.breadcrumbs__item {
    margin-right: 5px;
    display: flex;
    align-items: center;
}

.breadcrumbs__item:not(:last-child)::after {
    content: "/";
    margin-left: 5px;
    color: #6c757d;
}

.breadcrumbs__link {
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s;
}

.breadcrumbs__link:hover {
    color: #0056b3;
    text-decoration: underline;
}

.breadcrumbs__current {
    color: #6c757d;
    cursor: default;
}</style>