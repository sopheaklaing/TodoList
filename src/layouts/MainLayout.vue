<script setup lang="ts">
import { ref } from 'vue'
import AppNavbar from '@/components/ui/AppNavbar.vue'
import PlansSidebar from '@/components/ui/PlansSidebar.vue'
import TodoListPanel from '@/components/ui/TodoListPanel.vue'
import { usePlans } from '@/composables/usePlans'

const { plans, selectedPlanId, selectedPlan, createPlan, selectPlan, addTodo, toggleTodo, deleteTodo, setTodosChecked } = usePlans()

const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="layout">
    <AppNavbar 
      @toggle-sidebar="toggleSidebar"
    />

    <div class="layout-body">
      <PlansSidebar
        :plans="plans"
        :selected-plan-id="selectedPlanId"
        :sidebar-open="sidebarOpen"
        @create="(name) => createPlan(name)"
        @select="(id) => { selectPlan(id); closeSidebar(); }"
      />
      <TodoListPanel
        :plan="selectedPlan"
        @add-todo="addTodo"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
        @set-todos-checked="setTodosChecked"
      />
    </div>

    <!-- Sidebar overlay backdrop for mobile -->
    <div 
      v-if="sidebarOpen" 
      class="sidebar-overlay" 
      @click="closeSidebar()"
    ></div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-page);
}

.layout-body {
  display: flex;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f8f9fc;
}

.layout-body::-webkit-scrollbar {
  width: 8px;
}

.layout-body::-webkit-scrollbar-track {
  background: #f8f9fc;
}

.layout-body::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.layout-body::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
}

/* Tablet (768px - 1024px) */
@media (max-width: 1024px) {
  .layout-body {
    flex-direction: column;
  }
}

/* Mobile (< 768px) */
@media (max-width: 768px) {
  .layout-body {
    flex-direction: column;
    position: relative;
  }

  .sidebar-overlay {
    display: block;
  }
}
</style>
