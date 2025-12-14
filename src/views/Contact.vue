<template>
  <div class="header-spacer"></div>
  <div class="contacts-page">
    <section class="contacts-hero">
      <div class="container">
        <h1>Свяжитесь с нами</h1>
        <p>Мы всегда рады ответить на ваши вопросы и помочь с любыми запросами. Свяжитесь с нами удобным для вас способом.</p>
      </div>
    </section>

    <!-- Contacts Content -->
    <section class="contacts-content">
      <div class="contacts-container">
        <div class="contact-info">
          <h2>Свяжитесь с нами</h2>
          <div class="contact-details">
            <div class="contact-item">
              <h3>Адрес</h3>
              <p>г. Астана, пр. Мангилик Ел, 55</p>
            </div>
            <div class="contact-item">
              <h3>Телефоны</h3>
              <p>+7 (777) 123-45-67</p>
            </div>
            <div class="contact-item">
              <h3>Электронная почта</h3>
              <p>info@kamp.kz</p>
            </div>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          
          <h3>Подписывайтесь на нас:</h3>
          <div class="social-links">
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/4138/4138124.png" width="50" alt="Facebook"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/3670/3670051.png" width="45" alt="Twitter"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/2111/2111646.png" width="45" alt="Telegram"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png" width="45" alt="LinkedIn"></a>
          </div>
        </div>
        
        <div class="contact-form">
          <h2>Отправьте сообщение</h2>
          <form @submit.prevent="submitForm" id="contactForm">
            <div class="form-group">
              <label for="name">Имя *</label>
              <input type="text" id="name" class="form-control" v-model="form.name" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" class="form-control" v-model="form.email" required>
            </div>
            
            <div class="form-row">
              <div class="form-group half">
                <label for="phone">Телефон</label>
                <input type="tel" id="phone" class="form-control" v-model="form.phone">
              </div>
              <div class="form-group half">
                <label for="company">Компания</label>
                <input type="text" id="company" class="form-control" v-model="form.company">
              </div>
            </div>
            
            <div class="form-group">
              <label for="subject">Тема *</label>
              <select id="subject" class="form-control" v-model="form.subject" required>
                <option value="" disabled selected>Выберите тему</option>
                <option value="membership">Вступление в ассоциацию</option>
                <option value="partnership">Партнерство</option>
                <option value="event">Мероприятия</option>
                <option value="training">Обучение</option>
                <option value="feedback">Обратная связь</option>
                <option value="other">Другое</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Сообщение *</label>
              <textarea id="message" class="form-control" v-model="form.message" required></textarea>
            </div>
            
            <div class="form-group checkbox">
              <input type="checkbox" id="agree" v-model="form.agree" required>
              <label for="agree">Я соглашаюсь с обработкой персональных данных</label>
            </div>
            
            <div class="privacy-notice">
              Отправляя форму, вы соглашаетесь на обработку ваших персональных данных KAMP в соответствии с Политикой конфиденциальности.
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <span class="spinner"></span> Отправка...
              </span>
              <span v-else>Отправить сообщение</span>
            </button>
          </form>
          
          <div v-if="isSubmitted" class="success-message">
            <div class="success-icon">✓</div>
            <div class="success-text">
              <strong>Спасибо!</strong> Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="map-container">
        <div class="city-map-layout">
          <div class="map-visual">
            <div class="interactive-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2503.215715402936!2d71.42796827662718!3d51.12821997172289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4245841d2d8a3b9d%3A0x873a3674d1c6d6a1!2z0L_RgNC-0YHQv9C10LrRgiDQnNCw0L3QuNC70LjQu9C40Log0K3QuywgNTUsINCQ0YHRgtCw0L3QsCwg0JDQtdC20LTRg9C90LDRgNC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgMDIwMDAw!5e0!3m2!1sru!2skz!4v1703412345678!5m2!1sru!2skz" 
                width="100%" 
                height="100%" 
                style="border:0; border-radius: 12px;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ContactsPage',
  setup() {
    const form = ref({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      agree: false
    })
    
    const isSubmitting = ref(false)
    const isSubmitted = ref(false)
    
    const submitForm = () => {
      isSubmitting.value = true
      
      setTimeout(() => {
        console.log('Form submitted:', form.value)
        isSubmitting.value = false
        isSubmitted.value = true
        
        form.value = {
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          agree: false
        }
        
        setTimeout(() => {
          isSubmitted.value = false
        }, 5000)
      }, 2000)
    }
    
    return {
      form,
      isSubmitting,
      isSubmitted,
      submitForm
    }
  }
}
</script>

<style scoped>
:root {
  --primary: #2c5aa0;
  --primary-light: #3a6bc8;
  --secondary: #f8f9fa;
  --accent: #ff6b35;
  --accent-light: #ff8a65;
  --dark: #2d3748;
  --light: #ffffff;
  --gray: #718096;
  --gradient: linear-gradient(135deg, #2c5aa0 0%, #3a6bc8 100%);
}

* {
  box-sizing: border-box;
}

.contacts-page {
  min-height: 100vh;
  padding-top: 90px;
}

/* Header Spacer */
.header-spacer {
  height: 90px;
  width: 100%;
}

@media (max-width: 1024px) {
  .contacts-page {
    padding-top: 80px;
  }
  
  .header-spacer {
    height: 80px;
  }
}

/* Contacts Hero Section */
.contacts-hero {
  background: var(--gradient);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
  margin-top: -100px;
}

.contacts-hero h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.contacts-hero p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Contacts Content */
.contacts-content {
  padding: 80px 0;
}

.contacts-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.contact-info h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  color: var(--primary);
}

.contact-details {
  margin-bottom: 40px;
}

.contact-item {
  margin-bottom: 25px;
}

.contact-item h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--dark);
}

.contact-item p {
  color: var(--gray);
  font-size: 1.1rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.social-links a:hover {
  transform: translateY(-3px);
}

/* Contact Form */
.contact-form {
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: var(--primary);
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-group.half {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--dark);
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
}

select.form-control {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%232c5aa0' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 12px;
  padding-right: 40px;
}

textarea.form-control {
  min-height: 150px;
  resize: vertical;
}

.form-group.checkbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.form-group.checkbox input[type="checkbox"] {
  margin-top: 3px;
  width: 18px;
  height: 18px;
  accent-color: var(--primary);
}

.privacy-notice {
  margin: 20px 0;
  font-size: 0.9rem;
  color: var(--gray);
  line-height: 1.5;
}

.submit-btn {
  background: var(--accent);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: var(--accent-light);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-message {
  margin-top: 25px;
  padding: 20px;
  background: #d1fae5;
  border: 1px solid #10b981;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.success-icon {
  width: 30px;
  height: 30px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.success-text {
  color: #065f46;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Map Section */
.map-section {
  padding: 60px 0;
}

.map-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.city-map-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

.map-visual {
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.interactive-map {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

/* Responsive */
@media (max-width: 1024px) {
  .contacts-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .contact-form {
    width: 100%;
    padding: 30px 20px;
  }
}

@media (max-width: 768px) {
  .contacts-hero {
    padding: 80px 0 60px;
  }
  
  .contacts-hero h1 {
    font-size: 2.2rem;
  }
  
  .contacts-hero p {
    font-size: 1rem;
  }
  
  .contacts-content {
    padding: 40px 0;
  }
  
  .form-row {
    flex-direction: column;
    gap: 20px;
  }
  
  .map-visual {
    height: 400px;
  }
}
</style>
