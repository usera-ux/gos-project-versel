<template>
  <div class="profile-layout mt-5">
    <aside class="profile-sidebar">
      <nav class="side-nav">
        <div class="side-section-title">Settings</div>

        <button
          class="side-item"
          :class="{ active: activeTab === 'profile' }"
          @click="activeTab = 'profile'"
        >
          <span>Profile Settings</span>
        </button>

        <button
          class="side-item"
          :class="{ active: activeTab === 'password' }"
          @click="activeTab = 'password'"
        >
          <span>Password</span>
        </button>

        <button
          class="side-item"
          :class="{ active: activeTab === 'booking' }"
          @click="activeTab = 'booking'"
        >
          <span>Бронирование</span>
        </button>

        <!-- НОВАЯ ВКЛАДКА ИСТОРИЯ -->
        <button
          class="side-item"
          :class="{ active: activeTab === 'bookings-history' }"
          @click="activeTab = 'bookings-history'"
        >
          <span>Мои бронирования</span>
        </button>

        <button class="side-item logout" @click="logout">
          <span>Log out</span>
        </button>
      </nav>
    </aside>

    <main class="profile-main">
      <header class="profile-top">
        <h1>
          {{ activeTab === 'profile' ? 'Profile Settings' : 
             activeTab === 'password' ? 'Change Password' : 
             activeTab === 'booking' ? 'Бронирование услуг' :
             'Мои бронирования' }}
        </h1>
      </header>

      <section class="profile-content">
        <!-- ПРОФИЛЬ -->
        <template v-if="activeTab === 'profile'">
          <div class="profile-header-row">
            <div class="avatar-wrapper">
              <div class="avatar-circle">
                <img v-if="editForm.avatar" :src="editForm.avatar" alt="Avatar" />
                <span v-else>{{ userInitial }}</span>
              </div>
              <div class="avatar-actions">
                <label class="btn btn-primary small">
                  Upload New
                  <input 
                    type="file" 
                    class="hidden-input" 
                    accept="image/*"
                    @change="onAvatarChange"
                  />
                </label>
                <button 
                  class="btn btn-secondary small" 
                  @click="clearAvatar"
                  :disabled="!editForm.avatar"
                >
                  Delete avatar
                </button>
              </div>
            </div>
          </div>

          <form class="profile-form" @submit.prevent="saveProfile">
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input v-model="editForm.firstName" type="text" placeholder="First name" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input v-model="editForm.lastName" type="text" placeholder="Last name" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Email</label>
                <input v-model="editForm.email" type="email" placeholder="example@gmail.com" />
              </div>
              <div class="form-group">
                <label>Mobile Number</label>
                <input v-model="editForm.phone" type="tel" placeholder="+7 ___ ___ __ __" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full">
                <label>Residential Address</label>
                <input v-model="editForm.address" type="text" placeholder="Street, city" />
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </template>

        <!-- ПАРОЛЬ -->
        <template v-else-if="activeTab === 'password'">
          <form class="profile-form" @submit.prevent="changePassword">
            <div class="form-row">
              <div class="form-group full">
                <label>Current password</label>
                <input v-model="passwordForm.current" type="password" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group full">
                <label>New password</label>
                <input 
                  v-model="passwordForm.newPass" 
                  type="password" 
                  required 
                  minlength="6"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group full">
                <label>Confirm new password</label>
                <input v-model="passwordForm.confirm" type="password" required />
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Change password</button>
            </div>
          </form>
        </template>

        <!-- БРОНИРОВАНИЕ -->
        <template v-else-if="activeTab === 'booking'">
          <div class="booking-section">
            <div class="booking-header">
              <h3>Выберите услугу</h3>
              <p>Забронируйте видеоурок или консультацию</p>
            </div>

            <div class="services-grid">
              <div class="service-card" @click="selectService('video-lesson')">
                <div class="service-icon"><img src="https://plus.unsplash.com/premium_photo-1663013500813-328e1ab77be7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b25saW5lJTIwZWR1Y2F0aW9ufGVufDB8fDB8fHww" width="400px" alt=""></div>
                <h4>Видеоуроки</h4>
                <p>Получите доступ к обучающим видеоурокам</p>
                <div class="service-price">от 5000₸ / урок</div>
                <div class="service-duration">30-60 мин</div>
              </div>

              <div class="service-card" @click="selectService('consultation')">
                <div class="service-icon"><img src="https://images.unsplash.com/photo-1580894732930-0babd100d356?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlYWNoZXIlMjBhbmQlMjBzdHVkZW50fGVufDB8fDB8fHww" width="400px" alt=""></div>
                <h4>Индивидуальная консультация</h4>
                <p>Личная консультация с экспертом</p>
                <div class="service-price">от 10000₸ / час</div>
                <div class="service-duration">60 мин</div>
              </div>
              
            </div>

            <div v-if="selectedService" class="booking-form-wrapper">
              <div class="selected-service">
                <h4>Бронирование: {{ selectedService.title }}</h4>
                <div class="service-details">
                  <span class="service-price">{{ selectedService.price }}</span>
                  <span class="service-duration">{{ selectedService.duration }}</span>
                </div>
              </div>

              <form @submit.prevent="bookService" class="booking-form">
                <div class="form-row">
                  <div class="form-group">
                    <label>Дата</label>
                    <input 
                      v-model="bookingForm.date" 
                      type="date" 
                      required 
                      :min="minDate"
                    />
                  </div>
                  <div class="form-group">
                    <label>Время</label>
                    <select v-model="bookingForm.time" required>
                      <option value="">Выберите время</option>
                      <option v-for="time in availableTimes" :key="time" :value="time">
                        {{ time }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group full">
                  <label>Комментарий (необязательно)</label>
                  <textarea 
                    v-model="bookingForm.comment" 
                    placeholder="Дополнительная информация..."
                    rows="3"
                  ></textarea>
                </div>

                <div class="form-actions">
                  <button type="button" @click="cancelBooking" class="btn btn-secondary">
                    Отмена
                  </button>
                  <button type="submit" class="btn btn-primary">
                    {{ bookingLoading ? 'Бронируем...' : 'Забронировать' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </template>

        <!-- ИСТОРИЯ БРОНИРОВАНИЙ -->
        <template v-else-if="activeTab === 'bookings-history'">
          <div class="bookings-history">
            <div class="history-header">
              <h3>Мои бронирования</h3>
              <p>Все ваши записи на услуги</p>
            </div>

            <div v-if="userBookings.length === 0" class="empty-state">
              <div class="empty-icon">📅</div>
              <h4>Пока нет бронирований</h4>
              <p>Забронируйте услугу в разделе "Бронирование"</p>
              <button class="btn btn-primary" @click="activeTab = 'booking'">
                Забронировать сейчас
              </button>
            </div>

            <div v-else class="bookings-list">
              <div 
                v-for="booking in userBookings" 
                :key="booking.id" 
                class="booking-item"
                :class="{ 'cancelled': booking.status === 'cancelled' }"
              >
                <div class="booking-header">
                  <div class="booking-info">
                    <span class="service">{{ booking.service }}</span>
                    <span class="date-time">{{ formatDate(booking.date) }} {{ booking.time }}</span>
                  </div>
                  <span class="status" :class="getStatusClass(booking.status)">
                    {{ getStatusText(booking.status) }}
                  </span>
                </div>
                
                <div class="booking-details">
                  <div class="price">{{ booking.price }}</div>
                  <div v-if="booking.comment" class="comment">
                    Комментарий: {{ booking.comment }}
                  </div>
                  <div class="created">{{ formatTime(booking.createdAt) }}</div>
                </div>

                <div class="booking-actions" v-if="booking.status === 'pending'">
                  <button class="btn btn-secondary small" @click="cancelBookingItem(booking.id)">
                    Отменить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)
const activeTab = ref('profile')

// ПРОФИЛЬ
const editForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  avatar: ''
})

const passwordForm = ref({
  current: '',
  newPass: '',
  confirm: ''
})

const userInitial = computed(() => {
  const name = editForm.value.firstName || user.value?.name || user.value?.firstName
  return name ? name[0].toUpperCase() : 'U'
})

// БРОНИРОВАНИЕ
const selectedService = ref(null)
const bookingForm = ref({
  date: '',
  time: '',
  comment: ''
})
const bookingLoading = ref(false)

const minDate = computed(() => {
  const today = new Date()
  today.setDate(today.getDate() + 1)
  return today.toISOString().split('T')[0]
})

const availableTimes = ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

const services = {
  'video-lesson': {
    title: 'Видеоурок',
    price: '5000₸',
    duration: '45 мин'
  },
  'consultation': {
    title: 'Консультация',
    price: '10000₸',
    duration: '60 мин'
  }
}

// ИСТОРИЯ БРОНИРОВАНИЙ
const userBookings = ref([])

const loadBookings = () => {
  const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]')
  // Фильтруем только бронирования текущего пользователя
  userBookings.value = bookings.filter(b => b.userId === user.value?.id)
}

onMounted(() => {
  const data = localStorage.getItem('user')
  if (!data) {
    router.push('/')
    return
  }

  user.value = JSON.parse(data)
  editForm.value.firstName = user.value.firstName || user.value.name || ''
  editForm.value.lastName = user.value.lastName || ''
  editForm.value.email = user.value.email || ''
  editForm.value.phone = user.value.phone || ''
  editForm.value.address = user.value.address || ''
  editForm.value.avatar = user.value.avatar || ''
  
  loadBookings()
})

// ФУНКЦИИ ПРОФИЛЯ
const onAvatarChange = (event) => {
  const file = event.target.files?.[0]
  if (!file || !file.type.startsWith('image/')) {
    alert('Выберите изображение')
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    editForm.value.avatar = e.target.result
  }
  reader.readAsDataURL(file)
}

const clearAvatar = () => {
  editForm.value.avatar = ''
}

const saveProfile = () => {
  if (!user.value) return
  user.value = {
    ...user.value,
    firstName: editForm.value.firstName,
    lastName: editForm.value.lastName,
    name: editForm.value.firstName || user.value.name, 
    email: editForm.value.email,
    phone: editForm.value.phone,
    address: editForm.value.address,
    avatar: editForm.value.avatar
  }
  localStorage.setItem('user', JSON.stringify(user.value))
  window.dispatchEvent(new CustomEvent('user-updated'))
  alert('✅ Профиль сохранён')
}

const changePassword = () => {
  if (passwordForm.value.newPass !== passwordForm.value.confirm) {
    alert('Пароли не совпадают')
    return
  }
  if (passwordForm.value.newPass.length < 6) {
    alert('Новый пароль должен содержать минимум 6 символов')
    return
  }
  alert('Пароль обновлён')
  passwordForm.value.current = ''
  passwordForm.value.newPass = ''
  passwordForm.value.confirm = ''
}

// ФУНКЦИИ БРОНИРОВАНИЯ
const selectService = (serviceKey) => {
  selectedService.value = services[serviceKey]
  bookingForm.value.date = ''
  bookingForm.value.time = ''
}

const cancelBooking = () => {
  selectedService.value = null
  bookingForm.value = { date: '', time: '', comment: '' }
}

const bookService = async () => {
  if (!selectedService.value || !user.value) return

  bookingLoading.value = true

  const bookingData = {
    id: Date.now().toString(36),
    userId: user.value.id,
    userName: user.value.name || user.value.firstName,
    service: selectedService.value.title,
    price: selectedService.value.price,
    date: bookingForm.value.date,
    time: bookingForm.value.time,
    comment: bookingForm.value.comment,
    status: 'pending',
    createdAt: new Date().toISOString()
  }

  let bookings = JSON.parse(localStorage.getItem('userBookings') || '[]')
  bookings.push(bookingData)
  localStorage.setItem('userBookings', JSON.stringify(bookings))
  
  loadBookings() // Обновляем список
  
  alert(`✅ Забронировано!\n${selectedService.value.title}\n${bookingForm.value.date} ${bookingForm.value.time}`)
  cancelBooking()
  bookingLoading.value = false
}

// ФУНКЦИИ ИСТОРИИ
const getStatusClass = (status) => {
  return {
    pending: 'status-pending',
    completed: 'status-completed',
    cancelled: 'status-cancelled'
  }[status] || ''
}

const getStatusText = (status) => {
  return {
    pending: 'Ожидает',
    completed: 'Завершено',
    cancelled: 'Отменено'
  }[status] || status
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  })
}

const formatTime = (dateStr) => {
  const date = new Date(dateStr)
  return `Создано ${date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'short', 
    hour: '2-digit', 
    minute: '2-digit' 
  })}`
}

const cancelBookingItem = (bookingId) => {
  if (confirm('Отменить бронирование?')) {
    let bookings = JSON.parse(localStorage.getItem('userBookings') || '[]')
    bookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' } : b
    )
    localStorage.setItem('userBookings', JSON.stringify(bookings))
    loadBookings()
  }
}

const logout = () => {
  localStorage.clear()
  router.push('/')
}
</script>

<style scoped>
/* ========================================
   ✅ ПОЛНЫЕ СТИЛИ - ВСЕ В ОДНОМ МЕСТЕ
   ======================================== */

/* ОСНОВНОЙ ЛЭЙАУТ */
.profile-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fb;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

.profile-sidebar {
  width: 240px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.side-section-title {
  margin: 10px 4px 16px 4px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
  font-weight: 500;
}

.side-item {
  border: none;
  background: transparent;
  text-align: left;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.15s ease;
  width: 100%;
}

.side-item:hover {
  background: #f3f4f6;
  color: #1d4ed8;
}

.side-item.active {
  background: #e0e7ff;
  color: #1d4ed8;
  font-weight: 600;
}

.side-item.logout {
  margin-top: auto;
  color: #dc2626;
  margin-top: 20px;
}

.side-item.logout:hover {
  background: #fef2f2;
  color: #dc2626;
}

/* ГЛАВНАЯ ОБЛАСТЬ */
.profile-main {
  flex: 1;
  padding: 24px;
  overflow: auto;
  background: #f5f7fb;
}

.profile-top {
  margin-bottom: 24px;
}

.profile-top h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: #111827;
}

.profile-content {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 100%;
  overflow: hidden;
}

/* АВАТАР И ПРОФИЛЬ */
.profile-header-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f3f4f6;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 24px;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: #6b7280;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ФОРМЫ */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group.full {
  flex-basis: 100%;
  min-width: 100%;
}

.form-group label {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  border-radius: 8px;
  border: 1px solid #d1d5db;
  padding: 12px 16px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  background: #ffffff;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

/* КНОПКИ */
.btn {
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn.small {
  font-size: 13px;
  padding: 8px 16px;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.form-actions {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.hidden-input {
  display: none;
}

/* БРОНИРОВАНИЕ */
.booking-section {
  max-width: 900px;
}

.booking-header {
  text-align: center;
  margin-bottom: 40px;
}

.booking-header h3 {
  font-size: 28px;
  margin-bottom: 8px;
  color: #111827;
  font-weight: 700;
}

.booking-header p {
  color: #6b7280;
  font-size: 16px;
  margin: 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.service-card {
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 32px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.service-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
  transform: translateY(-8px);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-icon {
  font-size: 56px;
  margin-bottom: 20px;
  display: block;
}

.service-card h4 {
  font-size: 22px;
  margin-bottom: 12px;
  color: #111827;
  font-weight: 700;
}

.service-card p {
  color: #6b7280;
  margin-bottom: 20px;
  line-height: 1.6;
}

.service-price {
  font-size: 24px;
  font-weight: 800;
  color: #059669;
  margin-bottom: 4px;
}

.service-duration {
  color: #9ca3af;
  font-size: 15px;
  font-weight: 500;
}

.booking-form-wrapper {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
}

.selected-service {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #e5e7eb;
}

.selected-service h4 {
  margin-bottom: 12px;
  color: #111827;
  font-size: 22px;
  font-weight: 700;
}

.service-details {
  display: flex;
  gap: 20px;
  font-size: 15px;
  color: #6b7280;
}

/* ИСТОРИЯ БРОНИРОВАНИЙ */
.bookings-history {
  max-width: 900px;
}

.history-header {
  text-align: center;
  margin-bottom: 40px;
}

.empty-state {
  text-align: center;
  padding: 80px 40px;
  color: #6b7280;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 24px;
  display: block;
  opacity: 0.5;
}

.empty-state h4 {
  font-size: 22px;
  margin-bottom: 12px;
  color: #374151;
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.booking-item {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px;
  transition: all 0.2s ease;
  position: relative;
}

.booking-item.cancelled {
  opacity: 0.7;
  background: #fef2f2;
  border-color: #fecaca;
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 16px;
}

.booking-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.service {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.date-time {
  font-size: 16px;
  color: #6b7280;
  font-weight: 500;
}

.status {
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: fit-content;
}

.status-pending {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #d97706;
}

.status-completed {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #059669;
}

.status-cancelled {
  background: linear-gradient(135deg, #fecaca, #fca5a5);
  color: #dc2626;
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #f3f4f6;
  margin-top: 20px;
}

.price {
  font-size: 20px;
  font-weight: 800;
  color: #059669;
}

.comment {
  font-size: 15px;
  color: #374151;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.created {
  font-size: 13px;
  color: #9ca3af;
  font-style: italic;
}

.booking-actions {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f3f4f6;
  text-align: right;
}

/* АДАПТИВНОСТЬ */
@media (max-width: 1024px) {
  .profile-layout {
    flex-direction: column;
    padding: 16px;
  }
  
  .profile-sidebar {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    padding: 16px;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .side-nav {
    flex-direction: row;
    gap: 8px;
  }
  
  .side-item {
    white-space: nowrap;
    padding: 12px 20px;
    flex-shrink: 0;
  }
  
  .profile-main {
    padding: 16px;
  }
  
  .profile-content {
    padding: 24px;
  }
}

@media (max-width: 768px) {
  .form-row,
  .booking-header,
  .service-details {
    flex-direction: column;
    gap: 16px;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .form-group {
    min-width: 100%;
  }
  
  .profile-content {
    padding: 20px;
    margin: 0;
    border-radius: 12px;
  }
}

@media (max-width: 480px) {
  .profile-layout {
    padding: 12px;
  }
  
  .profile-content {
    padding: 16px;
  }
}
</style>
