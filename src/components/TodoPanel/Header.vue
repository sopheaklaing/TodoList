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
