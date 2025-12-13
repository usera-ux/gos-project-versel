<template>
  <div class="activities-page">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>

    <!-- Hero Section -->
    <section class="activities-hero">
      <div class="container">
        <h1>Виды деятельности ассоциации</h1>
        <p>Комплексный подход к развитию маркетинга в Казахстане через реализацию ключевых направлений деятельности</p>
      </div>
    </section>

    <!-- Activities Section -->
    <section class="activities-section">
      <div class="container">
        <div class="section-title">
          <h2>Основные направления</h2>
          <p>Для реализации целей и задач, Ассоциация осуществляет следующие виды деятельности</p>
        </div>
        
        <div class="activities-grid">
          <!-- Activity Cards -->
          <div 
            v-for="(activity, index) in activities" 
            :key="index" 
            class="activity-card animate-on-scroll"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @mouseenter="hoverCard(index)"
            @mouseleave="leaveCard(index)"
          >
            <div class="activity-number">{{ (index + 1).toString().padStart(2, '0') }}</div>
            <div class="activity-icon">
              <i :class="activity.icon"></i>
            </div>
            <h3>{{ activity.title }}</h3>
            <p>{{ activity.description }}</p>
          </div>
        </div>
      </div>
    </section>

   

  </div>
</template>

<script>
export default {
  name: 'ActivitiesPage',
  data() {
    return {
      activities: [
        {
          title: 'Совместные проекты',
          description: 'Осуществление совместных коммерческих и некоммерческих проектов, в том числе на основе грантов для развития маркетинговой экосистемы Казахстана.',
          icon: 'fas fa-handshake'
        },
        {
          title: 'Образовательные программы',
          description: 'Проведение конференций и семинаров, разработка и осуществление программ обучения персонала для повышения квалификации маркетологов.',
          icon: 'fas fa-chalkboard-teacher'
        },
        {
          title: 'Профессиональные стандарты',
          description: 'Разработка профессиональных кодексов и стандартов для обеспечения высокого качества маркетинговых услуг в Казахстане.',
          icon: 'fas fa-scale-balanced'
        },
        {
          title: 'Медиа и публикации',
          description: 'Выпуск совместных периодических изданий, совместная подготовка выступлений в СМИ для популяризации маркетинга как профессии.',
          icon: 'fas fa-newspaper'
        },
        {
          title: 'Патриотическое воспитание',
          description: 'Участие в организации мероприятий, связанных с патриотическим воспитанием молодежи и формированием национальной идентичности.',
          icon: 'fas fa-flag'
        },
        {
          title: 'Продвижение брендов',
          description: 'Создание условий для продвижения казахстанских брендов и содействие расширению экспорта продукции казахстанских предприятий.',
          icon: 'fas fa-globe'
        },
        {
          title: 'Инновационная деятельность',
          description: 'Другие виды деятельности, не противоречащие действующему законодательству РК, направленные на развитие маркетинговой отрасли.',
          icon: 'fas fa-lightbulb'
        }
      ],
      isHeaderScrolled: false
    }
  },
  mounted() {
    // Scroll handler для header
    window.addEventListener('scroll', this.handleScroll)
    
    // Intersection Observer для анимаций
    this.setupAnimations()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isHeaderScrolled = window.scrollY > 50
    },
    
    hoverCard(index) {
      const cards = document.querySelectorAll('.activity-card')
      if (cards[index]) {
        cards[index].style.transform = 'translateY(-10px)'
        cards[index].style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.12)'
        cards[index].style.borderColor = 'var(--primary-light)'
      }
    },
    
    leaveCard(index) {
      const cards = document.querySelectorAll('.activity-card')
      if (cards[index]) {
        cards[index].style.transform = 'translateY(0)'
        cards[index].style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)'
        cards[index].style.borderColor = 'rgba(44, 90, 160, 0.1)'
      }
    },
    
    setupAnimations() {
      const animateElements = document.querySelectorAll('.animate-on-scroll')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated')
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })

      animateElements.forEach(element => {
        observer.observe(element)
      })
    }
  }
}
</script>

<style scoped>
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

.activities-page {
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

/* Hero Section */
.activities-hero {
  background: var(--gradient);
  color: white;
  padding: 180px 0 100px;
  text-align: center;
  margin-top: 70px;
}

.activities-hero h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
}

.activities-hero p {
  font-size: 1.3rem;
  max-width: 800px;
  margin: 0 auto 40px;
  opacity: 0.9;
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 20px;
}

/* Activities Section */
.activities-section {
  padding: 100px 0;
  background: #f8fafc;
}

.section-title {
  text-align: center;
  margin-bottom: 70px;
}

.section-title h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 15px;
}

.section-title p {
  font-size: 1.2rem;
  color: var(--gray);
  max-width: 700px;
  margin: 0 auto;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 70px;
}

.activity-card {
  background: white;
  border-radius: 16px;
  padding: 40px 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(44, 90, 160, 0.1);
}

.activity-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-light);
}

.activity-icon {
  width: 70px;
  height: 70px;
  background: var(--gradient);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  color: white;
  font-size: 1.8rem;
}

.activity-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--dark);
}

.activity-card p {
  color: var(--gray);
  line-height: 1.7;
}

.activity-number {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 4rem;
  font-weight: 800;
  color: rgba(44, 90, 160, 0.05);
  line-height: 1;
}

/* CTA Section */
.cta-section {
  padding: 100px 0;
  background: white;
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--primary);
}

.cta-content p {
  font-size: 1.2rem;
  color: var(--gray);
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-primary {
  background: var(--gradient);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(44, 90, 160, 0.3);
}

.btn-outline {
  border: 2px solid var(--primary);
  color: var(--primary);
}

.btn-outline:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-3px);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

/* Footer */
footer {
  background: var(--dark);
  color: white;
  padding: 60px 0 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-column h3 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: white;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
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

.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.animate-on-scroll.animated {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .activities-hero h1 {
    font-size: 2.8rem;
  }
}

@media (max-width: 768px) {
  .activities-hero {
    padding: 150px 0 80px;
    margin-top: 60px;
  }
  
  .activities-hero h1 {
    font-size: 2.2rem;
  }
  
  .activities-hero p {
    font-size: 1.1rem;
  }
  
  .section-title h2 {
    font-size: 2rem;
  }
  
  .activities-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .activity-card {
    padding: 30px 25px;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .activities-hero h1 {
    font-size: 1.8rem;
  }
  
  .section-title h2 {
    font-size: 1.6rem;
  }
  
  .activity-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
}
</style>