<template>
  <div class="charter-page">

    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>


    <section class="charter-hero">
      <div class="container">
        <h1 class="display-4 fw-bold mb-4">Устав Ассоциации</h1>
        <p class="lead mb-4">Основополагающий документ, определяющий цели, задачи и принципы деятельности Казахстанской ассоциации профессиональных маркетологов</p>
      </div>
    </section>


    <section class="charter-content py-5">
      <div class="container">

        <div class="charter-card card border-0 shadow-lg mb-5 animate-on-scroll" ref="charterCard">
          <div class="card-header py-4 text-white" :style="gradientStyle">
            <h2 class="h2 fw-bold text-center mb-3">УСТАВ<br>АССОЦИАЦИИ ПРОФЕССИОНАЛЬНЫХ МАРКЕТОЛОГОВ</h2>
            <div class="row justify-content-center g-4 mt-4">
              <div class="col-auto">
                <div class="meta-item d-flex align-items-center">
                  <i class="fas fa-calendar-check me-2"></i>
                  Утвержден: 13 августа 2012 года
                </div>
              </div>
              <div class="col-auto">
                <div class="meta-item d-flex align-items-center">
                  <i class="fas fa-file-alt me-2"></i>
                  Протокол № 1
                </div>
              </div>
              <div class="col-auto">
                <div class="meta-item d-flex align-items-center">
                  <i class="fas fa-users me-2"></i>
                  Общее собрание учредителей
                </div>
              </div>
            </div>
          </div>
          <div class="card-body p-4 p-md-5">
            <p class="text-center fs-5 text-muted mb-5">
              Настоящий Устав определяет правовое положение, цели деятельности, структуру управления 
              и порядок работы Ассоциации профессиональных маркетологов.
            </p>
          </div>
            <!-- Download Section -->
        <div class="download-section card border-2 border-dashed shadow  animate-on-scroll" ref="downloadSection">
          <div class="card-body p-4 p-md-5 text-center">
            <h3 class="h3 fw-bold text-primary mb-3">
              <i class="fas fa-download me-2"></i>Полная версия Устава
            </h3>
            <p class="text-muted mb-4">
              Скачайте полную версию Устава Ассоциации профессиональных маркетологов в формате PDF для детального ознакомления
            </p>
            <div class="d-flex flex-wrap justify-content-center gap-3">
              <button class="btn btn-primary btn-lg px-4" @click="downloadCharter">
                <i class="fas fa-file-pdf me-2"></i>
                Скачать Устав (PDF)
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CharterPage',
  data() {
    return {
      gradientStyle: {
        background: 'linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%)'
      },
     
    }
  },
  mounted() {
    this.initAnimations();
    this.setupIntersectionObserver();
  },
  methods: {
    scrollToChapter(chapterId) {
      const element = document.getElementById(chapterId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    },
    
    downloadCharter() {
      
      alert('В реальном приложении здесь будет загрузка PDF файла');
    },
    
    initAnimations() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
      });
    },
    
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
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

.charter-page {
  position: relative;
  background: #f8fafc;
  min-height: 100vh;
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
.charter-hero {
  background: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
  color: white;
  padding: 160px 0 80px;
  margin-top: 0;
  text-align: center;
}

@media (max-width: 768px) {
  .charter-hero {
    padding: 120px 0 60px;
  }
}

/* Charter Card */
.charter-card {
  border-radius: 16px;
  overflow: hidden;
}

/* Chapters Navigation */
.chapters-nav {
  border-radius: 12px;
  background: white;
}

.chapter-link {
  transition: all 0.3s ease;
  border: 1px solid transparent;
  background: #f8f9fa;
}

.chapter-link:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(44, 90, 160, 0.2);
}

.chapter-link:hover .chapter-number {
  background: white;
  color: var(--primary);
}

.chapter-number {
  width: 40px;
  height: 40px;
  min-width: 40px;
  background: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.chapter-title {
  font-weight: 500;
  font-size: 1rem;
}

/* Chapter Content */
.chapter {
  border-radius: 12px;
  border-left: 4px solid var(--primary);
  background: white;
}

.chapter-header {
  border-bottom: 2px solid #f0f0f0;
}

.chapter-number-large {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
}

.chapter-content {
  line-height: 1.8;
}

.article {
  padding-left: 20px;
  border-left: 2px solid #e9ecef;
}

.article-title {
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 10px;
}

.article-content {
  color: var(--gray);
}

.article-content p {
  margin-bottom: 10px;
}

/* Download Section */
.download-section {
  border-radius: 16px;
  background: white;
  border: 2px dashed #e9ecef !important;
}

/* Buttons */
.btn-primary {
  background: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(44, 90, 160, 0.3);
}

/* Meta Items */
.meta-item {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
}

/* Animation Classes */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.animate-on-scroll.animated {
  opacity: 1;
  transform: translateY(0);
}
</style>