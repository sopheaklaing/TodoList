<script setup lang="ts">
import AppNavbar from '@/components/ui/AppNavbar.vue'
import PlansSidebar from '@/components/ui/PlansSidebar.vue'
import TodoListPanel from '@/components/ui/TodoListPanel.vue'
import { usePlans } from '@/composables/usePlans'

const { plans, selectedPlanId, selectedPlan, createPlan, selectPlan, addTodo, toggleTodo } = usePlans()
</script>

<template>
  <div class="layout">
    <AppNavbar />

    <div class="layout-body">
      <PlansSidebar
        :plans="plans"
        :selected-plan-id="selectedPlanId"
        @create="(name) => createPlan(name)"
        @select="selectPlan"
      />
      <TodoListPanel
        :plan="selectedPlan"
        @add-todo="addTodo"
        @toggle-todo="toggleTodo"
      />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f1f5f9;
}

.layout-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
