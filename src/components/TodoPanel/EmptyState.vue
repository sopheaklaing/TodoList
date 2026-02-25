<template>
  <div class="empty-state" v-if="!plan">
    <div class="empty-icon-wrap alt">
      <FolderOpen :size="36" />
    </div>
    <p class="empty-title">No plan selected</p>
    <span class="empty-sub">Pick a plan from the sidebar to get started</span>
  </div>
  <div v-else class="empty-state select-plan-state">
    <div class="empty-icon-wrap">
      <ClipboardList :size="36" />
    </div>
    <p class="empty-title">Nothing here yet</p>
    <span class="empty-sub">Start adding todos to track your progress</span>
    <button class="empty-add-btn" @click="emit('add-todo')">
      <Plus :size="15" /> Add your first todo
    </button>
  </div>
</template>

<script setup>
import '@/assets/scss/components/EmptyState.scss'
import { Plus, ClipboardList, FolderOpen } from 'lucide-vue-next'
const props = defineProps({ plan: Object })
const emit = defineEmits(['add-todo'])
</script>
<!-- 
<style scoped>
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
}

.empty-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: linear-gradient(135deg, #eef2ff, #f5f3ff);
  border: 1.5px solid #c7d2fe;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  margin-bottom: 4px;
}

.empty-icon-wrap.alt {
  background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
  border-color: #a7f3d0;
  color: #10b981;
}

.empty-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.empty-sub {
  font-size: 0.875rem;
  color: #a0aec0;
  text-align: center;
  max-width: 260px;
}

.empty-add-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 8px;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.empty-add-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

/* Tablet */
@media (max-width: 1024px) {
  .empty-icon-wrap {
    width: 64px;
    height: 64px;
  }

  .empty-icon-wrap svg {
    width: 32px;
    height: 32px;
  }

  .empty-title {
    font-size: 1rem;
  }

  .empty-sub {
    font-size: 0.8rem;
  }

  .empty-add-btn {
    font-size: 0.8rem;
    padding: 8px 16px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .empty-state {
    padding: 40px 16px;
  }

  .empty-icon-wrap {
    width: 56px;
    height: 56px;
  }

  .empty-icon-wrap svg {
    width: 28px;
    height: 28px;
  }

  .empty-title {
    font-size: 0.95rem;
  }

  .empty-sub {
    font-size: 0.75rem;
    max-width: 240px;
  }

  .empty-add-btn {
    font-size: 0.75rem;
    padding: 8px 14px;
    gap: 5px;
  }

  .empty-add-btn svg {
    width: 14px;
    height: 14px;
  }
}</style> -->