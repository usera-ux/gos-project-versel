<template>
  <header class="glass-header" :id="headerId" :class="{ 'header-scrolled': scrolled }">
    <div class="container">
      <div class="header-inner">
        <router-link to="/" class="logo">
          <div style="font-weight: 900; font-size: 30px; color: #2c5aa0;">KAMP</div>
        </router-link>
        
        <nav class="nav-main" :class="{ 'mobile-open': mobileMenuOpen }">
          <router-link to="/" class="nav-link" @click="closeMobileMenu">Главная</router-link>


          <!-- О Нас -->
          <div class="dropdown">
            <a href="#" class="nav-link" @click.prevent="toggleDropdown('about', $event)">О Нас</a>
            <div class="dropdown-menu">
              <router-link to="/activities" class="dropdown-item" @click="closeAll">Деятельность ассоциации</router-link>
              <router-link to="/charter" class="dropdown-item" @click="closeAll">Устав</router-link>
              <router-link to="/about" class="dropdown-item" @click="closeAll">Структура</router-link>
            </div>
          </div>
          
          <router-link to="/news" class="nav-link" @click="closeMobileMenu">Новости</router-link>
          
          <!-- Обучение -->
          <div class="dropdown">
            <a href="#" class="nav-link" @click.prevent="toggleDropdown('training', $event)">Обучение</a>
            <div class="dropdown-menu">
              <div class="dropdown-submenu">
                <router-link to="/brief" class="dropdown-item dropdown-toggle" @click.prevent="toggleSubmenu($event)">
                  Шаблоны для маркетологов
                </router-link>
              </div>
              <router-link to="/library" class="dropdown-item" @click="closeAll">Литература</router-link>
            </div>
          </div>
          
          <!-- Проекты -->
          <div class="dropdown">
            <a href="#" class="nav-link" @click.prevent="toggleDropdown('projects', $event)">Проекты</a>
            <div class="dropdown-menu">
              <router-link to="/exhibitions" class="dropdown-item" @click="closeAll">Выставки</router-link>
              <router-link to="/seminars" class="dropdown-item" @click="closeAll">Семинары</router-link>
              <router-link to="/notfound" class="dropdown-item" @click="closeAll">Фотогалерея</router-link>
            </div>
          </div>


          <router-link to="/contact" class="nav-link" @click="closeMobileMenu">Контакты</router-link>
        </nav>


        <!-- Auth -->
        <div class="auth-section">
          <div v-if="!user.name" class="auth-buttons">
            <router-link to="/login" class="btn btn-secondary">Вход</router-link>
            <router-link to="/register" class="btn btn2">Регистрация</router-link>
          </div>
          <div v-else class="user-profile" @click="toggleUserMenu">
            <div class="user-info">
         <div class="user-avatar">
  <img 
    v-if="user.avatar" 
    :src="user.avatar" 
    alt="Avatar"
    class="user-avatar-img"
  />
  <span v-else>{{ user.initial }}</span>
</div>

              <span class="user-name">{{ user.name }}</span>
              <i class="dropdown-arrow">▼</i>
            </div>
            <div v-if="userMenuOpen" class="user-dropdown">
              <router-link to="/profile" class="dropdown-item">Профиль</router-link>
              <router-link to="/admin" v-if="isAdmin" class="dropdown-item">Админ панель</router-link>
              <div class="dropdown-divider"></div>
              <button @click="logout" class="dropdown-item logout">Выйти</button>
            </div>
          </div>
        </div>


        <button class="mobile-menu-btn" @click="toggleMobileMenu">☰</button>
      </div>
    </div>
  </header>
</template>


<script>
import { ref, onMounted, onUnmounted, reactive, computed, nextTick } from 'vue'
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
    const userMenuOpen = ref(false)
    
    const user = reactive({ name: '', initial: '' })


   
    const initAllFunctions = () => {
   
      const welcomeOverlay = document.getElementById('welcomeOverlay')
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
      if (welcomeOverlay && !hasSeenWelcome) {
        setTimeout(() => {
          welcomeOverlay.classList.add('hidden')
          localStorage.setItem('hasSeenWelcome', 'true')
        }, 3000)
      } else if (welcomeOverlay) {
        welcomeOverlay.style.display = 'none'
      }



      const handleScroll = () => {
        const header = document.getElementById('header')
        if (window.scrollY > 50) {
          header?.classList.add('header-scrolled')
          scrolled.value = true
        } else {
          header?.classList.remove('header-scrolled')
          scrolled.value = false
        }
      }
      window.addEventListener('scroll', handleScroll)


  
      const dropdowns = document.querySelectorAll('.dropdown')
      dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
          const menu = this.querySelector('.dropdown-menu')
          if (menu) {
            menu.style.display = 'block'
            menu.style.opacity = '1'
            menu.style.visibility = 'visible'
          }
        })
        
        dropdown.addEventListener('mouseleave', function() {
          const menu = this.querySelector('.dropdown-menu')
          if (menu) {
            setTimeout(() => {
              if (!menu.matches(':hover') && !this.matches(':hover')) {
                menu.style.display = 'none'
                menu.style.opacity = '0'
                menu.style.visibility = 'hidden'
              }
            }, 100)
          }
        })
      })


    
      document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault()
            const submenu = this.nextElementSibling
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block'
          }
        })
      })

      onMounted(async () => {
  checkUser()
  await nextTick()
  initAllFunctions()


  window.addEventListener('user-updated', checkUser)
})

onUnmounted(() => {
  window.removeEventListener('user-updated', checkUser)
})


     
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn')
      const navMain = document.querySelector('.nav-main')
      if (mobileMenuBtn && navMain) {
        mobileMenuBtn.addEventListener('click', () => {
          navMain.classList.toggle('mobile-open')
        })
      }


      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }




const checkUser = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    user.name = ''
    user.initial = 'U'
    user.avatar = ''
    return
  }

  const userData = localStorage.getItem('user')
  if (userData) {
    try {
      const parsed = JSON.parse(userData)
      user.name = parsed.name || parsed.firstName || 'U'
      user.initial = (user.name[0] || 'U').toUpperCase()
      user.avatar = parsed.avatar || ''  
    } catch {
      user.name = ''
      user.initial = 'U'
      user.avatar = ''
    }
  }
}





    const toggleUserMenu = () => {
      userMenuOpen.value = !userMenuOpen.value
    }


    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      checkUser()
      userMenuOpen.value = false

      window.location.reload()
    }


    const isAdmin = computed(() => {
      try {
        const data = localStorage.getItem('user')
        return data ? JSON.parse(data).role === 'admin' : false
      } catch {
        return false
      }
    })


    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }


    const closeMobileMenu = () => {
      mobileMenuOpen.value = false
    }


    const closeAll = () => {
      mobileMenuOpen.value = false
      document.querySelectorAll('.dropdown-submenu-content').forEach(s => {
        s.style.display = 'none'
      })
    }


    const toggleDropdown = (name, event) => {
      if (window.innerWidth <= 1024) {
        const routes = { 
          'about': '/about', 
          'training': '/library', 
          'projects': '/exhibitions' 
        }
        router.push(routes[name] || '/')
        closeMobileMenu()
      }
    }


    const toggleSubmenu = (event) => {
      if (window.innerWidth <= 1024) {
        event.preventDefault()
        event.stopPropagation()
        const submenu = event.target.nextElementSibling
        if (submenu) {
          submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block'
        }
      }
    }


    onMounted(async () => {
      checkUser()
      await nextTick()
      initAllFunctions()
    })


    onUnmounted(() => {
    
    })


    return {
      scrolled, mobileMenuOpen, headerId, user, userMenuOpen,
      toggleUserMenu, logout, isAdmin,
      toggleMobileMenu, closeMobileMenu, toggleDropdown, toggleSubmenu, closeAll,
  checkUser,
    }
  }
}
</script>


<style scoped>
  .user-avatar {
  width: 40px;
  height: 40px;
  background: #2c5aa0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  overflow: hidden;
}

.user-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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


/* Dropdown */
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
  pointer-events: none;
}


.dropdown:hover .dropdown-menu {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateY(0) !important;
  pointer-events: auto !important;
}


/* Submenu */
.dropdown-submenu {
  position: relative;
}


.dropdown-submenu-content {
  position: absolute;
  top: 0;
  left: 100%;
  background: white;
  min-width: 220px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(10px);
  transition: all 0.3s ease;
  z-index: 1001;
  pointer-events: none;
}


.dropdown-submenu:hover .dropdown-submenu-content {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateX(0) !important;
  pointer-events: auto !important;
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


.dropdown-toggle {
  font-weight: 500;
}


/* Lang Switcher */
.lang-switcher {
  display: flex;
  gap: 5px;
  margin-left: 20px;
}


.lang-btn {
  padding: 6px 12px;
  background: #f3f4f6;
  color: #6b7280;
  text-decoration: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s;
}


.lang-btn.active,
.lang-btn:hover {
  background: #2c5aa0;
  color: white;
}


/* Auth */
.auth-section {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 20px;
}


.auth-buttons {
  display: flex;
  gap: 10px;
}


.user-profile {
  position: relative;
  cursor: pointer;
}


.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}


.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #2c5aa0, #1e3a6f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
}


.user-name {
  font-weight: 500;
  color: #2c5aa0;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}


.dropdown-arrow {
  font-size: 12px;
  transition: transform 0.3s;
}


.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  min-width: 180px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  border-radius: 8px;
  z-index: 1001;
  margin-top: 10px;
}


.dropdown-divider {
  height: 1px;
  background: #eee;
  margin: 0;
}


.logout {
  color: #ef4444 !important;
  font-weight: 500;
}


.logout:hover {
  background: #fee2e2 !important;
}


.btn {
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  border: none;
  cursor: pointer;
}


.btn-secondary {
  color: #2c5aa0;
  border: 1px solid #2c5aa0;
  background: transparent;
}


.btn2 {
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


/* Mobile */
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
  
  .nav-main.mobile-open {
    display: flex;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .auth-section {
    margin-left: 10px;
  }
  
  .dropdown-menu,
  .dropdown-submenu-content {
    position: static !important;
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
    box-shadow: none !important;
    display: none;
  }
}
</style>