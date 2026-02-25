/**
 * SweetAlert2 Helper Functions
 * Provides reusable alert configurations and methods for consistent toast/modal styling
 */

import Swal from 'sweetalert2'

/**
 * Base custom classes applied to all modals to match todo app styling
 */
const baseCustomClasses = {
  popup: 'swal-todo-popup',
  confirmButton: 'swal-confirm-btn',
  denyButton: 'swal-deny-btn',
  cancelButton: 'swal-cancel-btn',
}

/**
 * Open a confirm/deny modal for a single todo item
 * @param {Object} todo - The todo object with { name, id, checked }
 * @param {Function} onConfirm - Callback when user confirms (complete)
 * @param {Function} onDeny - Callback when user denies (delete)
 */
export async function showTodoActionModal(todo, onConfirm, onDeny) {
  const result = await Swal.fire({
    title: todo.name,
    showDenyButton: true,
    confirmButtonText: '✓ Complete',
    denyButtonText: '✕ Delete',
    customClass: baseCustomClasses,
    buttonsStyling: false,
  })
  if (result.isConfirmed && !todo.checked) {
    onConfirm(todo)
  } else if (result.isDenied) {
    onDeny(todo)
  }
}

/**
 * Open a confirm/deny modal for bulk actions (multiple items)
 * @param {number} count - Number of items selected
 * @param {Function} onComplete - Callback to complete all
 * @param {Function} onDelete - Callback to delete all
 */
export function showBulkActionModal(count, onComplete, onDelete) {
  return Swal.fire({
    title: `${count} item${count > 1 ? 's' : ''} selected`,
    showDenyButton: true,
    confirmButtonText: '✓ Complete all',
    denyButtonText: '✕ Delete all',
    customClass: baseCustomClasses,
    buttonsStyling: false,
  }).then(result => {
    if (result.isConfirmed) {
      onComplete()
    } else if (result.isDenied) {
      onDelete()
    }
  })
}

/**
 * Open a warning confirmation modal for deleting a single todo
 * @param {Function} onDelete - Callback when user confirms delete
 * @returns {Promise}
 */
export function showDeleteTodoConfirm(onDelete) {
  return Swal.fire({
    title: 'Delete this todo?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    customClass: {
      confirmButton: 'swal-danger-btn',
      cancelButton: 'swal-cancel-btn',
    },
    buttonsStyling: false,
  }).then(result => {
    if (result.isConfirmed) {
      onDelete()
    }
  })
}

/**
 * Open a warning confirmation modal for deleting multiple todos
 * @param {number} count - Number of items to delete
 * @param {Function} onDelete - Callback when user confirms delete
 * @returns {Promise}
 */
export function showDeleteMultipleTodosConfirm(count, onDelete) {
  return Swal.fire({
    title: `Delete ${count} todo${count > 1 ? 's' : ''}?`,
    text: 'This cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    customClass: {
      confirmButton: 'swal-danger-btn',
      cancelButton: 'swal-cancel-btn',
    },
    buttonsStyling: false,
  }).then(result => {
    if (result.isConfirmed) {
      onDelete()
    }
  })
}

/**
 * Generic alert with custom title and options
 * @param {string} title - Alert title
 * @param {Object} opts - Additional SweetAlert2 options
 * @returns {Promise}
 */
export function showAlert(title, opts = {}) {
  return Swal.fire({
    title,
    ...opts,
    customClass: {
      ...baseCustomClasses,
      ...opts.customClass,
    },
    buttonsStyling: false,
  })
}

/**
 * Success toast notification
 * @param {string} message - Success message
 * @returns {Promise}
 */
export function showSuccessToast(message) {
  return Swal.fire({
    title: message,
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true,
    position: 'bottom-end',
    customClass: baseCustomClasses,
  })
}

/**
 * Error toast notification
 * @param {string} message - Error message
 * @returns {Promise}
 */
export function showErrorToast(message) {
  return Swal.fire({
    title: message,
    icon: 'error',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true,
    position: 'bottom-end',
    customClass: baseCustomClasses,
  })
}

export default {
  showTodoActionModal,
  showBulkActionModal,
  showDeleteTodoConfirm,
  showDeleteMultipleTodosConfirm,
  showAlert,
  showSuccessToast,
  showErrorToast,
}
