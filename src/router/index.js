import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import About from '../views/About.vue'
import ActivitiesPage from '@/views/ActivitiesPage.vue' 
import CharterPage from '@/views/CharterPage.vue'
import DetailNews from '@/views/DetailNews.vue'
import Exhibitions from '@/views/Exhibitions.vue'
import Experts from '@/views/Experts.vue'
import Seminars from '@/views/Seminars.vue'
import NotFound from '@/views/NotFound.vue'
import Library from '@/views/Library.vue'
import Contact from '@/views/Contact.vue'
import Brief from '@/templates/Brief.vue'
import Powerpoint from '@/templates/Powerpoint.vue'
import Question from '@/templates/Question.vue'
import MarketAnalysis from '@/templates/MarketAnalysis.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/news', name: 'News', component: News },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/activities', name: 'Activities', component: ActivitiesPage },
  { path: '/charter', name: 'CharterPage', component: CharterPage },
  { path: '/DetailNews', name: 'DetailNews', component: DetailNews },
  { path: '/exhibitions', name: 'Exhibitions', component: Exhibitions },
  { path: '/experts', name: 'Experts', component: Experts },
  { path: '/seminars', name: 'Seminars', component: Seminars },
  { path: '/library', name: 'Library', component: Library },
  { path: '/notfound', name: 'NotFound', component: NotFound },
  
  // Шаблоны
  { path: '/brief', name: 'Brief', component: Brief },
  { path: '/powerpoint', name: 'Powerpoint', component: Powerpoint },
  { path: '/question', name: 'Question', component: Question },
  { path: '/marketing-analysis', name: 'MarketAnalysis', component: MarketAnalysis },
  
  // Новые страницы с ленивой загрузкой
  { 
    path: '/login', 
    name: 'Login', 
    component: () => import('@/views/Login.vue'),
    meta: { public: true } 
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true } 
  },
  { 
    path: '/profile', 
    name: 'Profile', 
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true } 
  },
  { 
    path: '/admin', 
    name: 'AdminPanel', 
    component: () => import('@/views/AdminPanel.vue'),
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  { 
    path: '/marketing-plan', 
    name: 'MarketingPlan', 
    component: () => import('@/templates/MarketingPlan.vue'),
    meta: { requiresAuth: false } 
  },
  
  // 404
  { path: '/:pathMatch(.*)*', redirect: '/notfound' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Навигационный guard
router.beforeEach(async (to, from, next) => {
  // Динамический импорт чтобы избежать циклических зависимостей
  const { useAuthStore } = await import('@/stores/auth')
  const authStore = useAuthStore()
  
  // Проверяем, публичный ли роут
  if (to.meta.public) {
    return next()
  }
  
  // Проверяем, требуется ли аутентификация
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ 
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
  
  // Проверяем, требуется ли админ
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return next('/dashboard')
  }
  
  next()
})

export default router