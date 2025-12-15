<template>
  <section class="hero position-relative overflow-hidden">

    <div class="hero-slider position-absolute w-100 h-100">
      <div class="slide slide-1 position-absolute w-100 h-100" :class="{ 'active': currentSlide === 0 }"></div>
      <div class="slide slide-2 position-absolute w-100 h-100" :class="{ 'active': currentSlide === 1 }"></div>
    </div>
    
  
    <div class="hero-overlay position-absolute w-100 h-100"></div>
    
    <div class="container position-relative">
      <div class="hero-content py-5 my-5">
        <h1 class="hero-title mb-4">
          Казахстанская Ассоциация<br>
          <span class="highlight">профессиональных маркетологов</span>
        </h1>
        <p class="hero-subtitle mb-4">
          Общественная организация, целью которой является создание максимальных условий 
          для внедрения передовых методов маркетинга и продвижения товаров и услуг. 
          Мы объединяем ведущих специалистов для развития профессионального сообщества.
        </p>
        <div class="cta-buttons d-flex flex-wrap gap-3">
          <router-link to="/contact" class="btn btn1 btn-lg px-5 py-3 ">
            Вступить в ассоциацию
          </router-link>
          <router-link to="/about" class="btn btn-outline-light btn-lg px-5 py-3">
            Узнать больше о нас
          </router-link>
        </div>
        
   
        <div class="slider-dots d-flex gap-2 mt-5">
          <button 
            v-for="n in 2" 
            :key="n"
            class="slider-dot rounded-circle border-0"
            :class="{ 'active': currentSlide === n-1 }"
            @click="goToSlide(n-1)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Hero',
  setup() {
    const currentSlide = ref(0)
    const slides = [
      {
        id: 0,
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
      },
      {
        id: 1,
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
      }
    ]
    
    let slideInterval
    
    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % slides.length
    }
    
    const goToSlide = (index) => {
      currentSlide.value = index
      resetInterval()
    }
    
    const resetInterval = () => {
      clearInterval(slideInterval)
      slideInterval = setInterval(nextSlide, 5000)
    }
    
    onMounted(() => {
      slideInterval = setInterval(nextSlide, 5000)
    })
    
    onUnmounted(() => {
      clearInterval(slideInterval)
    })
    
    return {
      currentSlide,
      slides,
      goToSlide
    }
  }
}
</script>

<style scoped>

</style>