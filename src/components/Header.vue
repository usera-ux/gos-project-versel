<template>
  <header class="glass-header" :id="headerId" :class="{ 'header-scrolled': scrolled }">
    <div class="container">
      <div class="header-inner">
        <router-link to="/" class="logo">
          <div style="font-weight: 900; font-size: 30px; color: #2c5aa0;">KAMP</div>
        </router-link>
        
        <nav class="nav-main" :class="{ 'mobile-open': mobileMenuOpen }">
          <router-link to="/" class="nav-link" @click="closeMobileMenu">Главная</router-link>

          <div class="dropdown">
            <a href="#" class="nav-link" @click.prevent="toggleDropdown('about', $event)">О Нас</a>
            <div class="dropdown-menu">
              <router-link to="/activities" class="dropdown-item" @click="closeAll">Деятельность ассоциации</router-link>
              <router-link to="/charter" class="dropdown-item" @click="closeAll">Устав</router-link>
              <router-link to="/about" class="dropdown-item" @click="closeAll">Структура</router-link>
            </div>
          </div>
          
          <router-link to="/news" class="nav-link" @click="closeMobileMenu">Новости</router-link>
          
          <div class="dropdown">
            <a href="#" class="nav-link" @click.prevent="toggleDropdown('training', $event)">Обучение</a>
            <div class="dropdown-menu">
              <div class="dropdown-submenu">
                <a href="#" class="dropdown-item dropdown-toggle" @click.prevent="toggleSubmenu($event)">
                  Шаблоны для маркетологов
                </a>
                <div class="dropdown-submenu-content">
                  <router-link to="/powerpoint" class="dropdown-item" @click="closeAll">Шаблоны PowerPoint </router-link>
                  <router-link to="/question" class="dropdown-item" @click="closeAll">Шаблоны анкет для опросов</router-link>
                  <router-link to="/marketing-analysis" class="dropdown-item" @click="closeAll">Маркетинговый анализ</router-link>
                  <router-link to="/marketing-plan" class="dropdown-item" @click="closeAll">Маркетинговый план</router-link>
                  <router-link to="/templates/sales-analysis" class="dropdown-item" @click="closeAll">Шаблоны анализа продаж</router-link>
                  <router-link to="/brief" class="dropdown-item" @click="closeAll">Шаблоны брифов</router-link>
                </div>
              </div>
              <router-link to="/library" class="dropdown-item" @click="closeAll">Литература</router-link>
            </div>
          </div>
          
          <div class="dropdown">
            <a href="#" class="nav-link" @click.prevent="toggleDropdown('projects', $event)">Проекты</a>
            <div class="dropdown-menu">
              <router-link to="/exhibitions" class="dropdown-item" @click="closeAll">Выставки</router-link>
              <router-link to="/seminars" class="dropdown-item" @click="closeAll">Семинары</router-link>
              <router-link to="/notfound" class="dropdown-item" @click="closeAll">Фотогалерея</router-link>
            </div>
          </div>

          <div class="dropdown">
            <router-link to="/contact" class="nav-link" @click.prevent="toggleDropdown('contact', $event)">Контакты</router-link>
           
          </div>
        </nav>

        <div class="lang-switcher">
          <button @click="setLanguage('ru')" class="lang-btn" :class="{ active: language === 'ru' }">RU</button>
          <button @click="setLanguage('kz')" class="lang-btn" :class="{ active: language === 'kz' }">KZ</button>
          <button @click="setLanguage('en')" class="lang-btn" :class="{ active: language === 'en' }">EN</button>
        </div>
 <div class="auth-section" v-if="authStore.isAuthenticated">
      <div class="dropdown">
        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
          <i class="bi bi-person-circle me-2"></i>
          {{ authStore.userName }}
        </a>
        <div class="dropdown-menu">
          <router-link to="/dashboard" class="dropdown-item">
            <i class="bi bi-speedometer2 me-2"></i>Личный кабинет
          </router-link>
          <router-link to="/profile" class="dropdown-item">
            <i class="bi bi-person me-2"></i>Профиль
          </router-link>
          <div v-if="authStore.isAdmin" class="dropdown-divider"></div>
          <router-link v-if="authStore.isAdmin" to="/admin" class="dropdown-item">
            <i class="bi bi-shield-lock me-2"></i>Админ панель
          </router-link>
          <div class="dropdown-divider"></div>
          <a href="#" @click.prevent="logout" class="dropdown-item text-danger">
            <i class="bi bi-box-arrow-right me-2"></i>Выйти
          </a>
        </div>
      </div>
    </div>
    
    <div class="auth-section" v-else>
      <router-link to="/login" class="btn btn-outline-primary btn-sm">
        <i class="bi bi-box-arrow-in-right me-2"></i>Войти
      </router-link>
    </div>

        <button class="mobile-menu-btn" @click="toggleMobileMenu">☰</button>
      </div>
    </div>
   

  </header>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
}
</script>
<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '../store'

export default {
  name: 'Header',
  setup() {
    const store = useMainStore()
    const router = useRouter()
    const scrolled = ref(false)
    const mobileMenuOpen = ref(false)
    const headerId = 'header' 
    
    const language = computed(() => store.language)
    
    const handleScroll = () => {
      scrolled.value = window.scrollY > 50
    }
    
    const setLanguage = (lang) => {
      store.setLanguage(lang)
    }
    
    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }
    
    const closeMobileMenu = () => {
      mobileMenuOpen.value = false
    }
    
    const toggleDropdown = (dropdownName, event) => {
    
      if (window.innerWidth <= 1024) {
        switch(dropdownName) {
          case 'about':
            router.push('/about')
            break
          case 'training':
            router.push('/training')
            break
          case 'projects':
            router.push('/exhibitions')
            break
          case 'contact':
            router.push('/contact')
            break
        }
        closeMobileMenu()
      }
    
    }
    
    const toggleSubmenu = (event) => {
    
      if (window.innerWidth <= 1024) {
        event.preventDefault()
        const submenu = event.target.nextElementSibling
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block'
      }
    }
    
    const closeAll = () => {
      mobileMenuOpen.value = false
    }
    
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
    
    return {
      scrolled,
      mobileMenuOpen,
      headerId,
      language,
      setLanguage,
      toggleMobileMenu,
      closeMobileMenu,
      toggleDropdown,
      toggleSubmenu,
      closeAll
    }
  }
}
</script>

<style scoped>
.glass-header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(44, 90, 160, 0.1);
  z-index: 1000;
  padding: 12px 0;
  transition: all 0.3s ease;
}

.header-scrolled {
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Навигация */
.nav-main {
  display: flex;
  gap: 5px;
  align-items: center;
}

.nav-link {
  color: #2d3748;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  cursor: pointer;
}

.nav-link:hover {
  background: #2c5aa0;
  color: white;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 220px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 12px 20px;
  color: #2d3748;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background: #2c5aa0;
  color: white;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-submenu {
  position: relative;
}

.dropdown-submenu .dropdown-toggle::after {
  content: "›";
  float: right;
  margin-left: 10px;
  transform: rotate(90deg);
}

.dropdown-submenu-content {
  display: none;
  position: absolute;
  left: 100%;
  top: 0;
  background: white;
  min-width: 280px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  border-radius: 8px;
  z-index: 1001;
}

.dropdown-submenu:hover .dropdown-submenu-content {
  display: block;
}


.lang-switcher {
  display: flex;
  gap: 5px;
  margin-left: 20px;
}

.lang-btn {
  padding: 5px 10px;
  border: 1px solid #2c5aa0;
  background: white;
  border-radius: 4px;
  color: #2c5aa0;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.lang-btn:hover {
  background: #2c5aa0;
  color: white;
}

.lang-btn.active {
  background: #2c5aa0;
  color: white;
}


.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #2c5aa0;
  cursor: pointer;
  padding: 5px;
}


@media (max-width: 1024px) {
  .nav-main {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    padding: 20px;
    gap: 10px;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .nav-main.mobile-open {
    display: flex;
  }
  
  .dropdown-menu {
    position: static;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    display: none;
    background: #f8f9fa;
    margin-left: 20px;
    margin-top: 10px;
  }
  
  .dropdown:hover .dropdown-menu {
    display: block;
  }
  
  .dropdown-submenu-content {
    position: static;
    left: auto;
    box-shadow: none;
    padding-left: 20px;
    background: #e9ecef;
  }
  
  .dropdown-submenu .dropdown-toggle::after {
    transform: rotate(0deg);
  }
  
  .lang-switcher {
    margin-left: auto;
    margin-right: 15px;
  }
}
</style>
<style scoped>
.dropdown-menu {
    padding-top: 5px;
    margin-top: -5px;
}


.dropdown > .nav-link {
    position: relative;
    z-index: 1001;
}


.dropdown::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 10px;
    background: transparent;
}


.dropdown:hover .dropdown-menu {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
    display: block !important;
}


</style>