<template>
  <div class="president-page">
 
    

    <section class="president-hero">
      <div class="container">
        <h1>Президент Ассоциации</h1>
      </div>
    </section>


    <section class="president-content">
      <div class="president-container">
        <div class="president-profile">
          <div class="president-photo">
            <div class="photo-frame">
              <img 
                :src="presidentData.image" 
                alt="Президент Ассоциации профессиональных маркетологов" 
                class="president-image"
                @error="handleImageError"
              >
            </div>
          </div>
          
          <div class="president-info">
            <h1 class="president-title">Президент Ассоциации профессиональных маркетологов</h1>
            
            <div class="president-bio">
              <p class="bio-text" v-for="(paragraph, index) in presidentData.bio" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>


        <div class="president-message">
          <div class="message-pattern"></div>
          <div class="message-content">
            <h2 class="message-title">Обращение к членам ассоциации</h2>
            <p class="message-text">
              {{ presidentData.message }}
            </p>
          </div>
        </div>

        
        <section class="members-section">
          <div class="members-container">
            <h2 class="section-title">Члены и партнеры</h2>
            
            <div class="members-content">
              <div class="members-info">
                <h3 class="info-title">Членство в Ассоциации</h3>
                <p class="info-text" v-for="(text, index) in membershipData.info" :key="index">
                  {{ text }}
                </p>
                
                <h4 class="info-title subtitle">Преимущества членства</h4>
                <div class="benefits-grid">
                  <div class="benefit-item" v-for="(benefit, index) in membershipData.benefits" :key="index">
                    <div class="benefit-icon">✓</div>
                    <div class="benefit-text">{{ benefit }}</div>
                  </div>
                </div>
                
                <div class="application-process">
                  <h4 class="process-title">Процесс вступления</h4>
                  <div class="process-steps">
                    <div class="process-step" v-for="(step, index) in membershipData.processSteps" :key="index">
                      <div class="step-number">{{ index + 1 }}</div>
                      <div class="step-text">{{ step }}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="members-list">
                <h3 class="info-title">Кто может стать членом</h3>
                <ul class="members-categories">
                  <li class="category-item" v-for="(category, index) in membershipData.categories" :key="index">
                    <div class="category-icon">{{ index + 1 }}</div>
                    <div class="category-text">{{ category }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

  
  </div>
</template>

<script>
export default {
  name: 'PresidentPage',
  data() {
    return {
      presidentData: {
        image: 'http://kamp.kz/files/sites/1369648304051529/files/IMG_1682.JPG',
        bio: [
          'Каким будет этот год для маркетингового сообщества будущее покажет, но уже сегодня ясно, что интернет маркетинг занял прочное место в нашей жизни. Огромные возможности открываются перед предпринимателями использующими инструменты интернета для продвижения товаров, системы выстраивания взаимоотношений с партнерами и клиентами для получения лояльных покупателей.',
          'Мобильная и электронная коммерция развивается семимильными шагами и тот кто раньше освоит эти процессы, станет более конкурентоспособен и эфективен. Задача стоящая перед нашей Ассоциацией очень непростая внедрить современные инструменты маркетинга и продаж в бизнес-процессы наших предпринимателей.'
        ],
        message: 'Мы стремимся создать сильное профессиональное сообщество маркетологов, где каждый член может развиваться, обмениваться опытом и вместе мы сможем поднять стандарты маркетинга в Казахстане на новый уровень.'
      },
      membershipData: {
        info: [
          'Членами Ассоциации могут быть как юридические, так и физические лица. На сегодняшний день в нашей ассоциации состоит более 150 активных членов из различных отраслей экономики Казахстана.',
          'Для вступления в Члены Ассоциации претенденту необходимо подать заявку в произвольной форме. Вопрос о принятии в Члены Ассоциации решается Советом Ассоциации. Претендент считается принятым в Члены Ассоциации в случае получения согласия всех Членов Совета Ассоциации.'
        ],
        benefits: [
          'Доступ к эксклюзивным мероприятиям и семинарам',
          'Участие в профессиональных дискуссиях и круглых столах',
          'Сетевые возможности и установление деловых контактов',
          'Доступ к базе знаний и исследованиям ассоциации'
        ],
        processSteps: [
          'Подача заявки в произвольной форме',
          'Рассмотрение Советом Ассоциации',
          'Получение согласия всех членов Совета'
        ],
        categories: [
          'Профессиональные исследовательские организации, работающие в сфере маркетинга и социологии',
          'Средства массовой информации, специализирующиеся по проблемам маркетинга, рекламы научные издания, экономики, бизнеса, социологии, общественного мнения',
          'Компании (фирмы, имеющие подразделения, систематически осуществляющие маркетинговые исследования)',
          'Организации, оказывающие консалтинговые услуги в области маркетинга и рекламы',
          'Индивидуальные предприниматели и оказывающие маркетинговые и рекламные услуги на профессиональной основе физические лица',
          'Начинающие маркетологи, пиарщики, рекламщики, а также обучающиеся по вышеуказанным специальностям и проявляющие интерес в маркетинговой деятельности студенты вузов'
        ]
      }
    }
  },
  mounted() {
    this.initAnimations();
  },
  methods: {
    handleImageError(event) {
     
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDYwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiMyYzVhYTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+wrsgUHJlc2lkZW50IPCfkJMgQXNzb2NpYXRpb24gwrs8L3RleHQ+PC9zdmc+';
    },
    
    initAnimations() {
    
      const categoryItems = document.querySelectorAll('.category-item');
      categoryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
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

.president-page {
    background: var(--light);
    color: var(--dark);
    line-height: 1.6;
}

/* President Hero */
.president-hero {
    background: var(--gradient);
    color: white;
    padding: 150px 0 80px;
    text-align: center;
    margin-top: 0;
}

.president-hero h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
}

.president-hero p {
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.9;
}

/* President Content */
.president-content {
    padding: 80px 0;
}

.president-container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 20px;
}

.president-profile {
    display: grid;
    grid-template-columns: 500px 1fr;
    gap: 60px;
    margin-bottom: 60px;
    align-items: start;
}

.president-photo {
    position: relative;
}

.photo-frame {
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.president-image {
    width: 100%;
    height: 600px;
    object-fit: cover;
    display: block;
    border-radius: 20px;
}

.president-info {
    padding-top: 0;
}

.president-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 30px;
    line-height: 1.2;
}

.president-bio {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
}

.bio-text {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--dark);
    margin-bottom: 25px;
}

.bio-text:last-child {
    margin-bottom: 0;
}

/* President Message */
.president-message {
    background: var(--gradient);
    color: white;
    padding: 60px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    margin-bottom: 60px;
}

.message-content {
    position: relative;
    z-index: 2;
}

.message-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
}

.message-text {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 25px;
    text-align: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.message-pattern {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    opacity: 0.1;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50%" y="50%" font-size="80" text-anchor="middle" dominant-baseline="middle" fill="white">KAMP</text></svg>');
    background-size: contain;
}

/* Members Section */
.members-section {
    background: var(--secondary);
    padding: 80px 0;
    border-radius: 30px;
    margin-top: 60px;
}

.members-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary);
    text-align: center;
    margin-bottom: 50px;
}

.members-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: start;
}

.members-info {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.members-list {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.info-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 25px;
}

.info-title.subtitle {
    font-size: 1.2rem;
    margin-top: 30px;
}

.info-text {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--dark);
    margin-bottom: 20px;
}

.benefits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 30px 0;
}

.benefit-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 15px;
    background: var(--secondary);
    border-radius: 12px;
}

.benefit-icon {
    width: 24px;
    height: 24px;
    background: var(--accent);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    flex-shrink: 0;
    margin-top: 2px;
}

.benefit-text {
    font-size: 0.9rem;
    line-height: 1.4;
    color: var(--dark);
}

.members-categories {
    list-style: none;
}

.category-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 20px;
    padding: 15px;
    background: var(--secondary);
    border-radius: 12px;
    transition: all 0.3s ease;
}

.category-item:hover {
    background: var(--primary-light);
    color: white;
    transform: translateX(5px);
}

.category-item:hover .category-text {
    color: white;
}

.category-icon {
    width: 24px;
    height: 24px;
    background: var(--accent);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    flex-shrink: 0;
    margin-top: 2px;
}

.category-text {
    font-size: 1rem;
    line-height: 1.5;
    color: var(--dark);
}

.application-process {
    background: var(--gradient);
    color: white;
    padding: 40px;
    border-radius: 20px;
    margin-top: 40px;
}

.process-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
}

.process-steps {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 30px;
}

.process-step {
    text-align: center;
    flex: 1;
}

.step-number {
    width: 50px;
    height: 50px;
    background: white;
    color: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    margin: 0 auto 15px;
}

.step-text {
    font-size: 0.9rem;
    line-height: 1.4;
}

/* Responsive Styles */
@media (max-width: 1024px) {
    .president-profile {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    
    .photo-frame {
        max-width: 500px;
        margin: 0 auto;
    }
    
    .president-image {
        height: 500px;
    }
    
    .members-content {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    
    .process-steps {
        flex-direction: column;
        gap: 25px;
    }
    
    .benefits-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .president-hero {
        padding: 120px 0 60px;
    }
    
    .president-hero h1 {
        font-size: 2.2rem;
    }
    
    .president-hero p {
        font-size: 1rem;
    }
    
    .president-title {
        font-size: 1.8rem;
    }
    
    .president-bio {
        padding: 30px 20px;
    }
    
    .president-message {
        padding: 40px 20px;
    }
    
    .message-title {
        font-size: 1.6rem;
    }
    
    .president-image {
        height: 400px;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .members-info,
    .members-list {
        padding: 30px 20px;
    }
    
    .application-process {
        padding: 30px 20px;
    }
}

@media (max-width: 480px) {
    .president-hero h1 {
        font-size: 1.8rem;
    }
    
    .president-title {
        font-size: 1.6rem;
    }
    
    .bio-text {
        font-size: 1rem;
    }
    
    .president-image {
        height: 300px;
    }
    
    .section-title {
        font-size: 1.8rem;
    }
}
</style>