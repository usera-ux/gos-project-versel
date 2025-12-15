<template>
  <div class="exhibitions-page">
    <!-- Header Component -->
    <AppHeader :scrolled="isScrolled" @toggle-mobile="toggleMobileMenu" />

    <!-- Exhibitions Hero Section -->
    <section class="exhibitions-hero">
      <div class="container">
        <h1>Выставки</h1>
        <p>Международные выставки и форумы для профессионалов различных отраслей</p>
      </div>
    </section>

    <!-- Exhibitions Content -->
    <section class="exhibitions-content">
      <div class="exhibitions-container">
 
        <div class="exhibitions-grid">
 
          <div 
            v-for="(exhibition, index) in paginatedExhibitions" 
            :key="exhibition.id"
            class="exhibition-card"
            :style="{ animationDelay: (index * 0.1) + 's' }"
            ref="exhibitionCards"
          >
            <img :src="exhibition.image" :alt="exhibition.title" class="exhibition-image">
            <div class="exhibition-content">
              <div class="exhibition-date">{{ exhibition.date }}</div>
              <h3 class="exhibition-title">{{ exhibition.title }}</h3>
              <div class="exhibition-details">
                <div class="exhibition-detail">
                  <i>📍</i> {{ exhibition.venue }}
                </div>
               
              </div>
              <div class="exhibition-industry">{{ exhibition.industry }}</div>
              <p class="exhibition-description">{{ exhibition.description }}</p>
             
            </div>
          </div>
        </div>

        <!-- Пагинация -->
        <div class="exhibitions-pagination" v-if="totalPages > 1">
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
            class="page-btn" 
            v-if="currentPage < totalPages"
            @click="changePage(currentPage + 1)"
          >
            →
          </button>
        </div>
      </div>
    </section>

 
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

export default {
  name: 'Exhibitions',

  setup() {

    const isScrolled = ref(false)
    const mobileMenuOpen = ref(false)
    const currentPage = ref(1)
    const itemsPerPage = 6
    const exhibitionCards = ref([])


    const exhibitions = ref([
      {
        id: 1,
        title: '12-я Центрально-Азиатская международная выставка «CleanExpo Central Asia 2014»',
        date: '5-7 ноября 2014',
        location: 'Казахстан, Алматы',
        venue: 'КЦДС «Атакент»',
        industry: 'Потребительские товары',
        description: 'Крупнейшая выставка потребительских товаров в Центральной Азии, демонстрирующая последние тенденции и инновации в индустрии.',
        image: 'http://kamp.kz/files/sites/1369648304051529/files/cleanexpo2013_0.png',
        link: '#'
      },
      {
        id: 2,
        title: '13-я Казахстанская международная выставка и форум энергетиков «Power Kazakhstan 2014»',
        date: '28-30 октября 2014',
        location: 'Казахстан, Алматы',
        venue: 'КЦДС «Атакент»',
        industry: 'Энергетика, электротехника и электроника',
        description: 'Ведущая выставка энергетической отрасли, представляющая современные технологии и решения для энергетического сектора Казахстана.',
        image: 'http://kamp.kz/files/sites/1369648304051529/files/logo-power.png',
        link: '#'
      },
      {
        id: 3,
        title: '4-я Казахстанская международная выставка «Lighting Kazakhstan 2014»',
        date: '28-30 октября 2014',
        location: 'Казахстан, Алматы',
        venue: 'КЦДС «Атакент»',
        industry: 'Энергетика, электротехника и электроника',
        description: 'Специализированная выставка осветительного оборудования и технологий, представляющая инновационные решения в области освещения.',
        image: 'http://kamp.kz/files/sites/1369648304051529/files/logo-lighting.png',
        link: '#'
      },
      {
        id: 4,
        title: '4-я Казахстанская международная выставка «ReEnergy Kazakhstan 2014»',
        date: '28-30 октября 2014',
        location: 'Казахстан, Алматы',
        venue: 'КЦДС «Атакент»',
        industry: 'Энергетика, электротехника и электроника',
        description: 'Выставка, посвященная возобновляемым источникам энергии и энергоэффективным технологиям для устойчивого развития.',
        image: 'http://kamp.kz/files/sites/1369648304051529/files/logo-reenergy.png',
        link: '#'
      },
      {
        id: 5,
        title: '5-я Казахстанская международная выставка по животноводству и мясо-молочной промышленности «KazFarm 2014»',
        date: '27-29 октября 2014',
        location: 'Казахстан, Астана',
        venue: 'Выставочный комплекс «Корме»',
        industry: 'Сельское хозяйство',
        description: 'Ключевое событие для специалистов животноводческой отрасли, представляющее современные технологии и оборудование.',
        image: 'http://kamp.kz/files/sites/1369648304051529/files/image003.jpg',
        link: '#'
      },
      {
        id: 6,
        title: '5-я Казахстанская международная выставка сельского хозяйства и пищевой промышленности «KazAgro 2014»',
        date: '27-29 октября 2014',
        location: 'Казахстан, Астана',
        venue: 'Выставочный комплекс «Корме»',
        industry: 'Сельское хозяйство',
        description: 'Ведущая аграрная выставка, демонстрирующая достижения в сельском хозяйстве и пищевой промышленности Казахстана.',
        image: 'http://kamp.kz/files/sites/1369648304051529/files/kazagro.png',
        link: '#'
      },
      
    ])


    const totalPages = computed(() => {
      return Math.ceil(exhibitions.value.length / itemsPerPage)
    })

    const paginatedExhibitions = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return exhibitions.value.slice(start, end)
    })


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

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
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
        exhibitionCards.value.forEach(card => {
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
      setupCardAnimations()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isScrolled,
      mobileMenuOpen,
      currentPage,
      exhibitions,
      paginatedExhibitions,
      totalPages,
      exhibitionCards,
      toggleMobileMenu,
      changePage
    }
  }
}
</script>

<style scoped>
.exhibitions-page {
  position: relative;
}

/* Exhibitions Page Styles */
.exhibitions-hero {
  background: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
  color: white;
  padding: 150px 0 80px;
  text-align: center;
}

.exhibitions-hero h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.exhibitions-hero p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.9;
}

.exhibitions-content {
  padding: 80px 0;
}

.exhibitions-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.exhibitions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.exhibition-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
}

.exhibition-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 4px;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8a65 100%);
  transition: left 0.3s ease;
  z-index: 2;
}

.exhibition-card img {
  object-fit: contain;
  width: 100%;
}

.exhibition-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.exhibition-card:hover::before {
  left: 0;
}

.exhibition-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #f0f0f0;
}

.exhibition-content {
  padding: 25px;
}

.exhibition-date {
  background: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 15px;
  font-size: 0.9rem;
  font-weight: 600;
}

.exhibition-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #2c5aa0;
  line-height: 1.4;
}

.exhibition-details {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
}

.exhibition-detail {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #718096;
  font-size: 0.9rem;
}

.exhibition-detail i {
  color: #ff6b35;
}

.exhibition-industry {
  background: #ff6b35;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 15px;
}

.exhibition-description {
  color: #718096;
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 0.95rem;
}

.exhibition-link {
  color: #ff6b35;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.exhibition-link:hover {
  color: #ff8a65;
  transform: translateX(5px);
}

.exhibitions-pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 50px;
}

.page-btn {
  padding: 12px 20px;
  background: white;
  border: 2px solid #2c5aa0;
  border-radius: 8px;
  color: #2c5aa0;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
}

.page-btn:hover,
.page-btn.active {
  background: #2c5aa0;
  color: white;
}

/* Footer */
footer {
  background: #2d3748;
  color: white;
  padding: 40px 0;
  text-align: center;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .exhibitions-hero {
    padding: 120px 0 60px;
  }
  
  .exhibitions-hero h1 {
    font-size: 2.2rem;
  }
  
  .exhibitions-hero p {
    font-size: 1rem;
  }
  
  .exhibitions-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .exhibition-content {
    padding: 20px;
  }
  
  .exhibition-title {
    font-size: 1.2rem;
  }
  
  .exhibition-image {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .exhibitions-hero h1 {
    font-size: 1.8rem;
  }
  
  .exhibition-image {
    height: 150px;
  }
}
</style>