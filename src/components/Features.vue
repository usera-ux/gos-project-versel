<template>
  <section class="features py-5">
    <div class="container">
      <h2 class="section-title text-center mb-5">
        Наши основные направления
      </h2>
      
      <div class="row g-4">
        <div v-for="feature in features" :key="feature.id" class="col-md-4">
          <div class="card h-100 border-0 shadow-lg hover-lift">
            <div class="card-body text-center p-4">
              <div class="card-icon mb-4">
                <div class="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-circle p-3"
                     :style="{ background: feature.color + '20' }">
                  <i :class="feature.icon" class="fs-2" :style="{ color: feature.color }"></i>
                </div>
              </div>
              <h3 class="card-title h4 mb-3">{{ feature.title }}</h3>
              <p class="card-text text-muted">{{ feature.description }}</p>
            
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
  name: 'Features',
  setup() {
    const features = ref([
      {
        id: 1,
        title: 'Профессиональное развитие',
        description: 'Организация семинаров, тренингов и мастер-классов от ведущих экспертов в области маркетинга',
        icon: 'bi bi-graph-up-arrow',
        color: '#667eea',
        link: '/training'
      },
      {
        id: 2,
        title: 'Деловое сообщество',
        description: 'Создание площадки для нетворкинга и обмена опытом между профессионалами индустрии',
        icon: 'bi bi-people',
        color: '#10b981',
        link: '/community'
      },
      {
        id: 3,
        title: 'Стандарты качества',
        description: 'Разработка и продвижение профессиональных стандартов в области маркетинга Казахстана',
        icon: 'bi bi-award',
        color: '#f59e0b',
        link: '/standards'
      }
    ])
    
    const stats = ref([
      {
        id: 1,
        value: '500+',
        unit: '',
        label: 'Членов ассоциации',
        color: '#667eea'
      },
      {
        id: 2,
        value: '100+',
        unit: '',
        label: 'Проведенных мероприятий',
        color: '#10b981'
      },
      {
        id: 3,
        value: '50+',
        unit: '',
        label: 'Партнеров',
        color: '#f59e0b'
      },
      {
        id: 4,
        value: '10',
        unit: 'лет',
        label: 'Опыта работы',
        color: '#8b5cf6'
      }
    ])
    
    return {
      features,
      stats
    }
  }
}
</script>

<style scoped>

</style>