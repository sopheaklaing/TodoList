/**
 * usePlans – application state for plans and todos.
 * Connects UI to the repository layer. All mutations persist via LocalStorage.
 */

import { ref, computed, watch } from 'vue'
import * as repo from '@/repositories/plansRepository'

const plans = ref([])
const selectedPlanId = ref(null)

export function usePlans() {
  if (plans.value.length === 0) {
    plans.value = repo.initPlansIfEmpty()
    selectedPlanId.value = repo.loadSelectedPlanId(plans.value)
  }

  const selectedPlan = computed(() =>
    plans.value.find(p => p.id === selectedPlanId.value) ?? null
  )

  watch(selectedPlanId, id => {
    if (id) repo.saveSelectedPlanId(id)
  })

  function createPlan(name) {
    const { plan, plans: updated } = repo.createPlan(plans.value, name)
    plans.value = updated
    selectedPlanId.value = plan.id
    return plan.id
  }

  function selectPlan(planId) {
    selectedPlanId.value = planId
  }

  function addTodo(planId, name) {
    const { plans: updated } = repo.addTodo(plans.value, planId, name)
    plans.value = updated
  }

  function toggleTodo(planId, todoId) {
    const { plans: updated } = repo.toggleTodo(plans.value, planId, todoId)
    plans.value = updated
  }

  function deleteTodo(planId, todoIds) {
    const { plans: updated } = repo.deleteTodos(plans.value, planId, todoIds)
    plans.value = updated
  }

  function setTodosChecked(planId, todoIds, checked = true) {
    const { plans: updated } = repo.setTodosChecked(plans.value, planId, todoIds, checked)
    plans.value = updated
  }

  return {
    plans,
    selectedPlanId,
    selectedPlan,
    createPlan,
    selectPlan,
    addTodo,
    toggleTodo,
    deleteTodo,
    setTodosChecked,
  }
}
