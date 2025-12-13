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
        Шаблоны PowerPoint
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
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Powerpoint',
  setup() {
    const templatesData = {
      "templates": [
        {
          "id": 1,
          "title": "Business Services Conference",
          "description": "Профессиональный шаблон для бизнес-конференций и презентаций услуг",
          "type": "business",
          "slides": 25,
          "color": "Светло-серый",
          "category": "Бизнес",
          "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_services_conference_0.pptx",
          "downloadUrl": "http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_services_conference_0.pptx"
        },
        {
          "id": 2,
          "title": "Business Models Report",
          "description": "Элегантный шаблон для отчетов о бизнес-моделях и аналитики",
          "type": "report",
          "slides": 30,
          "color": "Золотой",
          "category": "Отчет",
          "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_models_report.pptx",
          "downloadUrl": "http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_models_report.pptx"
        },
        {
          "id": 3,
          "title": "Business 4",
          "description": "Современный дизайн для корпоративных презентаций",
          "type": "business",
          "slides": 20,
          "color": "Охра",
          "category": "Корпоративный",
          "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_2.pptx",
          "downloadUrl": "http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_2.pptx"
        },
        {
          "id": 4,
          "title": "Business 3",
          "description": "Чистый и минималистичный дизайн для деловых встреч",
          "type": "business",
          "slides": 18,
          "color": "Светло-синий",
          "category": "Минимализм",
          "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_1_0(1).pptx",
          "downloadUrl": "http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_1_0(1).pptx"
        },
        {
          "id": 5,
          "title": "Business 2",
          "description": "Теплый и привлекательный дизайн для клиентских презентаций",
          "type": "business",
          "slides": 22,
          "color": "Бело-коричневый",
          "category": "Клиентский",
          "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_1.pptx",
          "downloadUrl": "http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_1.pptx"
        },
        {
          "id": 6,
          "title": "Business 1",
          "description": "Свежий и экологичный дизайн для стартапов и инноваций",
          "type": "business",
          "slides": 24,
          "color": "Бело-зеленый",
          "category": "Стартап",
          "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_0.pptx",
          "downloadUrl": "http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business_0.pptx"
        },
        {
          "id": 7,
          "title": "Business",
          "description": "Классический бизнес-шаблон с современными элементами",
          "type": "business",
          "slides": 28,
          "color": "Голубой",
          "category": "Классика",
          "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business.pptx",
          "downloadUrl": "http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/business.pptx"
        },
        {
          "id": 8,
          "title": "Brochure 1",
          "description": "Креативный дизайн для брошюр и арт-презентаций",
          "type": "art",
          "slides": 16,
          "color": "Серый",
          "category": "Креатив",
          "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/brochure_4.pptx",
          "downloadUrl": "http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/brochure_4.pptx"
        },
        {
          "id": 9,
          "title": "Brochure",
          "description": "Яркий и привлекательный шаблон для маркетинговых материалов",
          "type": "art",
          "slides": 20,
          "color": "Зеленый",
          "category": "Маркетинг",
          "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/brochure_3.pptx",
          "downloadUrl": "http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/brochure_3.pptx"
        },
        {
          "id": 10,
          "title": "Blue Reflection",
          "description": "Профессиональный шаблон с глубоким синим дизайном",
          "type": "conference",
          "slides": 26,
          "color": "Синий",
          "category": "Профессиональный",
          "imageUrl": "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          "viewUrl": "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/blue_reflection.pptx",
          "downloadUrl": "http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413444354171796/ru/blue_reflection.pptx"
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

      const titleElement = document.querySelector('.page-title')
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

    return {
      templates,
      loading,
      error,
      titleVisible,
      handleImageError,
      handleViewClick,
      handleDownloadClick,
      handleMouseEnter,
      handleMouseMove,
      handleMouseLeave
    }
  }
}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: "Inter", sans-serif;
        background: radial-gradient(circle at top, #ffffff, #e7ebf1, #dbe0e8);
        color: #222;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    main {
        flex: 1;
        padding: 120px 20px 80px;
    }

    h1 {
        text-align: center;
        font-size: 48px;
        font-weight: 800;
        margin-bottom: 60px;
        color: #3d8bfd;
        opacity: 0;
        transform: translateY(20px);
        transition: .8s ease;
    }

    .show {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Индикатор загрузки */
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

    /* Сетка карточек */
    .template-grid {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        gap: 30px;
        padding: 20px;
    }

    /* Карточки */
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

    /* Кнопки */
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

    /* Футер */
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

    footer p {
        color: #333;
        font-size: 16px;
        margin: 0;
    }

    /* Адаптивность */
    @media (max-width: 768px) {
        .nav-main {
            display: none;
        }

        .mobile-menu-btn {
            display: block;
        }

        h1 {
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
        h1 {
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