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
