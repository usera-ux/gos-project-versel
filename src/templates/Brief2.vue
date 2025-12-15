<template>
  <div class="templates-page">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <h1 
          class="page-title"
          :class="{ 'show': titleVisible }"
        >
          Шаблоны брифов
        </h1>

        <!-- Loading Indicator -->
        <div 
          v-if="loading" 
          class="loading text-center py-5"
        >
          <div class="spinner mb-3"></div>
          <p class="text-muted">Загрузка шаблонов...</p>
        </div>

        <!-- Error Message -->
        <div 
          v-else-if="error" 
          class="error-message text-center py-5"
        >
          <p class="text-danger">Ошибка загрузки шаблонов. Пожалуйста, попробуйте позже.</p>
        </div>

        <!-- Templates Grid -->
        <div 
          v-else 
          class="template-grid"
        >
          <div class="row g-4">
            <div 
              v-for="template in templates" 
              :key="template.id"
              class="col-lg-4 col-md-6"
            >
              <div 
                class="template-card card border-0 shadow-sm"
                :class="{ 'show': template.isVisible }"
                @mouseenter="handleMouseEnter(template)"
                @mousemove="handleMouseMove(template, $event)"
                @mouseleave="handleMouseLeave(template)"
                :data-id="template.id"
              >
                <div class="card-body d-flex flex-column h-100 p-4">
                  <!-- Header with Image -->
                  <div class="card-header d-flex align-items-start gap-3 mb-3 border-0 bg-transparent p-0">
                    <div class="template-image rounded-3 overflow-hidden flex-shrink-0">
                      <img 
                        :src="template.imageUrl" 
                        :alt="template.title"
                        class="img-fluid w-100 h-100 object-fit-cover"
                        @error="handleImageError"
                      />
                    </div>
                    
                    <!-- Text Content -->
                    <div class="text-content flex-grow-1">
                      <h5 class="template-title fw-bold mb-2">{{ template.title }}</h5>
                      <p class="template-meta text-muted small mb-2">{{ template.description }}</p>
                      
                      <!-- Features -->
                      <div class="template-features d-flex flex-wrap gap-2">
                        <span class="feature-tag badge bg-primary bg-opacity-10 text-primary">
                          {{ template.slides }} слайдов
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Buttons -->
                  <div class="buttons mt-auto pt-3">
                    <div class="row g-2">
                      <div class="col">
                        <a 
                          :href="template.viewUrl" 
                          target="_blank"
                          class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                        >
                      
                          Просмотр
                        </a>
                      </div>
                      <div class="col">
                        <a 
                          :href="template.downloadUrl" 
                          download
                          class="btn btn1 w-100 d-flex align-items-center justify-content-center gap-2"
                        >
                         
                          Скачать
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Brief',
  setup() {
    const templatesData = {
      templates: [
        {
          id: 1,
          title: "Creative Services Brief Template",
          description: "Шаблон брифа для заказа креативных услуг",
          type: "business",
          slides: 3,
          imageUrl: "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          viewUrl: "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775755491/ru/brif_dlya_zakaza_kreativnyh_uslug.doc",
          downloadUrl: "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775755491/ru/brif_dlya_zakaza_kreativnyh_uslug.doc",
          isVisible: false,
          isHovered: false,
          rotation: { x: 0, y: 0 }
        },
           {
          id: 2,
          title: "Business Models Report",
          description: "Элегантный шаблон для отчетов о бизнес-моделях и аналитики",
          type: "business",
          slides: 3,
          imageUrl: "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          viewUrl: "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775755491/ru/brif_dlya_zakaza_kreativnyh_uslug.doc",
          downloadUrl: "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775755491/ru/brif_dlya_zakaza_kreativnyh_uslug.doc",
          isVisible: false,
          isHovered: false,
          rotation: { x: 0, y: 0 }
        },
           {
          id: 4,
          title: "Customer Satisfaction Assessment Template",
          description: "Шаблон оценки уровня удовлетворенности клиентов",
          type: "business",
          slides: 3,
          imageUrl: "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          viewUrl: "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775755491/ru/brif_dlya_zakaza_kreativnyh_uslug.doc",
          downloadUrl: "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775755491/ru/brif_dlya_zakaza_kreativnyh_uslug.doc",
          isVisible: false,
          isHovered: false,
          rotation: { x: 0, y: 0 }
        },
           {
          id: 3,
          title: "Pricing survey template",
          description: "Шаблон опроса по ценообразованию",
          type: "business",
          slides: 3,
          imageUrl: "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          viewUrl: "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775755491/ru/brif_dlya_zakaza_kreativnyh_uslug.doc",
          downloadUrl: "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775755491/ru/brif_dlya_zakaza_kreativnyh_uslug.doc",
          isVisible: false,
          isHovered: false,
          rotation: { x: 0, y: 0 }
        },
           {
          id: 5,
          title: "Comparative price analysis of competitors",
          description: "Сравнительный анализ цен по конкурентам",
          type: "business",
          slides: 3,
          imageUrl: "https://i.pinimg.com/736x/a9/2b/d3/a92bd37c66bb6d810e0c0ca7be714e5e.jpg",
          viewUrl: "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775755491/ru/brif_dlya_zakaza_kreativnyh_uslug.doc",
          downloadUrl: "https://view.officeapps.live.com/op/view.aspx?src=http://kamp.kz//files/sites/1369648304051529/files/widgets/book-catalog/1413445775755491/ru/brif_dlya_zakaza_kreativnyh_uslug.doc",
          isVisible: false,
          isHovered: false,
          rotation: { x: 0, y: 0 }
        }
      ]
    }

    const templates = ref([])
    const loading = ref(true)
    const error = ref(false)
    const titleVisible = ref(false)
    let observer = null

    const handleImageError = (event) => {
      event.target.src = 'https://via.placeholder.com/80x60/667eea/ffffff?text=Template'
    }

    const handleMouseEnter = (template) => {
      template.isHovered = true
    }

    const handleMouseMove = (template, event) => {
      if (!template.isHovered) return
      
      const card = event.currentTarget
      const rect = card.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
    
      card.style.setProperty('--mx', `${x}px`)
      card.style.setProperty('--my', `${y}px`)
      

      const rotateY = ((x - rect.width / 2) / 20)
      const rotateX = -((y - rect.height / 2) / 20)
      
      template.rotation = { x: rotateX, y: rotateY }
      updateCardTransform(card, template)
    }

    const handleMouseLeave = (template) => {
      template.isHovered = false
      template.rotation = { x: 0, y: 0 }
      
      
      const cards = document.querySelectorAll('.template-card')
      cards.forEach(card => {
        if (card.dataset.id === template.id.toString()) {
          card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
        }
      })
    }

    const updateCardTransform = (card, template) => {
      card.style.transform = `
        perspective(900px)
        rotateX(${template.rotation.x}deg)
        rotateY(${template.rotation.y}deg)
        translateY(-5px)
      `
    }


    const initObservers = () => {
 
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

      
      setTimeout(() => {
        document.querySelectorAll('.template-card').forEach(card => {
          observer.observe(card)
        })
      }, 100)
    }

   
    const init = () => {
     
      setTimeout(() => {
        try {
          templates.value = templatesData.templates.map(t => ({
            ...t,
            isVisible: false,
            isHovered: false,
            rotation: { x: 0, y: 0 }
          }))
          
          loading.value = false
          
     
          setTimeout(() => {
            initObservers()
          }, 50)
          
        } catch (err) {
          error.value = true
          loading.value = false
          console.error('Ошибка загрузки шаблонов:', err)
        }
      }, 1000)
    }

    onMounted(() => {
      init()
    })

    return {
      templates,
      loading,
      error,
      titleVisible,
      handleImageError,
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
       .btn1 {
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 14px;
        color: white;
        text-decoration: none;
        background: linear-gradient(135deg, #2ecc71, #27ae60);
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