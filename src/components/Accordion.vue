<template>
  <section class="accordion-section py-5">
    <div class="container">
      <h2 class="section-title text-center mb-5">Дополнительная информация</h2>
      <div class="accordion-container">
        <div 
          v-for="item in accordionItems" 
          :key="item.id"
          class="accordion-item mb-3"
          :class="{ 'active': activeItem === item.id }"
        >
          <div class="accordion-header d-flex justify-content-between align-items-center p-4 bg-white rounded shadow-sm"
               @click="toggleAccordion(item.id)">
            <div class="accordion-title d-flex align-items-center">
              <span class="accordion-icon me-3">
                <img :src="item.icon" width="40" alt="" class="img-fluid">
              </span>
              <span class="fw-bold">{{ item.title }}</span>
            </div>
            <span class="accordion-arrow">
              <i class="bi" :class="activeItem === item.id ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
            </span>
          </div>
          <div v-if="activeItem === item.id" class="accordion-content p-4 bg-white rounded-bottom shadow-sm">
            <div class="accordion-links">
              <router-link 
                v-for="link in item.links" 
                :key="link.text"
                :to="link.to" 
                class="accordion-link d-flex align-items-center p-3 mb-2 rounded text-decoration-none hover-bg-primary"
              >
                <span class="link-text fw-medium">{{ link.text }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Accordion',
  setup() {
    const activeItem = ref(null)
    
    const accordionItems = [
      {
        id: 1,
        title: 'Полезные ресурсы',
        icon: 'https://cdn-icons-png.flaticon.com/128/16490/16490963.png',
        links: [
          { text: 'Мнение экспертов', to: '/experts' },
          { text: 'Профессиональная литература', to: '/library' },
          { text: 'Маркетинговые планы', to: '/plans' }
        ]
      },
      {
        id: 2,
        title: 'Об ассоциации',
        icon: 'https://cdn-icons-png.flaticon.com/128/10191/10191452.png',
        links: [
          { text: 'Деятельность ассоциации', to: '/activities' },
          { text: 'Устав ассоциации', to: '/charter' }
        ]
      },
      {
        id: 3,
        title: 'Участие и контакты',
        icon: 'https://cdn-icons-png.flaticon.com/128/16930/16930710.png',
        links: [
          { text: 'Вступление для физических лиц', to: '/join-individual' },
          { text: 'Вступление для юридических лиц', to: '/join-company' },
          { text: 'Часто задаваемые вопросы', to: '/faq' },
          { text: 'Обратная связь', to: '/feedback' },
          { text: 'Фотогалерея', to: '/gallery' },
        ]
      }
    ]
    
    const toggleAccordion = (id) => {
      activeItem.value = activeItem.value === id ? null : id
    }
    
    return {
      activeItem,
      accordionItems,
      toggleAccordion
    }
  }
}
</script>

<style scoped>
.accordion-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.accordion-header {
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%) !important;
  color: white;
}

.accordion-header:hover {
  background: linear-gradient(135deg, #3a6bc8 0%, #4a7bd8 100%) !important;
}

.accordion-arrow {
  transition: transform 0.3s ease;
  color: white;
}

.accordion-item.active .accordion-arrow {
  transform: rotate(180deg);
}

.accordion-content {
  animation: slideDown 0.3s ease;
}

.accordion-link {
  color: #333;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.hover-bg-primary:hover {
  background: #2c5aa0 !important;
  color: white !important;
  transform: translateX(5px);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Добавляем ваши переменные */
:root {
  --primary: #2c5aa0;
  --primary-light: #3a6bc8;
}

.accordion-link:hover {
  background: var(--primary) !important;
  color: white !important;
}
</style>