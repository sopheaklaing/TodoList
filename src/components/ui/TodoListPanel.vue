<template>
  <main class="todo-panel">
    <div v-if="plan" class="panel-header">
      <h2>{{ plan.name }}</h2>
      <button class="add-todo-btn" @click="showModal = true">
        <Plus :size="18" />
        Add todo
      </button>
    </div>

    <template v-if="plan">
      <div v-if="plan.todos.length > 0" class="todo-list">
        <label
          v-for="todo in plan.todos"
          :key="todo.id"
          class="todo-item"
          :class="{ done: todo.checked }"
        >
          <input
            type="checkbox"
            :checked="todo.checked"
            @change="$emit('toggle-todo', plan.id, todo.id)"
            class="todo-checkbox"
          />
          <span class="todo-name">{{ todo.name }}</span>
        </label>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon"><ClipboardList :size="48" /></div>
        <p>No todos yet</p>
        <span>Click "Add todo" to create your first item</span>
      </div>
    </template>

    <div v-else class="empty-state">
      <div class="empty-icon"><FolderOpen :size="48" /></div>
      <p>Select a plan</p>
      <span>Choose a plan from the left or create a new one</span>
    </div>

    <PromptModal
      v-if="plan"
      v-model:show="showModal"
      title="New todo"
      placeholder="Todo name"
      defaultValue="New todo"
      @confirm="onAddTodoConfirm"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, ClipboardList, FolderOpen } from 'lucide-vue-next'
import PromptModal from './PromptModal.vue'

const props = defineProps({
  plan: { type: Object, default: null }
})

const emit = defineEmits(['add-todo', 'toggle-todo'])

const showModal = ref(false)

function onAddTodoConfirm(name) {
  if (props.plan && name) emit('add-todo', props.plan.id, name)
}
</script>

<style scoped>
.todo-panel {
  flex: 1;
  background: #fafbfc;
  padding: 32px 40px;
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.panel-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.add-todo-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: #3b82f6;
  border: 1px solid #3b82f6;
  border-radius: 10px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-todo-btn:hover {
  background: #2563eb;
  border-color: #2563eb;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.35);
}

.add-todo-btn :deep(svg) {
  flex-shrink: 0;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.todo-item:hover {
  border-color: #cbd5e1;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.todo-item.done .todo-name {
  color: #94a3b8;
  text-decoration: line-through;
}

.todo-item.done {
  border-color: #f1f5f9;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  accent-color: #3b82f6;
  cursor: pointer;
}

.todo-name {
  font-size: 0.95rem;
  color: #334155;
  flex: 1;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.empty-icon {
  color: #cbd5e1;
}

.empty-state p {
  font-size: 1.1rem;
  font-weight: 600;
  color: #475569;
}

.empty-state span {
  font-size: 0.9rem;
  color: #94a3b8;
}
</style>
