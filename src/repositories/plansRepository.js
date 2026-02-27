/**
 * Plans repository – data access layer for plans and todos.
 * Uses LocalStorage for persistence. Can be replaced with an API client later.
 */

import { getItem, setItem } from '@/services/storageService'
import { generateId } from '@/utils/id'
import { STORAGE_KEYS, DEFAULTS } from '@/config/constants'

const PLANS_SCHEMA_VERSION = 1

function isValidTodo(todo) {
  return (
    todo &&
    typeof todo.id === 'string' &&
    typeof todo.name === 'string' &&
    typeof todo.checked === 'boolean'
  )
}

function isValidPlan(plan) {
  return (
    plan &&
    typeof plan.id === 'string' &&
    typeof plan.name === 'string' &&
    Array.isArray(plan.todos) &&
    plan.todos.every(isValidTodo)
  )
}

function sanitizePlans(plans) {
  if (!Array.isArray(plans)) return []
  return plans.filter(isValidPlan)
}

function normalizeStoredPlans(raw) {
  // Supports both legacy (array) and versioned { version, plans } formats.
  if (!raw) return null

  // Legacy format: just an array of plans.
  if (Array.isArray(raw)) {
    return {
      version: 0,
      plans: sanitizePlans(raw),
    }
  }

  // Versioned format.
  if (typeof raw === 'object' && Array.isArray(raw.plans)) {
    return {
      version: typeof raw.version === 'number' ? raw.version : 0,
      plans: sanitizePlans(raw.plans),
    }
  }

  return null
}

function migratePlansDocument(doc) {
  // For now, migration just bumps the version.
  // In the future, you can transform doc.plans here.
  return {
    version: PLANS_SCHEMA_VERSION,
    plans: sanitizePlans(doc.plans),
  }
}

const getDefaultPlans = () => [
  {
    id: generateId(),
    name: 'Work plan',
    todos: [
      { id: generateId(), name: 'Complete project proposal', checked: false },
      { id: generateId(), name: 'Review design mockups', checked: true },
      { id: generateId(), name: 'Call with team', checked: false },
    ],
  },
  {
    id: generateId(),
    name: 'School plan',
    todos: [
      { id: generateId(), name: 'Finish homework', checked: false },
      { id: generateId(), name: 'Study for exam', checked: false },
    ],
  },
  { id: generateId(), name: 'Dream plan', todos: [] },
]

export function loadPlans() {
  const raw = getItem(STORAGE_KEYS.PLANS)
  const doc = normalizeStoredPlans(raw)
  if (!doc) return []

  if (doc.version !== PLANS_SCHEMA_VERSION) {
    const migrated = migratePlansDocument(doc)
    setItem(STORAGE_KEYS.PLANS, migrated)
    return migrated.plans
  }

  return doc.plans
}

export function initPlansIfEmpty() {
  const current = loadPlans()
  if (current.length > 0) return current

  const defaults = getDefaultPlans()
  setItem(STORAGE_KEYS.PLANS, {
    version: PLANS_SCHEMA_VERSION,
    plans: defaults,
  })
  return defaults
}

export function savePlans(plans) {
  setItem(STORAGE_KEYS.PLANS, {
    version: PLANS_SCHEMA_VERSION,
    plans: sanitizePlans(plans),
  })
}

export function loadSelectedPlanId(plans) {
  const stored = getItem(STORAGE_KEYS.SELECTED_PLAN_ID)
  const exists = plans.some(p => p.id === stored)
  return exists ? stored : (plans[0]?.id ?? null)
}

export function saveSelectedPlanId(planId) {
  setItem(STORAGE_KEYS.SELECTED_PLAN_ID, planId)
}

export function createPlan(plans, name = DEFAULTS.PLAN_NAME) {
  const newPlan = {
    id: generateId(),
    name,
    todos: [],
  }
  const updated = [...plans, newPlan]
  savePlans(updated)
  return { plan: newPlan, plans: updated }
}

export function addTodo(plans, planId, name = DEFAULTS.TODO_NAME) {
  const plan = plans.find(p => p.id === planId)
  if (!plan) return { plans }

  const newTodo = {
    id: generateId(),
    name,
    checked: false,
  }
  const updated = plans.map(p =>
    p.id === planId
      ? { ...p, todos: [...p.todos, newTodo] }
      : p
  )
  savePlans(updated)
  return { plans: updated }
}

export function toggleTodo(plans, planId, todoId) {
  const updated = plans.map(p => {
    if (p.id !== planId) return p
    return {
      ...p,
      todos: p.todos.map(t =>
        t.id === todoId ? { ...t, checked: !t.checked } : t
      ),
    }
  })
  savePlans(updated)
  return { plans: updated }
}

export function deleteTodos(plans, planId, todoIds) {
  const ids = Array.isArray(todoIds) ? todoIds : [todoIds]
  const updated = plans.map(p => {
    if (p.id !== planId) return p
    return {
      ...p,
      todos: p.todos.filter(t => !ids.includes(t.id)),
    }
  })
  savePlans(updated)
  return { plans: updated }
}

export function setTodosChecked(plans, planId, todoIds, checked = true) {
  const ids = Array.isArray(todoIds) ? todoIds : [todoIds]
  const updated = plans.map(p => {
    if (p.id !== planId) return p
    return {
      ...p,
      todos: p.todos.map(t => (ids.includes(t.id) ? { ...t, checked } : t)),
    }
  })
  savePlans(updated)
  return { plans: updated }
}
