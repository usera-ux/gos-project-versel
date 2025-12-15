<template>
  <div class="seminars-page">
    <!-- Seminars Hero Section -->
    <section class="seminars-hero">
      <div class="container">
        <h1>Семинары</h1>
        <p>Профессиональное развитие и повышение квалификации для маркетологов</p>
      </div>
    </section>


    <section class="seminars-content">
      <div class="seminars-container">
      
        <div class="seminars-grid">
  
          <div 
            v-for="(seminar, index) in paginatedSeminars" 
            :key="seminar.id"
            class="seminar-card"
            :style="{ animationDelay: (index * 0.1) + 's' }"
            ref="seminarCards"
          >
            <div class="seminar-date">{{ seminar.date }}</div>
            <h3 class="seminar-title">{{ seminar.title }}</h3>
            <div class="seminar-goal" v-if="seminar.goal">Цель:</div>
            <p class="seminar-description">{{ seminar.description }}</p>
            <!-- <a :href="seminar.link" class="seminar-link">Подробнее →</a> -->
          </div>
        </div>

   
        <div class="seminars-pagination" v-if="totalPages > 1">
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
  name: 'Seminars',

  setup() {

    const isScrolled = ref(false)
    const mobileMenuOpen = ref(false)
    const currentPage = ref(1)
    const itemsPerPage = 5
    const seminarCards = ref([])

    const seminars = ref([
      {
        id: 1,
        title: 'Техника активных продаж',
        date: '27-11-2014',
        goal: 'Повышение профессионального мастерства торгового персонала и качества обслуживания покупателей. Формирование умений и навыков, способствующих успешным продажам.',
        description: 'Повышение профессионального мастерства торгового персонала и качества обслуживания покупателей. Формирование умений и навыков, способствующих успешным продажам.',
        link: '#'
      },
      {
        id: 2,
        title: 'Новые течения в практике маркетинга – оптимизация ресурсов без потерь в эффективности',
        date: '24-11-2014',
        goal: 'Обеспечить основные знания в области современных инструментов инвестиционного маркетинга.',
        description: 'Обеспечить основные знания в области современных инструментов инвестиционного маркетинга. Это необходимо любому современному предприятию для повышения эффективности действующей системы маркетинга в условиях не оставляющего своих «рубежей» системного экономического кризиса. Особенно актуальна проблематика семинара для небольших компаний, не располагающих значительными бюджетами маркетинга.',
        link: '#'
      },
      {
        id: 3,
        title: 'Тренинг продаж - Техники и правила успешных продаж',
        date: '19-11-2014',
        description: 'Данный тренинг рассчитан на специалистов отдела продаж, которым необходим новый уровень развития и повышение квалификации.',
        link: '#'
      },
      {
        id: 4,
        title: 'Инструменты контентного маркетинга: блог для компании',
        date: '15-11-2014',
        description: 'Блог для бизнеса – важная составляющая контент-маркетинга. Тематика и подача материалов в таком блоге позволяют компании решить несколько задач: продавать свои продукты через полезный контент, вовлекать представителей целевой аудитории, увеличивать узнаваемость бренда и поддерживать интерес лояльных потребителей. Как настроить блог для бизнеса, чтобы он стал продающим инструментом, расскажет на этом вебинар консультант по маркетингу Артем Полянский.',
        link: '#'
      },
      {
        id: 5,
        title: 'Контент-маркетинг: основные темы и проблемы',
        date: '04-11-2014',
        description: 'Контент-маркетинг - это классические принципы маркетинга, PR и распространения полезной информации. Вы узнаете, какую информацию распространять, где и в каком виде.',
        link: '#'
      },
         {
        id: 6,
        title: 'Контент-маркетинг: основные темы и проблемы',
        date: '04-11-2014',
        description: 'Контент-маркетинг - это классические принципы маркетинга, PR и распространения полезной информации. Вы узнаете, какую информацию распространять, где и в каком виде.',
        link: '#'
      }
      ,
         {
        id: 7,
        title: 'Контент-маркетинг: основные темы и проблемы',
        date: '04-11-2014',
        description: 'Контент-маркетинг - это классические принципы маркетинга, PR и распространения полезной информации. Вы узнаете, какую информацию распространять, где и в каком виде.',
        link: '#'
      }
    ])

    // Computed
    const totalPages = computed(() => {
      return Math.ceil(seminars.value.length / itemsPerPage)
    })

    const paginatedSeminars = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return seminars.value.slice(start, end)
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
       
        resetCardAnimations()
      }
    }

    const resetCardAnimations = () => {
      nextTick(() => {
        seminarCards.value.forEach(card => {
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
        seminarCards.value.forEach(card => {
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
      seminars,
      paginatedSeminars,
      totalPages,
      seminarCards,
      toggleMobileMenu,
      changePage
    }
  }
}
</script>

<style scoped>
.seminars-page {
  position: relative;
}


.seminars-hero {
  background: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
  color: white;
  padding: 150px 0 80px;
  text-align: center;
}

.seminars-hero h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.seminars-hero p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.9;
}

.seminars-content {
  padding: 80px 0;
}

.seminars-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.seminars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.seminar-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-left: 5px solid #ff6b35;
  opacity: 0;
  transform: translateY(30px);
}

.seminar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 4px;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8a65 100%);
  transition: left 0.3s ease;
}

.seminar-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.seminar-card:hover::before {
  left: 0;
}

.seminar-date {
  background: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.seminar-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #2c5aa0;
  line-height: 1.4;
}

.seminar-goal {
  color: #ff6b35;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 1rem;
}

.seminar-description {
  color: #718096;
  margin-bottom: 20px;
  line-height: 1.6;
}

.seminar-link {
  color: #ff6b35;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.seminar-link:hover {
  color: #ff8a65;
  transform: translateX(5px);
}

.seminars-pagination {
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
  border: none;
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
  .seminars-hero {
    padding: 120px 0 60px;
  }
  
  .seminars-hero h1 {
    font-size: 2.2rem;
  }
  
  .seminars-hero p {
    font-size: 1rem;
  }
  
  .seminars-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .seminar-card {
    padding: 25px 20px;
  }
  
  .seminar-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .seminars-hero h1 {
    font-size: 1.8rem;
  }
}
</style>