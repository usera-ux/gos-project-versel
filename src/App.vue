<template>
  <div id="app">
    <WelcomeOverlay v-if="showWelcome" @close="hideWelcome" />
    
    <Header />
    
    <main>
      <router-view />
    </main>
    
    <Footer />
    
    <a href="/contact" class="floating-cta">Вступить в ассоциацию →</a>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useMainStore } from './store'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import WelcomeOverlay from './components/WelcomeOverlay.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    WelcomeOverlay
  },
  setup() {
    const store = useMainStore()
    
    return {
      showWelcome: computed(() => store.showWelcome),
      hideWelcome: () => store.hideWelcome()
    }
  }
}
</script>

<style>

</style>