import { ref, watch } from 'vue'

const isDark = ref(false)

function loadFromStorage() {
  if (typeof localStorage === 'undefined') return false
  return localStorage.getItem('everyplan_dark_mode') === 'true'
}

export function useDarkMode() {
  if (typeof document !== 'undefined' && isDark.value === false) {
    isDark.value = loadFromStorage()
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  watch(isDark, (val) => {
    localStorage.setItem('everyplan_dark_mode', val)
    document.documentElement.classList.toggle('dark', val)
  })

  function toggleDarkMode() {
    isDark.value = !isDark.value
  }

  return { isDark, toggleDarkMode }
}
