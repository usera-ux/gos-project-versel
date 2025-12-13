// src/api/admin.js
const API_URL = 'http://localhost:3001'

export const adminAPI = {
  // Templates
  async getTemplates() {
    const response = await fetch(`${API_URL}/templates`)
    return await response.json()
  },
  
  async createTemplate(template) {
    const response = await fetch(`${API_URL}/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(template)
    })
    return await response.json()
  },
  
  async updateTemplate(id, template) {
    const response = await fetch(`${API_URL}/templates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(template)
    })
    return await response.json()
  },
  
  async deleteTemplate(id) {
    const response = await fetch(`${API_URL}/templates/${id}`, {
      method: 'DELETE'
    })
    return await response.json()
  },
  
  // Users
  async getUsers() {
    const response = await fetch(`${API_URL}/users`)
    return await response.json()
  },
  
  async updateUser(id, user) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  },
  
  // Stats
  async getStats() {
    // Можно получать из API или считать локально
    return {
      users: 42,
      templates: 24,
      downloads: 156,
      activity: 7
    }
  }
}