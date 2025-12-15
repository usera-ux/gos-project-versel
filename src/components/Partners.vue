<template>
  <section class="partners py-5">
    <div class="container">
      <h2 class="section-title text-center mb-10 mt-5">Наши партнеры</h2>

      <div class="d-none d-lg-block">
        <div class="partners-scroll mt-5" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
          <div class="partners-inner">
            <div v-for="(partner, index) in scrollPartners" :key="index" class="partner-scroll-item">
              <div class="logo-wrapper">
                <img :src="partner.logo" :alt="partner.name">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Partners',
  setup() {
    const isScrolling = ref(true)
    
    const partners = ref([
      { name: 'Cabmarket', logo: 'https://hh.ru/employer-logo/2493021.png' },
      { name: 'BM Consulting', logo: 'https://hh.ru/employer-logo/2493021.png' },
      { name: 'BMC Sales', logo: 'https://hh.ru/employer-logo/2493021.png' },
      { name: 'Digital Partners', logo: 'https://hh.ru/employer-logo/2493021.png' },
      { name: 'Marketing Pro', logo: 'https://hh.ru/employer-logo/2493021.png' },
      { name: 'Business Solutions', logo: 'https://hh.ru/employer-logo/2493021.png' }
    ])
    
    const scrollPartners = ref([
      { name: 'Partner 1', logo: 'https://hh.ru/employer-logo/2493021.png' },
      { name: 'Partner 2', logo: ' https://agartu.kz/files/sites/1389540635191320/files/widgets/associations/0/ru/kamp.kz.png' },
      { name: 'Partner 3', logo: 'https://agartu.kz/files/sites/1389540635191320/files/widgets/associations/0/ru/itk.kz.jpeg' },
      { name: 'Partner 4', logo: 'https://agartu.kz/files/sites/1389540635191320/files/widgets/associations/0/ru/atpk.kz.png' },
      { name: 'Partner 5', logo: 'https://agartu.kz/files/sites/1389540635191320/files/widgets/associations/0/ru/askt.kz.png' },
      { name: 'Partner 6', logo: 'https://agartu.kz/files/sites/1389540635191320/files/widgets/associations/0/ru/ifac.kz.jpg' },
      { name: 'Partner 7', logo: 'https://agartu.kz/files/sites/1389540635191320/files/widgets/associations/0/ru/qaztexindustry.kz.jpg' },
      { name: 'Partner 8', logo: 'https://agartu.kz/files/sites/1389540635191320/files/widgets/associations/0/ru/ravpb.kz.jpg' }
    ])
    
    const pauseScroll = () => {
      isScrolling.value = false
    }
    
    const resumeScroll = () => {
      isScrolling.value = true
    }
    
    let scrollInterval
    
    const autoScroll = () => {
      if (!isScrolling.value) return
      
      const scrollElement = document.querySelector('.partners-inner')
      if (scrollElement) {
        scrollElement.style.transform = `translateX(${scrollPosition.value}px)`
        scrollPosition.value -= 1
        
        if (Math.abs(scrollPosition.value) > scrollElement.scrollWidth / 2) {
          scrollPosition.value = 0
        }
      }
    }
    
    const scrollPosition = ref(0)
    
    onMounted(() => {
      scrollInterval = setInterval(autoScroll, 120)
    })
    
    onUnmounted(() => {
      clearInterval(scrollInterval)
    })
    
    return {
      partners,
      scrollPartners,
      pauseScroll,
      resumeScroll
    }
  }
}
</script>

<style scoped>


.partner-logo {
  transition: all 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
}

.partner-logo:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
}

.partner-logo img {
  max-height: 60px;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.partner-logo:hover img {
  filter: grayscale(0);
  opacity: 1;
}

/* Автопрокрутка */
.partners-scroll {
  overflow: hidden;
  position: relative;
  padding: 2rem 0;
}

.partners-inner {
  display: flex;
  gap: 3rem;
  transition: transform 0.1s linear;
}

.partner-scroll-item {
  flex: 0 0 auto;
  width: 150px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.partner-scroll-item img {
  max-width: 100%;
  max-height: 50px;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.partner-scroll-item:hover img {
  filter: grayscale(0);
  opacity: 1;
}
</style>