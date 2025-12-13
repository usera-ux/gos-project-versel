// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import About from '../views/About.vue'
import ActivitiesPage from '../views/ActivitiesPage.vue'
import CharterPage from '../views/CharterPage.vue'
import DetailNews from '../views/DetailNews.vue'
import Exhibitions from '../views/Exhibitions.vue'
import Experts from '../views/Experts.vue'
import Seminars from '../views/Seminars.vue'
import NotFound from '../views/NotFound.vue'
import Library from '../views/Library.vue'
import Contact from '../views/Contact.vue'
import Brief from '../templates/Brief2.vue'
import Powerpoint from '../templates/Powerpoint.vue'
import Question from '../templates/Question.vue'
import MarketAnalysis from '../templates/MarketAnalysis.vue'
import Brief2 from '../templates/Brief2.vue'

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
  { path: '/notfound', name: 'NotFound', component: NotFound },
  { path: '/library', name: 'Library', component: Library },
  { path: '/powerpoint', name: 'Powerpoint', component: Powerpoint },
  { path: '/question', name: 'Question', component: Question },
  { path: '/marketing-analysis', name: 'MarketAnalysis', component: MarketAnalysis },
  { path: '/brief', name: 'Brief', component:Brief2 },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/notfound'
  },
  // Добавьте в конец routes массива ДО catch-all:
{
  path: '/admin',
component: () => import('../views/admin/AdminLayout.vue'),
  children: [
    { path: '', component: () => import('../views/admin/Dashboard.vue') },
    { path: 'news', component: () => import('../views/admin/NewsManager.vue') },
    { path: 'users', component: () => import('../views/admin/UsersManager.vue') },
    { path: 'events', component: () => import('../views/admin/EventsManager.vue') }
  ]
},
{ path: '/login', name: 'Login', component: () => import('../views/admin/Login.vue') },
{ path: '/register', name: 'Register', component: () => import('../views/admin/Register.vue') },
{ path: '/profile', name: 'Profile', component: () => import('../views/Profile.vue') },


]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ ПРОСТАЯ защита БЕЗ Pinia (пока)
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (to.path.startsWith('/admin') && (!user || user.role !== 'admin')) {
    next('/login')
  } else {
    next()
  }
})
// router/index.js
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})



export default router