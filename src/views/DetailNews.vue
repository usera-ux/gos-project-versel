<template>
  <div id="app">

    <div class="floating-shape" :style="shapeStyle(1)"></div>
    <div class="floating-shape" :style="shapeStyle(2)"></div>
    <div class="floating-shape" :style="shapeStyle(3)"></div>
    <div class="floating-shape" :style="shapeStyle(4)"></div>

    <AppHeader :scrolled="isScrolled" @toggle-mobile="toggleMobileMenu" />


    <section class="news-detail-hero">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <router-link 
      v-if="$router"
      to="/news" 
      class="back-link d-inline-flex align-items-center gap-2"
    >
      <i class="bi bi-arrow-left"></i> Назад к новостям
    </router-link>
            <h1 class="news-detail-title mt-3">{{ currentNews.title }}</h1>
            <div class="d-flex flex-wrap align-items-center gap-3 mt-4">
              <div class="d-flex align-items-center gap-2">
                <i class="bi bi-calendar"></i>
                <span>{{ currentNews.date }}</span>
              </div>
              <div class="d-flex align-items-center gap-2">
                <i class="bi bi-eye"></i>
                <span>Просмотров: {{ currentNews.views }}</span>
              </div>
              <div class="news-category">{{ currentNews.category }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
          <div class="news-detail-content">
            <img :src="currentNews.image" :alt="currentNews.title" class="news-detail-image w-100">
            <div class="p-4 p-md-5">
              <div class="news-detail-text" v-html="currentNews.content"></div>

 
              <div class="news-source">
                <div class="source-title">Источник:</div>
                <a :href="currentNews.source" target="_blank" class="source-link">{{ currentNews.source }}</a>
              </div>
              

              <div class="d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
                <a v-if="hasPrev" :href="'?id=' + prevNewsId" class="nav-btn">
                  <i class="bi bi-arrow-left"></i> Предыдущая
                </a>
                <div v-else></div>
                
              <router-link to="/news" class="nav-btn">
  Все новости
</router-link>
                <a v-if="hasNext" :href="'?id=' + nextNewsId" class="nav-btn">
                  Следующая <i class="bi bi-arrow-right"></i>
                </a>
                <div v-else></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  
    <footer class="py-4 mt-5">
      <div class="container text-center">
        <p class="mb-2">Казахстанская ассоциация профессиональных маркетологов</p>
        <p class="mb-0 opacity-75">Астана 2023</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'


export default {
  name: 'DetailNews',
  setup() {

    const newsData = {
      'news1': {
        id: 'news1',
        title: 'Приказ об итогах от 24.11.25',
        date: '24.11.2025',
        views: 21,
        category: 'Официально',
        image: 'https://agartu.kz/files/sites/1480487029313134/news/1763652067440415.jpg',
        source: 'https://pavlosdr.agartu.kz/news?lang=ru&pkid=1763979401904680',
        content: `<p>Опубликован официальный приказ об итогах деятельности ассоциации за текущий период. Документ содержит информацию о достижениях, результатах работы и планах на будущее.</p>
                  
                  <h3>Основные положения приказа:</h3>
                  <ul>
                    <li>Подведение итогов работы за отчетный период</li>
                    <li>Анализ достигнутых показателей и результатов</li>
                    <li>Определение стратегических направлений развития</li>
                    <li>Утверждение плана мероприятий на следующий период</li>
                  </ul>
                  
                  <p>Приказ подписан председателем ассоциации и направлен во все региональные отделения для ознакомления и исполнения.</p>
                  
                  <p>С полным текстом приказа можно ознакомиться в официальном разделе документации ассоциации.</p>`
      },
      'news2': {
        id: 'news2',
        title: 'Акция в голубом',
        date: '20.11.2025',
        views: 48,
        category: 'Мероприятия',
        image: 'https://agartu.kz/files/sites/1459273204820373/news/1763959624664542.jfif',
        source: 'https://school-14sko.edu.kz/news?lang=ru&pkid=1763959624664542',
        content: `<p>Сегодня, 20 ноября, в нашей ассоциации прошла «Акция в голубом», посвящённая важной социальной теме. Участники и члены ассоциации приняли активное участие в мероприятии.</p>
                  
                  <h3>Цели акции:</h3>
                  <ul>
                    <li>Повышение осведомленности о важности социальной ответственности</li>
                    <li>Объединение членов ассоциации вокруг общей идеи</li>
                    <li>Привлечение внимания к актуальным социальным вопросам</li>
                  </ul>
                  
                  <p>В рамках акции были организованы тематические мастер-классы, дискуссионные площадки и информационные сессии. Участники смогли обменяться опытом и обсудить пути решения актуальных проблем.</p>
                  
                  <p>Акция завершилась торжественной церемонией, на которой были отмечены наиболее активные участники и подведены итоги мероприятия.</p>`
      },
      'news3': {
        id: 'news3',
        title: 'Викторина по маркетингу',
        date: '19.11.2025',
        views: 56,
        category: 'Образование',
        image: 'https://agartu.kz/files/sites/1459273204820373/news/1763959023836429.jfif',
        source: 'https://school-14sko.edu.kz/news?lang=ru&pkid=1763959023836429',
        content: `<p>Сегодня прошла викторина среди участников ассоциации. Мероприятие способствовало развитию интеллектуальных способностей и командного духа участников.</p>
                  
                  <h3>Формат викторины:</h3>
                  <ul>
                    <li>Командные соревнования по маркетинговой тематике</li>
                    <li>Разнообразные форматы вопросов: тесты, кейсы, практические задания</li>
                    <li>Экспертное жюри из ведущих специалистов отрасли</li>
                  </ul>
                  
                  <p>Участники продемонстрировали глубокие знания в области маркетинга, креативный подход к решению задач и отличные навыки командной работы.</p>
                  
                  <p>Победители викторины были награждены ценными призами и сертификатами, а все участники получили памятные сувениры от ассоциации.</p>`
      }
    }

 
    const isScrolled = ref(false)
    const currentNewsId = ref('news1')
    const currentNews = ref(newsData['news1'])
    const mobileMenuOpen = ref(false)

    const newsIds = computed(() => Object.keys(newsData))
    const currentIndex = computed(() => newsIds.value.indexOf(currentNewsId.value))
    const hasPrev = computed(() => currentIndex.value > 0)
    const hasNext = computed(() => currentIndex.value < newsIds.value.length - 1)
    const prevNewsId = computed(() => hasPrev.value ? newsIds.value[currentIndex.value - 1] : '')
    const nextNewsId = computed(() => hasNext.value ? newsIds.value[currentIndex.value + 1] : '')

    
    const loadNewsData = (id) => {
      if (newsData[id]) {
        currentNewsId.value = id
        currentNews.value = newsData[id]
        updateURL(id)
      }
    }

    const updateURL = (id) => {
      const url = new URL(window.location)
      url.searchParams.set('id', id)
      window.history.replaceState({}, '', url)
    }

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }

    const shapeStyle = (index) => {
      const styles = [
        { width: '150px', height: '150px', top: '10%', left: '5%', animationDelay: '0s' },
        { width: '200px', height: '200px', top: '60%', left: '80%', animationDelay: '3s' },
        { width: '100px', height: '100px', top: '80%', left: '10%', animationDelay: '6s' },
        { width: '180px', height: '180px', top: '20%', left: '70%', animationDelay: '9s' }
      ]
      const style = styles[index - 1]
      return {
        width: style.width,
        height: style.height,
        top: style.top,
        left: style.left,
        'animation-delay': style.animationDelay
      }
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
      if (mobileMenuOpen.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }


    onMounted(() => {
      
      const urlParams = new URLSearchParams(window.location.search)
      const idFromURL = urlParams.get('id')
      if (idFromURL && newsData[idFromURL]) {
        loadNewsData(idFromURL)
      }

      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isScrolled,
      currentNews,
      hasPrev,
      hasNext,
      prevNewsId,
      nextNewsId,
      shapeStyle,
      toggleMobileMenu
    }
  }
}
</script>

<style scoped>

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

.floating-shape {
  position: fixed;
  border-radius: 50%;
  background: rgba(44, 90, 160, 0.05);
  animation: float 15s infinite ease-in-out;
  z-index: -1;
}

/* News Detail Styles */
.news-detail-hero {
  background: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
  color: white;
  padding: 150px 0 80px;
  margin-top: 76px;
}

.back-link {
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.back-link:hover {
  opacity: 1;
  color: white;
}

.news-detail-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.3;
}

.news-category {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
}

.news-detail-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: -40px 0 80px;
  position: relative;
  z-index: 2;
}

.news-detail-image {
  height: 400px;
  object-fit: cover;
}

.news-source {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #2c5aa0;
}

.source-title {
  font-weight: 600;
  color: #2c5aa0;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.source-link {
  color: #718096;
  text-decoration: none;
  font-size: 0.85rem;
  word-break: break-all;
}

.source-link:hover {
  color: #2c5aa0;
  text-decoration: underline;
}

.nav-btn {
  background: #2c5aa0;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.nav-btn:hover {
  background: #3a6bc8;
  color: white;
  transform: translateY(-2px);
}

footer {
  background: #2d3748;
  color: white;
}

@media (max-width: 768px) {
  .news-detail-hero {
    padding: 120px 0 60px;
    margin-top: 66px;
  }
  
  .news-detail-title {
    font-size: 2rem;
  }
  
  .news-detail-image {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .news-detail-title {
    font-size: 1.6rem;
  }
  
  .news-detail-image {
    height: 200px;
  }
}
</style>