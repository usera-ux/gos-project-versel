import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTemplatesStore = defineStore('templates', () => {
  const templates = ref(JSON.parse(localStorage.getItem('templates')) || [
    {
      id: 1,
      name: 'Бриф',
      category: 'Маркетинг',
      path: '/templates/brief',
      description: 'Шаблон для сбора информации о проекте'
    },
    {
      id: 2,
      name: 'Презентация',
      category: 'Презентации',
      path: '/templates/powerpoint',
      description: 'Шаблон для создания презентаций'
    }
  ])

  const categories = computed(() => {
    const cats = [...new Set(templates.value.map(t => t.category))]
    return cats
  })

  const addTemplate = (template) => {
    const newTemplate = {
      ...template,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    
    templates.value.push(newTemplate)
    saveToLocalStorage()
  }

  const updateTemplate = (id, updates) => {
    const index = templates.value.findIndex(t => t.id === id)
    if (index !== -1) {
      templates.value[index] = { ...templates.value[index], ...updates }
      saveToLocalStorage()
    }
  }

  const deleteTemplate = (id) => {
    templates.value = templates.value.filter(t => t.id !== id)
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('templates', JSON.stringify(templates.value))
  }

  return {
    templates,
    categories,
    addTemplate,
    updateTemplate,
    deleteTemplate
  }
})