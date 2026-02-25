<template>
  <main class="todo-panel">
    <Header
      v-if="plan"
      :plan="plan"
      :ui="ui"
    />

    <template v-if="plan">
      <StatsBar
        v-if="plan.todos.length > 0"
        :plan="plan"
        :doneTodos="doneTodos.length"
        :pendingTodos="pendingTodos.length"
        :progress="progress"
      />

      <BulkBar :ui="ui" />

      <TodoList
        v-if="plan.todos.length > 0"
        :plan="plan"
        :ui="ui"
        :toggle-todo="toggleTodo"
      />

      <EmptyState
        v-else
        :plan="plan"
        @add-todo="showModal = true"
      />
    </template>

    <EmptyState v-else :plan="null" />

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
import { ref, computed } from 'vue'
import Header from '../TodoPanel/Header.vue'
import StatsBar from '../TodoPanel/StatsBar.vue'
import BulkBar from '../TodoPanel/BulkBar.vue'
import TodoList from '../TodoPanel/TodoList.vue'
import EmptyState from '../TodoPanel/EmptyState.vue'
import PromptModal from './PromptModal.vue'
import { showTodoActionModal, showBulkActionModal, showDeleteTodoConfirm, showDeleteMultipleTodosConfirm } from '@/utils/sweetAlertHelpers'
import '@/assets/scss/components/TodoPanel.scss'

const props = defineProps({ plan: { type: Object, default: null } })
const emit = defineEmits(['add-todo', 'toggle-todo', 'delete-todo', 'set-todos-checked'])

const showModal = ref(false)
const selectedIds = ref(new Set())
const selectMode = ref(false)

const doneTodos = computed(() => props.plan?.todos.filter(t => t.checked) ?? [])
const pendingTodos = computed(() => props.plan?.todos.filter(t => !t.checked) ?? [])
const progress = computed(() => props.plan?.todos.length ? Math.round(doneTodos.value.length / props.plan.todos.length * 100) : 0)

const ui = computed(() => ({
  selectMode: selectMode.value,
  selectedIds: selectedIds.value,
  showModal: showModal.value,
  toggleSelectMode,
  toggleSelect,
  onRowClick,
  openBulkActions,
  bulkComplete,
  bulkDelete,
  cancelSelection,
  openTodoModal: () => { showModal.value = true }
}))

function toggleSelectMode() {
  selectMode.value = !selectMode.value
  if (!selectMode.value) selectedIds.value = new Set()
}

function toggleSelect(id) {
  const next = new Set(selectedIds.value)
  next.has(id) ? next.delete(id) : next.add(id)
  selectedIds.value = next
}

function toggleTodo(id) {
  const todo = props.plan.todos.find(t => t.id === id)
  if (todo) emit('toggle-todo', props.plan.id, id)
}

function onAddTodoConfirm(name) {
  if (props.plan && name) emit('add-todo', props.plan.id, name)
}

function onRowClick(todo) {
  if (selectMode.value) { toggleSelect(todo.id); return }
  showTodoActionModal(
    todo,
    () => { emit('set-todos-checked', props.plan.id, [todo.id], true) },
    () => {
      showDeleteTodoConfirm(() => {
        emit('delete-todo', props.plan.id, [todo.id])
      })
    }
  )
}

function openBulkActions() {
  const ids = Array.from(selectedIds.value)
  if (!ids.length) return
  showBulkActionModal(
    ids.length,
    () => {
      emit('set-todos-checked', props.plan.id, ids, true)
      selectedIds.value = new Set()
      selectMode.value = false
    },
    () => {
      emit('delete-todo', props.plan.id, ids)
      selectedIds.value = new Set()
      selectMode.value = false
    }
  )
}

function bulkComplete() {
  const ids = Array.from(selectedIds.value)
  if (!ids.length) return
  emit('set-todos-checked', props.plan.id, ids, true)
  selectedIds.value = new Set()
  selectMode.value = false
}

function bulkDelete() {
  const ids = Array.from(selectedIds.value)
  if (!ids.length) return
  showDeleteMultipleTodosConfirm(ids.length, () => {
    emit('delete-todo', props.plan.id, ids)
    selectedIds.value = new Set()
    selectMode.value = false
  })
}

function cancelSelection() {
  selectedIds.value = new Set()
  selectMode.value = false
}
</script>