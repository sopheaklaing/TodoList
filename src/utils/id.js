/**
 * Generates a unique ID for plans and todos.
 */

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}
