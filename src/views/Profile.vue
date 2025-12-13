<template>
  <div class="profile-page">
    <div class="profile-card">
      <h1>👤 Профиль пользователя</h1>
      <div v-if="user" class="user-info">
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
        <span class="role">{{ userRole }}</span>
        <button @click="startEdit" class="btn btn-primary">✏️ Редактировать</button>
      </div>
      
      <form v-else @submit.prevent="saveProfile" class="edit-form">
        <div class="form-group">
          <label>🖼️ Аватар (URL)</label>
          <input v-model="editForm.avatar" placeholder="https://i.imgur.com/abc.jpg">
          <small>Imgur, Unsplash или ui-avatars.com</small>
        </div>
        <div class="form-group">
          <label>👤 Имя</label>
          <input v-model="editForm.name" required>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">💾 Сохранить</button>
          <button type="button" @click="cancelEdit" class="btn btn-secondary">❌ Отмена</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const editing = ref(false)
const editForm = ref({ name: '', avatar: '' })
const user = ref(null)

const userInitial = computed(() => user.value?.name?.[0]?.toUpperCase() || 'U')
const userRole = computed(() => user.value?.role === 'admin' ? '👑 Админ' : '👤 Пользователь')

onMounted(() => {
  const data = localStorage.getItem('user')
  if (data) {
    user.value = JSON.parse(data)
  } else {
    router.push('/')
  }
})

const startEdit = () => {
  editForm.value.name = user.value.name || ''
  editForm.value.avatar = user.value.avatar || ''
  editing.value = true
}

const saveProfile = () => {  // ✅ УБРАЛИ async
  user.value.name = editForm.value.name
  user.value.avatar = editForm.value.avatar || null
  localStorage.setItem('user', JSON.stringify(user.value))
  window.dispatchEvent(new Event('storage'))
  editing.value = false
  alert('✅ Сохранено!')
}

const cancelEdit = () => {
  editing.value = false
}

const logout = () => {
  localStorage.clear()
  router.push('/')
}
</script>



<style scoped>
.profile-page{min-height:100vh;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;align-items:center;justify-content:center;padding:20px}
.profile-card{background:white;border-radius:20px;padding:40px;max-width:500px;width:100%;box-shadow:0 20px 40px rgba(0,0,0,.1)}
.profile-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px}
.profile-display{text-align:center}
.avatar-large{width:120px;height:120px;background:linear-gradient(135deg,#2c5aa0,#1e3a6f);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:3em;color:white;font-weight:700;overflow:hidden}
.avatar-large img{width:100%;height:100%;object-fit:cover}
.profile-display h2{margin:0 0 10px;color:#333;font-size:2em}
.profile-display p{color:#666;margin-bottom:15px;font-size:1.1em}
.role{display:inline-block;padding:10px 25px;border-radius:25px;font-weight:600;background:#d1fae5;color:#065f46;margin-bottom:25px}
.edit-form{background:#f8f9fa;padding:25px;border-radius:12px}
.form-group{margin-bottom:20px}
.form-group label{display:block;margin-bottom:8px;font-weight:600;color:#333}
.form-group input{width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:16px;transition:border-color .3s}
.form-group input:focus{outline:none;border-color:#2c5aa0}
small{color:#666;font-size:13px;display:block;margin-top:5px}
.form-actions{display:flex;gap:15px;margin-top:25px}
.btn{flex:1;padding:14px 24px;border-radius:10px;border:none;font-weight:600;cursor:pointer;transition:all .3s;font-size:16px}
.btn-primary{background:#2c5aa0;color:white}
.btn-secondary{background:#6b7280;color:white}
.btn-danger{background:#ef4444;color:white}
.btn:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(0,0,0,.2)}
</style>
