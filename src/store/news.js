import { defineStore } from 'pinia'

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: []  // Загружаем с API
  }),
  
  actions: {
    async fetchNews() {
      const res = await fetch('/api/news')
      this.news = await res.json()
    },
    
    async createNews(newsData) {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newsData)
      })
      const newNews = await res.json()
      this.news.unshift(newNews)
    }
  }
})
