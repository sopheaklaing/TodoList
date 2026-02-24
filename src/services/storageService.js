/**
 * Storage service – abstraction over browser LocalStorage.
 * Keeps persistence logic in one place so it can be swapped (e.g. for API) later.
 */

/**
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
export function getItem(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return defaultValue
    return JSON.parse(raw)
  } catch {
    return defaultValue
  }
}

/**
 * @param {string} key
 * @param {*} value
 */
export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('[Storage] Failed to save:', e)
  }
}
