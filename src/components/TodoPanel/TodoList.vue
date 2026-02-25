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
<!-- <style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 8px;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f8f9fc;
}

.todo-list::-webkit-scrollbar {
  width: 8px;
}

.todo-list::-webkit-scrollbar-track {
  background: #f8f9fc;
  border-radius: 10px;
}

.todo-list::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 10px;
  transition: background 0.2s ease;
}

.todo-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: #fff;
  border: 1.5px solid #e8ecf4;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.18s ease;
  position: relative;
  overflow: hidden;
}

.todo-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #e2e8f0;
  border-radius: 3px 0 0 3px;
  transition: background 0.18s ease;
}

.todo-item:hover {
  border-color: #c7d2fe;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.08);
  transform: translateY(-1px);
}

.todo-item:hover::before {
  background: #6366f1;
}

.todo-item.done::before {
  background: #10b981;
}

.todo-item.done {
  background: #f9fafb;
  border-color: #e8ecf4;
}

.todo-item.selected {
  background: #eef2ff;
  border-color: #6366f1;
}

.todo-item.selected::before {
  background: #6366f1;
}

.check-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.todo-checkbox,
.select-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #6366f1;
  cursor: pointer;
}

.todo-content {
  flex: 1;
  min-width: 0;
}

.todo-name {
  font-size: 0.92rem;
  font-weight: 500;
  color: #2d3748;
  line-height: 1.4;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.todo-item.done .todo-name {
  text-decoration: line-through;
  color: #a0aec0;
}

.todo-meta {
  flex-shrink: 0;
}

.done-chip,
.pending-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
}

.done-chip {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.pending-chip {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.row-action-hint {
  color: #cbd5e0;
  flex-shrink: 0;
  transition: color 0.15s, transform 0.15s;
}

.todo-item:hover .row-action-hint {
  color: #6366f1;
  transform: translateX(3px);
}

/* Tablet */
@media (max-width: 1024px) {
  .todo-list {
    gap: 6px;
  }

  .todo-item {
    padding: 12px 14px;
    gap: 10px;
  }

  .todo-name {
    font-size: 0.9rem;
  }

  .done-chip,
  .pending-chip {
    font-size: 0.7rem;
    padding: 3px 8px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .todo-list {
    gap: 4px;
  }

  .todo-item {
    padding: 10px 12px;
    gap: 8px;
  }

  .check-wrap {
    width: 16px;
  }

  .todo-checkbox,
  .select-checkbox {
    width: 16px;
    height: 16px;
  }

  .todo-name {
    font-size: 0.85rem;
  }

  .todo-meta {
    display: none;
  }

  .row-action-hint {
    display: none;
  }

  .done-chip,
  .pending-chip {
    font-size: 0.65rem;
    padding: 2px 6px;
  }
}
</style> -->