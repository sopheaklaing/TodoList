<template>
  <div v-if="plan.todos.length" class="todo-list">
    <label
      v-for="(todo, idx) in plan.todos"
      :key="todo.id"
      class="todo-item"
      :class="{ selected: ui.selectedIds.has(todo.id), done: todo.checked }"
      @click.prevent="ui.onRowClick(todo)"
    >
      <div class="check-wrap">
        <input
          type="checkbox"
          v-if="!ui.selectMode"
          :checked="todo.checked"
          @change.stop="toggleTodo(todo.id)"
          class="todo-checkbox"
        />
        <input
          type="checkbox"
          v-else
          :checked="ui.selectedIds.has(todo.id)"
          @change.stop="ui.toggleSelect(todo.id)"
          class="select-checkbox"
        />
      </div>
      <div class="todo-content"><span class="todo-name">{{ todo.name }}</span></div>
      <div class="todo-meta">
        <span v-if="todo.checked" class="done-chip"><CheckCircle2 :size="12" /> Done</span>
        <span v-else class="pending-chip"><Clock :size="12" /> Pending</span>
      </div>
      <div v-if="!ui.selectMode" class="row-action-hint"><ChevronRight :size="15" /></div>
    </label>
  </div>
</template>

<script setup>
import '@/assets/scss/components/TodoList.scss';
import { CheckCircle2, Clock, ChevronRight } from 'lucide-vue-next'
const props = defineProps({ plan: Object, ui: Object, toggleTodo: Function })
</script>
