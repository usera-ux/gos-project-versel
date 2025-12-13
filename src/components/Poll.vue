<template>
  <section class="poll-section py-5">
    <div class="container">
      <div class="compact-poll bg-white rounded-lg shadow-lg p-4">
        <div class="poll-header d-flex align-items-center mb-4">
          <div class="poll-icon d-flex align-items-center justify-content-center bg-primary text-white rounded-circle me-3" style="width: 40px; height: 40px;">
            ?
          </div>
          <h3 class="poll-question mb-0 h5">Какая тема для вас наиболее актуальна в ближайшее время?</h3>
        </div>
        
        <div class="poll-options">
          <div 
            v-for="option in pollOptions" 
            :key="option.id"
            class="poll-option d-flex align-items-center p-3 mb-2 rounded border"
            :class="{ 'selected': selectedOption === option.id, 'disabled': hasVoted }"
            @click="selectOption(option.id)"
          >
            <div class="option-check me-3">
              <i v-if="selectedOption === option.id" class="bi bi-check-circle-fill text-primary"></i>
              <i v-else class="bi bi-square"></i>
            </div>
            <span>{{ option.text }}</span>
          </div>
        </div>
        
        <div class="poll-footer mt-4">
          <button 
            class="poll-btn btn btn-primary w-25"
            :disabled="!selectedOption || hasVoted"
            @click="submitVote"
          >
            {{ hasVoted ? '✓ Голос учтен' : 'Голосовать' }}
          </button>
        </div>
        
        <div v-if="hasVoted" class="poll-results mt-4">
          <div v-for="result in pollResults" :key="result.option" class="result-item mb-3">
            <div class="result-bar bg-light rounded" style="height: 10px;">
              <div 
                class="result-fill bg-primary rounded" 
                :style="{ width: result.percentage + '%' }"
                style="height: 10px; transition: width 1s ease;"
              ></div>
            </div>
            <div class="result-label d-flex justify-content-between mt-2">
              <span>{{ getOptionText(result.option) }}</span>
              <span class="fw-bold">{{ result.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useMainStore } from '../store'

export default {
  name: 'Poll',
  setup() {
    const store = useMainStore()
    const selectedOption = ref(null)
    const hasVoted = ref(false)
    
    const pollOptions = [
      { id: 1, text: 'Разработка стратегии и плана маркетинга' },
      { id: 2, text: 'Как стать эффективным директором по маркетингу?' },
      { id: 3, text: 'Организация эффективных деловых мероприятий своими силами' },
      { id: 4, text: 'Маркетинговые исследования своими силами от А до Я' }
    ]
    
    const pollResults = computed(() => store.getPollResults)
    
    const selectOption = (optionId) => {
      if (hasVoted.value) return
      selectedOption.value = optionId
    }
    
    const submitVote = () => {
      if (selectedOption.value && !hasVoted.value) {
        store.voteInPoll(selectedOption.value)
        hasVoted.value = true
      }
    }
    
    const getOptionText = (optionNumber) => {
      const option = pollOptions.find(opt => opt.id === parseInt(optionNumber))
      return option ? option.text : ''
    }
    
    return {
      selectedOption,
      hasVoted,
      pollOptions,
      pollResults,
      selectOption,
      submitVote,
      getOptionText
    }
  }
}
</script>

<style scoped>
.poll-section {
  color: white;
}

.compact-poll {
  background: white !important;
  color: #333;
}

.poll-option {
  cursor: pointer;
  transition: all 0.3s ease;
}

.poll-option:hover:not(.disabled) {
  background: #f8f9fa;
  border-color: #667eea !important;
}

.poll-option.selected {
  border-color: #667eea !important;
  background: rgba(102, 126, 234, 0.1);
}
.poll-btn{
  width: 100px;
}

.poll-option.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.poll-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-bar {
  overflow: hidden;
}
</style>