<template>
  <div class="outdoor-advertising-page">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
    </div>


    <AppHeader :scrolled="isScrolled" @toggle-mobile="toggleMobileMenu" />

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1>Альтернативы наружной рекламе в современных условиях</h1>
          <p>Эффективные решения для маркетологов в условиях ограничений на наружную рекламу</p>
          <a href="#solutions" class="cta-button">Узнать о решениях</a>
        </div>
      </div>
    </section>

    <!-- Problem Section -->
    <section class="problem-section">
      <div class="container">
        <div class="section-title">
          <h2>Проблема современного маркетинга</h2>
          <p>Наружная реклама становится менее доступной, но потребность в эффективных каналах коммуникации только растет</p>
        </div>
        
        <div class="problem-content">
          <div class="problem-text">
            <h3>Сокращение возможностей для наружной рекламы</h3>
            <p>На улицах больших городов становится всё меньше наружной рекламы. С одной стороны – это хорошо. Центры городов приобретают аутентичный вид, очищаются от излишнего рекламного шума.</p>
            <p>Но что в таком случае делать рекламодателям? Есть ли альтернативы одному из самых эффективных и, безусловно, самых древних видов рекламы?</p>
            <p>Количество площадей для размещения наружной рекламы сокращается, а цена соответственно растёт. Задачей маркетологов является оптимизация расходов клиента, обеспечение качества и эффективности контакта с целевой аудиторией.</p>
          </div>
          <div class="problem-image">
            <img src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Городская среда с ограниченной рекламой">
          </div>
        </div>
      </div>
    </section>

    <!-- Solutions Section -->
    <section class="solutions-section" id="solutions">
      <div class="container">
        <div class="section-title">
          <h2>Эффективные альтернативы</h2>
          <p>Современные решения, которые помогут достичь ваших маркетинговых целей</p>
        </div>
        
        <div class="solutions-grid">
          <!-- Solution Cards -->
          <div class="solution-card" v-for="solution in solutions" :key="solution.id">
            <div class="solution-image">
              <img :src="solution.image" :alt="solution.title">
            </div>
            <div class="solution-content">
              <div class="solution-icon">
                <i :class="solution.icon"></i>
              </div>
              <h3>{{ solution.title }}</h3>
              <p>{{ solution.description }}</p>
              <div class="solution-stats">
                <i :class="solution.statsIcon"></i> {{ solution.stats }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Section -->
    <section class="comparison-section">
      <div class="container">
        <div class="section-title">
          <h2>Сравнение эффективности</h2>
          <p>Как разные форматы рекламы показывают себя в современных условиях</p>
        </div>
        
        <div class="comparison-table">
          <div class="table-header">
            <div v-for="header in tableHeaders" :key="header">{{ header }}</div>
          </div>
          
          <div class="table-row" v-for="row in comparisonData" :key="row.format">
            <div>{{ row.format }}</div>
            <div>{{ row.coverage }}</div>
            <div>{{ row.cost }}</div>
            <div><span class="rating">{{ row.effectiveness }}</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2>Готовы найти оптимальное решение для вашего бизнеса?</h2>
        <p>Наши эксперты помогут разработать эффективную рекламную стратегию с использованием современных альтернатив наружной рекламы</p>
        <div class="cta-buttons">
          <router-link to="/contact" class="cta-button">Получить консультацию</router-link>
        </div>
      </div>
    </section>

 
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'


export default {
  name: 'Experts',

  setup() {
    
    const isScrolled = ref(false)
    const mobileMenuOpen = ref(false)

    const solutions = ref([
      {
        id: 1,
        title: 'Реклама на транспорте',
        description: 'Движущаяся реклама получает в пять раз больше внимания, чем статичный формат. Среди преимуществ - охват и возможность сегментировать ЦА по районам города.',
        image: 'http://kamp.kz/files/sites/1369648304051529/files/32324.png',
        icon: 'fas fa-bus',
        stats: 'На 50% больше внимания',
        statsIcon: 'fas fa-chart-line'
      },
      {
        id: 2,
        title: 'INDOOR-реклама',
        description: 'Indoor-реклама является одним из динамично растущих сегментов рекламного рынка. Ежегодно по оценкам экспертов АКАР рынок растет в среднем на 30%.',
        image: 'http://kamp.kz/files/sites/1369648304051529/files/32323.png',
        icon: 'fas fa-shopping-cart',
        stats: '63% покупателей совершают целевые действия',
        statsIcon: 'fas fa-users'
      },
      {
        id: 3,
        title: 'Мобильный маркетинг',
        description: 'С помощью SMS-рассылок вы можете донести ваше предложение напрямую клиенту в любой момент. Эффективный канал для информирования и рекламы.',
        image: 'http://kamp.kz/files/sites/1369648304051529/files/32325.png',
        icon: 'fas fa-mobile-alt',
        stats: 'Прямой контакт с клиентом',
        statsIcon: 'fas fa-bullseye'
      }
    ])

    const tableHeaders = ['Формат рекламы', 'Охват', 'Стоимость', 'Эффективность']

    const comparisonData = ref([
      { format: 'Традиционная наружная реклама', coverage: 'Высокий', cost: 'Высокая', effectiveness: '7/10' },
      { format: 'Реклама на транспорте', coverage: 'Высокий', cost: 'Средняя', effectiveness: '8/10' },
      { format: 'INDOOR-реклама', coverage: 'Средний', cost: 'Средняя', effectiveness: '9/10' },
      { format: 'Мобильный маркетинг', coverage: 'Точечный', cost: 'Низкая', effectiveness: '8/10' },
      { format: 'Цифровые экраны', coverage: 'Средний', cost: 'Высокая', effectiveness: '7/10' }
    ])


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

   
    const initSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault()
          const targetId = this.getAttribute('href')
          if (targetId === '#') return
          
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: 'smooth'
            })
          }
        })
      })
    }


    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      initSmoothScroll()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isScrolled,
      mobileMenuOpen,
      solutions,
      tableHeaders,
      comparisonData,
      toggleMobileMenu
    }
  }
}
</script>

<style scoped>
.outdoor-advertising-page {
  position: relative;
}

/* Animated Background */
.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  animation: float 15s infinite ease-in-out;
}

.shape-1 { 
  width: 200px; 
  height: 200px; 
  top: 15%; 
  left: 10%; 
  background: radial-gradient(circle, rgba(44, 90, 160, 0.1) 0%, rgba(44, 90, 160, 0.02) 70%);
  animation-delay: 0s;
}

.shape-2 { 
  width: 150px; 
  height: 150px; 
  top: 65%; 
  right: 15%; 
  background: radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, rgba(255, 107, 53, 0.01) 70%);
  animation-delay: -3s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -30px) rotate(5deg); }
  50% { transform: translate(-15px, 20px) rotate(-3deg); }
  75% { transform: translate(25px, 15px) rotate(2deg); }
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, rgba(44, 90, 160, 0.85) 0%, rgba(58, 107, 200, 0.85) 100%), url('https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 180px 0 100px;
  text-align: center;
  position: relative;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
}

.hero-section h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-section p {
  font-size: 1.3rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  background: #ff6b35;
  color: white;
  padding: 15px 35px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid #ff6b35;
  font-size: 1.1rem;
}

.cta-button:hover {
  background: transparent;
  color: #ff6b35;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Problem Section */
.problem-section {
  padding: 100px 0;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  margin-bottom: 60px;
}

.section-title h2 {
  font-size: 2.5rem;
  color: #2c5aa0;
  margin-bottom: 15px;
}

.section-title p {
  font-size: 1.2rem;
  color: #718096;
  max-width: 700px;
  margin: 0 auto;
}

.problem-content {
  display: flex;
  align-items: center;
  gap: 50px;
}

.problem-text {
  flex: 1;
}

.problem-text h3 {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 20px;
}

.problem-text p {
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.problem-image {
  flex: 1;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.problem-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Solutions Section */
.solutions-section {
  padding: 100px 0;
  background: white;
}

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.solution-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.solution-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.solution-image {
  height: 200px;
  overflow: hidden;
}

.solution-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.solution-card:hover .solution-image img {
  transform: scale(1.1);
}

.solution-content {
  padding: 25px;
}

.solution-icon {
  font-size: 2.5rem;
  color: #2c5aa0;
  margin-bottom: 15px;
}

.solution-content h3 {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 15px;
}

.solution-content p {
  margin-bottom: 20px;
  color: #718096;
}

.solution-stats {
  background: #3a6bc8;
  color: white;
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
  font-weight: 600;
}

/* Comparison Section */
.comparison-section {
  padding: 100px 0;
  background: #f8f9fa;
}

.comparison-table {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-top: 50px;
}

.table-header {
  background: #2c5aa0;
  color: white;
  padding: 20px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  font-weight: 600;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  align-items: center;
}

.table-row:nth-child(even) {
  background: rgba(44, 90, 160, 0.03);
}

.table-row:last-child {
  border-bottom: none;
}

.rating {
  color: #ff6b35;
  font-weight: 600;
}

/* CTA Section */
.cta-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
  color: white;
  text-align: center;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Footer */
footer {
  background: #2d3748;
  color: white;
  padding: 50px 0;
  text-align: center;
}

/* Responsive */
@media (max-width: 992px) {
  .problem-content {
    flex-direction: column;
  }
  
  .table-header, .table-row {
    grid-template-columns: 1fr 1fr;
  }
  
  .table-header div:nth-child(3),
  .table-row div:nth-child(3),
  .table-header div:nth-child(4),
  .table-row div:nth-child(4) {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 150px 0 80px;
  }

  .hero-section h1 {
    font-size: 2.5rem;
  }

  .section-title h2 {
    font-size: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>