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

