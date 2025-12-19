<template>
  <div class="home-page">

    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
    

    <main>
      <div class="content">
        <h2>Пока что тут пусто</h2>
        <p class="empty-message">Содержание появится позже...</p>
      </div>
    </main>

 
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'


export default {
  name: 'notfound',

  setup() {
  
    const isScrolled = ref(false)
    const mobileMenuOpen = ref(false)


    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }

    const toggleMobileMenu = (isOpen) => {
      mobileMenuOpen.value = isOpen !== undefined ? isOpen : !mobileMenuOpen.value
      if (mobileMenuOpen.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }

    const handleClickOutside = (event) => {
      const navMain = document.querySelector('.nav-main')
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn')
      
      if (mobileMenuOpen.value && 
          navMain && 
          !navMain.contains(event.target) && 
          mobileMenuBtn && 
          !mobileMenuBtn.contains(event.target)) {
        toggleMobileMenu(false)
      }
    }

  
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isScrolled,
      mobileMenuOpen,
      toggleMobileMenu
    }
  }
}
</script>

<style scoped>
.home-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #2d3748;
  overflow-x: hidden;
}
.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  animation: float 15s infinite ease-in-out;
}

.shape-1 { 
  width: 200px; 
  height: 200px; 
  top: 15%; 
  left: 10%; 
  background: radial-gradient(circle, rgba(44, 90, 160, 0.2) 0%, rgba(44, 90, 160, 0.05) 70%);
  animation-delay: 0s;
}
.shape-2 { 
  width: 150px; 
  height: 150px; 
  top: 65%; 
  right: 15%; 
  background: radial-gradient(circle, rgba(44, 90, 160, 0.2) 0%, rgba(255, 107, 53, 0.03) 70%);
  animation-delay: -3s;
}
.shape-3 { 
  width: 120px; 
  height: 120px; 
  bottom: 25%; 
  left: 25%; 
  background: radial-gradient(circle, rgba(44, 90, 160, 0.2)0%, rgba(44, 90, 160, 0.02) 70%);
  animation-delay: -6s;
}
.shape-4 { 
  width: 180px; 
  height: 180px; 
  top: 30%; 
  right: 25%; 
  background: radial-gradient(circle, rgba(44, 90, 160, 0.2) 0%, rgba(255, 107, 53, 0.01) 70%);
  animation-delay: -9s;
}


@keyframes float {
  0%, 100% { 
    transform: translate(0, 0) rotate(0deg); 
  }
  25% { 
    transform: translate(20px, -30px) rotate(5deg); 
  }
  50% { 
    transform: translate(-15px, 20px) rotate(-3deg); 
  }
  75% { 
    transform: translate(25px, 15px) rotate(2deg); 
  }
}
main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin-top: 80px;
  position: relative;
  z-index: 1;
}

.content {
  text-align: center;
  color: #2d3748;
  background: rgba(255, 255, 255, 0.9);
  padding: 3rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(44, 90, 160, 0.1);
  max-width: 800px;
  width: 100%;
}

.content h2 {
  font-size: 2rem;
  color: #2c5aa0;
  margin-bottom: 1rem;
  font-weight: 600;
}

.empty-message {
  font-size: 1.2rem;
  font-style: italic;
  color: #718096;
  margin-top: 1rem;
  line-height: 1.6;
}
@media (max-width: 768px) {
  .content {
    padding: 2rem 1rem;
    margin: 1rem;
  }
  
  main {
    margin-top: 70px;
    padding: 1rem;
  }
  
  .content h2 {
    font-size: 1.5rem;
  }
  
  .empty-message {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .content {
    padding: 1.5rem 1rem;
  }
  
  .content h2 {
    font-size: 1.3rem;
  }
}
</style>