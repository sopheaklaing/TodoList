<template>
  <transition name="slide-bar">
    <div class="bulk-bar" v-if="ui.selectMode">
      <span class="bulk-count"><CheckCircle2 :size="15" /> {{ ui.selectedIds.size }} selected</span>
      <div class="bulk-actions">
        <button class="bulk-complete" @click="ui.bulkComplete" :disabled="!ui.selectedIds.size"><CheckCheck :size="14" /> Complete</button>
        <button class="bulk-delete" @click="ui.bulkDelete" :disabled="!ui.selectedIds.size"><Trash2 :size="14" /> Delete</button>
        <button class="bulk-cancel" @click="ui.cancelSelection"><X :size="14" /> Cancel</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { CheckCircle2, CheckCheck, Trash2, X } from 'lucide-vue-next'
import '@/assets/scss/components/BulkBar.scss'
const props = defineProps({ ui: Object })
</script>
<!-- <style scoped>
.bulk-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: #eef2ff;
  border: 1.5px solid #c7d2fe;
  border-radius: 12px;
}

.bulk-count {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  color: #4338ca;
  font-size: 0.875rem;
}

.bulk-actions {
  display: flex;
  gap: 8px;
}

.bulk-actions button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.bulk-complete {
  background: #10b981;
  color: #fff;
  border: none;
}

.bulk-complete:hover:not(:disabled) {
  background: #059669;
}

.bulk-delete {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.bulk-delete:hover:not(:disabled) {
  background: #fecaca;
}

.bulk-cancel {
  background: #fff;
  color: #4a5568;
  border: 1.5px solid #e2e8f0;
}

.bulk-cancel:hover {
  background: #f7fafc;
}

.bulk-actions button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.slide-bar-enter-active,
.slide-bar-leave-active {
  transition: all 0.22s ease;
}

.slide-bar-enter-from,
.slide-bar-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Tablet */
@media (max-width: 1024px) {
  .bulk-bar {
    padding: 10px 14px;
  }

  .bulk-count {
    font-size: 0.8rem;
  }

  .bulk-actions button {
    padding: 5px 12px;
    font-size: 0.75rem;
  }

  .bulk-actions {
    gap: 6px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .bulk-bar {
    flex-direction: column;
    padding: 10px 12px;
    gap: 10px;
  }

  .bulk-count {
    font-size: 0.75rem;
    width: 100%;
  }

  .bulk-actions {
    width: 100%;
    gap: 4px;
  }

  .bulk-actions button {
    padding: 6px 10px;
    font-size: 0.7rem;
    flex: 1;
  }

  .bulk-actions button svg {
    width: 12px;
    height: 12px;
  }
}
</style> -->