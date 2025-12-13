<template>
  <div class="home-page">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>

    <!-- Hero Section -->
    <Hero />
    
    <!-- Features Section -->
    <Features />
    
    <!-- Events Section -->
    <Events />
    
    <!-- Poll Section -->
    <Poll />
    
    <!-- Accordion Section -->
    <Accordion />
    
    <!-- Partners Section -->
    <Partners />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import Features from '../components/Features.vue'
import Events from '../components/Events.vue'
import Poll from '../components/Poll.vue'
import Accordion from '../components/Accordion.vue'
import Partners from '../components/Partners.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    Features,
    Events,
    Poll,
    Accordion,
    Partners
  }
}
</script>

<style scoped>
.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}
.floating-cta {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--gradient-accent);
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
            text-decoration: none;
            font-weight: 600;
            z-index: 1000;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 5%;
  animation: float 20s infinite ease-in-out;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 10%;
  animation: float 25s infinite ease-in-out reverse;
}

.shape-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 20%;
  animation: float 30s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}
</style>