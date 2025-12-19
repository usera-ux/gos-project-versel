<template>
  <div v-if="visible" class="welcome-overlay" @click.self="closeOverlay">
    <div class="welcome-content text-center">
      <div class="welcome-logo mb-4">
        <div class="logo-circle d-inline-flex align-items-center justify-content-center rounded-circle">
          <span class="logo-text fs-1 fw-bold">KAMP</span>
        </div>
      </div>
      
      <h1 class="welcome-title display-3 fw-bold mb-3">Welcome</h1>
      <p class="welcome-subtitle fs-4 mb-5">Казахстанская ассоциация профессиональных маркетологов</p>
      
      <div class="loading-bar mb-4">
        <div class="loading-progress" :style="{ width: progress + '%' }"></div>
      </div>
      
      <button class="btn btn-outline-light btn-lg" @click="closeOverlay">
        Войти на сайт <i class="bi bi-arrow-right ms-2"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useMainStore } from '../store'

export default {
  name: 'WelcomeOverlay',
  props: {
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup(props, { emit }) {
    const store = useMainStore()
    const visible = ref(false)
    const progress = ref(0)
    
    let interval
    
    const startProgress = () => {
      const totalSteps = props.duration / 50 
      const increment = 100 / totalSteps
      
      interval = setInterval(() => {
        progress.value += increment
        if (progress.value >= 100) {
          clearInterval(interval)
          closeOverlay()
        }
      }, 50)
    }
    
    const closeOverlay = () => {
      clearInterval(interval)
      visible.value = false
      store.hideWelcome()
      emit('close')
    }
    
    onMounted(() => {
      visible.value = store.showWelcome
      if (visible.value) {
        startProgress()
      }
    })
    
    onUnmounted(() => {
      clearInterval(interval)
    })
    
    return {
      visible,
      progress,
      closeOverlay
    }
  }
}
</script>

<style scoped>
.welcome-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #4b6ba2 100%);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.5s ease;
}

.welcome-content {
  color: white;
  padding: 2rem;
  animation: slideUp 0.8s ease;
}

.logo-circle {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid rgba(255, 255, 255, 0.3);
  animation: pulse 2s infinite;
}

.welcome-title {
  font-weight: 800;
  background: linear-gradient(135deg, #27349b 0%, #629bdd 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-subtitle {
  opacity: 0.9;
}

.loading-bar {
  width: 300px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto;
}

.loading-progress {
  height: 100%;
 background: linear-gradient(135deg, #27349b 0%, #629bdd 100%);
  border-radius: 2px;
  transition: width 0.05s linear;
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 2.5rem;
  }
  
  .welcome-subtitle {
    font-size: 1.25rem;
  }
  
  .loading-bar {
    width: 200px;
  }
}
</style>