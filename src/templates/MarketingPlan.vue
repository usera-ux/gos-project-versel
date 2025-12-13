<template>
  <div class="templates-page">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>

    <main class="main-content">
      <h1 
        id="title"
        class="page-title"
        :class="{ 'show': titleVisible }"
      >
        Шаблоны маркетинговых планов
      </h1>

      <!-- Loading Indicator -->
      <div 
        v-if="loading" 
        class="loading"
      >
        <div class="spinner"></div>
        <p>Загрузка шаблонов...</p>
      </div>

      <!-- Error Message -->
      <div 
        v-else-if="error" 
        class="loading"
        style="display: block;"
      >
        <p>Ошибка загрузки шаблонов. Пожалуйста, попробуйте позже.</p>
      </div>

      <!-- Templates Grid -->
      <div 
        v-else 
        class="template-grid"
        style="display: grid;"
      >
        <div 
          v-for="template in templates" 
          :key="template.id"
          class="card"
          :class="{ 'show': template.isVisible }"
          @mouseenter="handleMouseEnter(template)"
          @mousemove="handleMouseMove(template, $event)"
          @mouseleave="handleMouseLeave(template)"
          :data-id="template.id"
        >
          <div class="card-header">
            <div class="template-image">
              <img 
                :src="template.imageUrl" 
                :alt="template.title"
                @error="handleImageError"
              />
            </div>
            <div class="text-content">
              <div class="template-title">{{ template.title }}</div>
              <div class="template-meta">{{ template.description }}</div>
              <div class="template-features">
                <span class="feature-tag">{{ template.slides }} слайдов</span>
                <span v-if="template.color" class="feature-tag">{{ template.color }}</span>
                <span v-if="template.category" class="feature-tag">{{ template.category }}</span>
              </div>
            </div>
          </div>
          <div class="buttons">
            <a 
              class="btn view-btn" 
              :href="template.viewUrl" 
              target="_blank" 
              :data-id="template.id"
              @click="handleViewClick(template.id)"
            >
              Просмотр
            </a>
            <a 
              class="btn download" 
              :href="template.downloadUrl" 
              download 
              :data-id="template.id"
              @click="handleDownloadClick(template.id)"
            >
              Скачать
            </a>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <div class="container2">
        <p>Казахстанская ассоциация профессиональных маркетологов</p>
        <p style="margin-top: 10px; opacity: 0.8;">Астана 2023</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const templatesData = {
  "templates": [
    {
      "id": 1,
      "title": "Plan for conducting BTL events",
      "description": "План по проведению BTL мероприятий",
      "type": "business",
      "slides": 3,
      "color": "Синий",
      "category": "BTL",
      "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
      "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775752690/ru/17035321468vk5n7.docx",
      "downloadUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775752690/ru/17035321468vk5n7.docx"
    },
    {
      "id": 2,
      "title": "Marketing Activity Plan Template",
      "description": "Шаблон плана маркетинговых мероприятий",
      "type": "report",
      "slides": 5,
      "color": "Зеленый",
      "category": "Активности",
      "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
      "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775752690/ru/shablon_plana_marketingovyh_meropriyatiy.doc",
      "downloadUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775752690/ru/shablon_plana_marketingovyh_meropriyatiy.doc"
    },
    {
      "id": 3,
      "title": "Marketing plan for a consulting company",
      "description": "Маркетинговый план консалтинговой компании",
      "type": "report",
      "slides": 10,
      "color": "Красный",
      "category": "Консалтинг",
      "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
      "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775752690/ru/marketingovyy_plan_konsaltingovoy_kompanii.xls",
      "downloadUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775752690/ru/marketingovyy_plan_konsaltingovoy_kompanii.xls"
    }
  ]
}

const templates = ref([])
const loading = ref(true)
const error = ref(false)
const titleVisible = ref(false)
let observer = null

// Обработчик ошибки изображения
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/80x60/667eea/ffffff?text=Template'
}

// Обработчики кликов на кнопки
const handleViewClick = (templateId) => {
  console.log('Просмотр шаблона ID:', templateId)
}

const handleDownloadClick = (templateId) => {
  console.log('Скачивание шаблона ID:', templateId)
}

// Обработчики мыши для 3D эффекта
const handleMouseEnter = (template) => {
  template.isHovered = true
}

const handleMouseMove = (template, event) => {
  if (!template.isHovered) return
  
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // Установка позиции для градиента
  card.style.setProperty('--mx', `${x}px`)
  card.style.setProperty('--my', `${y}px`)
  
  // 3D вращение
  const rotateY = ((x - rect.width / 2) / 20)
  const rotateX = -((y - rect.height / 2) / 20)
  
  card.style.transform = `
    perspective(900px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-5px)
  `
}

const handleMouseLeave = (template) => {
  template.isHovered = false
  
  const card = document.querySelector(`.card[data-id="${template.id}"]`)
  if (card) {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
  }
}

// Инициализация Intersection Observer
const initObservers = () => {
  // Observer для заголовка
  const titleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          titleVisible.value = true
        }
      })
    },
    { threshold: 0.15 }
  )

  const titleElement = document.querySelector('#title')
  if (titleElement) {
    titleObserver.observe(titleElement)
  }

  // Observer для карточек
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardId = entry.target.dataset.id
          const template = templates.value.find(t => t.id.toString() === cardId)
          if (template) {
            template.isVisible = true
          }
        }
      })
    },
    { threshold: 0.15 }
  )

  // Начать наблюдение за карточками после рендера
  setTimeout(() => {
    document.querySelectorAll('.card').forEach(card => {
      observer.observe(card)
    })
  }, 100)
}

// Загрузка и отображение шаблонов
const displayTemplates = () => {
  try {
    // Используем локальные данные
    if (templatesData.templates && templatesData.templates.length > 0) {
      templates.value = templatesData.templates.map(t => ({
        ...t,
        isVisible: false,
        isHovered: false
      }))
      loading.value = false
      
      // Инициализировать observers после рендера
      setTimeout(() => {
        initObservers()
      }, 50)
    } else {
      throw new Error('No templates found')
    }
  } catch (err) {
    console.error('Error displaying templates:', err)
    error.value = true
    loading.value = false
  }
}

onMounted(() => {
  // Имитация загрузки
  setTimeout(() => {
    displayTemplates()
  }, 500)
})
</script>

<style scoped>
/* Стили такие же как в других компонентах шаблонов */
.templates-page {
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  background: radial-gradient(circle at top, #ffffff, #e7ebf1, #dbe0e8);
  color: #222;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 120px 20px 80px;
}

.page-title {
  text-align: center;
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #3d8bfd, #6ea8fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(20px);
  transition: .8s ease;
}

.show {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 40px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3d8bfd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.template-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 30px;
  padding: 20px;
}

.card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(255,255,255,0.4);
  position: relative;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform-style: preserve-3d;
  transform: perspective(900px) rotateX(0deg) rotateY(0deg) translateY(30px);
  opacity: 0;
  transition: transform 0.35s ease, box-shadow .35s ease, opacity .8s ease;
}

.card.show {
  opacity: 1;
  transform: perspective(900px) translateY(0);
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 20px;
  pointer-events: none;
  background: radial-gradient(circle at var(--mx) var(--my),
    rgba(0,153,255,0.25),
    transparent 60%
  );
  opacity: 0;
  transition: opacity .3s ease;
}

.card:hover::before {
  opacity: 1;
}

.card:hover {
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  transform: perspective(900px) translateY(-5px);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
}

.template-image {
  width: 80px;
  height: 60px;
  border-radius: 12px;
  border: 2px solid rgba(255,255,255,0.8);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.template-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.text-content {
  flex: 1;
}

.template-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.3;
}

.template-meta {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
}

.template-features {
  font-size: 12px;
  color: #888;
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  background: rgba(61, 139, 253, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  color: #3d8bfd;
}

.buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  transform: translateZ(40px);
}

.btn {
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  color: white;
  text-decoration: none;
  background: linear-gradient(135deg, #3d8bfd, #6ea8fe);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(61,139,253,.3);
  border: none;
  cursor: pointer;
  flex: 1;
  text-align: center;
  font-weight: 500;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(61,139,253,.5);
}

.download {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  box-shadow: 0 4px 15px rgba(39,174,96,.3);
}

.download:hover {
  box-shadow: 0 6px 20px rgba(39,174,96,.5);
}

footer {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding: 30px 0;
  margin-top: auto;
}

.container2 {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

/* Адаптивность */
@media (max-width: 768px) {
  .main-content {
    padding: 100px 20px 60px;
  }
  
  .page-title {
    font-size: 36px;
    margin-bottom: 40px;
  }
  
  .template-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 10px;
  }
  
  .card {
    min-height: 250px;
    padding: 20px;
  }
  
  .card-header {
    gap: 15px;
  }
  
  .template-image {
    width: 70px;
    height: 50px;
  }
  
  .buttons {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 28px;
  }
  
  .card-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .template-image {
    align-self: flex-start;
  }
}
</style>