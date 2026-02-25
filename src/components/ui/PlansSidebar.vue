<template>
  <aside class="plans-sidebar" :data-open="sidebarOpen ? 'true' : 'false'">
    <div class="create-wrap">
      <button class="create-btn" @click="showModal = true">
        <Plus :size="20" />
        Create
      </button>

      <PromptModal
        v-model:show="showModal"
        title="New plan"
        placeholder="Plan name"
        defaultValue="New plan"
        anchor="create-wrap"
        @confirm="onConfirm"
      />
    </div>

    <div class="plans-list">
      <span class="section-label">My plans</span>
      <button
        v-for="plan in plans"
        :key="plan.id"
        class="plan-item"
        :class="{ active: selectedPlanId === plan.id }"
        @click="$emit('select', plan.id)"
      >
        <span class="active-line" v-if="selectedPlanId === plan.id"></span>
        <span class="plan-icon">
          <Folder :size="18" />
        </span>
        {{ plan.name }}
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Folder } from 'lucide-vue-next'
import PromptModal from './PromptModal.vue'
import '@/assets/scss/components/PlansSidebar.scss'
defineProps({
  plans: { type: Array, required: true },
  selectedPlanId: { type: String, default: '' },
  sidebarOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['create', 'select'])

const showModal = ref(false)

function onConfirm(name) {
  if (name) emit('create', name)
}
</script>

<!-- <style scoped>
.plans-sidebar {
  width: 260px;
  min-width: 260px;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.create-btn {
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

.create-btn:hover {
  background: #2563eb;
  border-color: #2563eb;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.35);
}

.create-btn :deep(svg) {
  flex-shrink: 0;
}

.create-wrap {
  position: relative;
}

.section-label {
  color: #64748b;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0 12px;
  margin-bottom: 8px;
}

.plans-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.plan-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: #334155;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.plan-item:hover {
  background: rgba(59, 130, 246, 0.08);
  color: #1e293b;
}

.plan-item.active {
  background: rgba(59, 130, 246, 0.12);
  color: #1e40af;
}

.plan-item .active-line {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 24px;
  background: #3b82f6;
  border-radius: 0 3px 3px 0;
}

.plan-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

/* Tablet (768px - 1024px) */
@media (max-width: 1024px) {
  .plans-sidebar {
    width: 220px;
    min-width: 220px;
    padding: 20px 12px;
    gap: 20px;
  }

  .plan-item {
    padding: 10px 12px;
    font-size: 0.9rem;
  }

  .create-btn {
    font-size: 0.8rem;
    padding: 8px 14px;
  }
}

/* Mobile (< 768px) */
@media (max-width: 768px) {
  .plans-sidebar {
    position: fixed;
    left: 0;
    top: 56px;
    bottom: 0;
    width: 260px;
    min-width: 260px;
    background: #f8fafc;
    border-right: 1px solid #e2e8f0;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
    padding: 20px 16px;
    gap: 24px;
  }

  /* Show sidebar when prop is true */
  .plans-sidebar[data-open="true"] {
    transform: translateX(0);
  }

  .plan-item {
    padding: 12px 14px;
    font-size: 0.95rem;
  }

  .create-btn {
    font-size: 0.875rem;
    padding: 9px 18px;
  }
}

</style> -->
