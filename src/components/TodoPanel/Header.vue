<template>
  <div class="panel-header">
    <div class="header-left">
      <div class="plan-badge"><CheckSquare :size="16" /></div>
      <div>
        <p class="plan-label">Active Plan</p>
        <h2>{{ plan.name }}</h2>
      </div>
    </div>
    <div class="header-actions">
      <button class="select-btn"
        :class="{ active: ui.selectMode }"
        :disabled="ui.selectMode && ui.selectedIds.size === 0"
        @click="ui.selectMode ? ui.openBulkActions() : ui.toggleSelectMode()"
      >
        <component :is="ui.selectMode ? Zap : Layers" :size="15" />
        {{ ui.selectMode ? `Act on ${ui.selectedIds.size}` : 'Select' }}
      </button>
      <button class="add-btn" @click="ui.openTodoModal()">
        <Plus :size="16" /> Add Todo
      </button>
    </div>
  </div>
</template>

<script setup>
import '@/assets/scss/components/TodoPanelHeader.scss';
import { Plus, CheckSquare, Layers, Zap } from 'lucide-vue-next'
const props = defineProps({ plan: Object, ui: Object })
</script>
<!-- <style scoped>
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.plan-badge {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
  flex-shrink: 0;
}

.plan-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a0aec0;
  margin: 0 0 2px;
}

.panel-header h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  line-height: 1.2;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.select-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  color: #4a5568;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
}

.select-btn:hover:not(:disabled) {
  border-color: #6366f1;
  color: #6366f1;
  background: #f5f3ff;
}

.select-btn.active {
  background: #eef2ff;
  border-color: #6366f1;
  color: #6366f1;
}

.select-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
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

.add-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

.add-btn:active {
  transform: translateY(0);
}

/* Tablet */
@media (max-width: 1024px) {
  .panel-header h2 {
    font-size: 1.2rem;
  }

  .select-btn {
    padding: 8px 14px;
    font-size: 0.8rem;
  }

  .add-btn {
    padding: 8px 14px;
    font-size: 0.8rem;
  }

  .select-btn, .add-btn {
    gap: 5px;
  }

  .select-btn svg, .add-btn svg {
    width: 14px;
    height: 14px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .panel-header {
    gap: 12px;
  }

  .header-left {
    gap: 10px;
  }

  .plan-badge {
    width: 36px;
    height: 36px;
  }

  .plan-badge svg {
    width: 14px;
    height: 14px;
  }

  .plan-label {
    font-size: 0.65rem;
  }

  .panel-header h2 {
    font-size: 1rem;
  }

  .header-actions {
    gap: 6px;
  }

  .select-btn {
    padding: 7px 12px;
    font-size: 0.75rem;
  }

  .add-btn {
    padding: 7px 12px;
    font-size: 0.75rem;
  }

  .select-btn, .add-btn {
    gap: 4px;
  }

  .select-btn svg, .add-btn svg {
    width: 13px;
    height: 13px;
  }
}
</style> -->