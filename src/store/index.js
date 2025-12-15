import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    language: 'ru',
    showWelcome: !localStorage.getItem('hasSeenWelcome'),
    pollVotes: {
      option1: 42,
      option2: 28,
      option3: 18,
      option4: 12
    },
    userVoted: false
  }),
  actions: {
    setLanguage(lang) {
      this.language = lang
      localStorage.setItem('language', lang)
    },
    hideWelcome() {
      this.showWelcome = false
      localStorage.setItem('hasSeenWelcome', 'true')
    },
    voteInPoll(option) {
      if (this.userVoted) return
      
   
      this.pollVotes[`option${option}`] += 1
      this.userVoted = true
      

      this.updatePercentages()
    },
    updatePercentages() {
      const total = Object.values(this.pollVotes).reduce((a, b) => a + b, 0)
      
    }
  },
  getters: {
    getPollResults: (state) => {
      const total = Object.values(state.pollVotes).reduce((a, b) => a + b, 0)
      return Object.entries(state.pollVotes).map(([key, value]) => ({
        option: key.replace('option', ''),
        votes: value,
        percentage: total > 0 ? Math.round((value / total) * 100) : 0
      }))
    }
  }
})