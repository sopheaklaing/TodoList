<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" :class="{ centered: !anchor }" @click.self="cancel">
        <div class="modal" :class="{ anchored: anchor }" :style="anchorStyle">
          <div class="modal-header">
            <div class="modal-icon-wrap">
              <Plus :size="20" stroke-width="2" />
            </div>
            <h3 class="modal-title">{{ title }}</h3>
            <button class="modal-close" aria-label="Close" @click="cancel">
              <X :size="18" />
            </button>
          </div>
          <div class="modal-body">
            <input
              ref="inputRef"
              v-model="inputValue"
              type="text"
              class="modal-input"
              :placeholder="placeholder"
              @keydown.enter="confirm"
              @keydown.esc="cancel"
            />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="cancel">Cancel</button>
            <button type="button" class="btn-confirm" @click="confirm">
              <Check :size="16" />
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { Plus, X, Check } from 'lucide-vue-next'
import '@/assets/scss/components/PromptModal.scss'
const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  defaultValue: { type: String, default: '' },
  anchor: { type: String, default: '' },
})

const emit = defineEmits(['confirm', 'cancel', 'update:show'])

const inputValue = ref('')
const inputRef = ref(null)
const anchorStyle = ref({})

watch(
  () => props.show,
  async (visible) => {
    if (!visible) return

    inputValue.value = props.defaultValue

    await nextTick()

    updateAnchorPosition()
    focusInput()
  }
)

function updateAnchorPosition() {
  if (!props.anchor) {
    anchorStyle.value = {}
    return
  }

  const el = document.querySelector(`.${props.anchor}`)
  if (!el) {
    anchorStyle.value = {}
    return
  }

  const rect = el.getBoundingClientRect()

  anchorStyle.value = {
    position: 'absolute',
    top: `${rect.bottom + 8}px`,
    left: `${rect.left}px`,
  }
}

function focusInput() {
  inputRef.value?.focus()
}

function confirm() {
  const value = inputValue.value.trim()
  if (!value) return

  emit('confirm', value)
  close()
}

function cancel() {
  emit('cancel')
  close()
}

function close() {
  emit('update:show', false)
}
</script>


<!-- <style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 1000;
}

.modal-overlay.centered {
  align-items: center;
  justify-content: center;
}

.modal.anchored {
  margin: 0;
}

.modal {
  background: #fff;
  border-radius: 16px;
  min-width: 360px;
  max-width: 420px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 20px 0;
}

.modal-icon-wrap {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 10px;
  color: #3b82f6;
  flex-shrink: 0;
}

.modal-title {
  flex: 1;
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.15s ease;
}

.modal-close:hover {
  background: #f1f5f9;
  color: #64748b;
}

.modal-body {
  padding: 20px 20px 0;
}

.modal-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #0f172a;
  background: #f8fafc;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.modal-input::placeholder {
  color: #94a3b8;
}

.modal-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px 20px;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
}

.btn-cancel,
.btn-confirm {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-cancel {
  background: #fff;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.btn-cancel:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #475569;
}

.btn-confirm {
  background: #3b82f6;
  border: 1px solid #3b82f6;
  color: #fff;
}

.btn-confirm:hover {
  background: #2563eb;
  border-color: #2563eb;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.35);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.96) translateY(-4px);
}

/* Tablet (768px - 1024px) */
@media (max-width: 1024px) {
  .modal {
    min-width: 320px;
    max-width: 380px;
  }

  .modal-title {
    font-size: 1rem;
  }

  .modal-input {
    font-size: 0.9rem;
    padding: 11px 14px;
  }

  .btn-cancel,
  .btn-confirm {
    padding: 9px 16px;
    font-size: 0.85rem;
  }
}

/* Mobile (< 768px) */
@media (max-width: 768px) {
  .modal-overlay.centered {
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 0;
  }

  .modal {
    min-width: calc(100% - 32px);
    max-width: 100%;
    margin: 0 16px 16px;
    border-radius: 16px 16px 0 0;
  }

  .modal-overlay.centered .modal {
    border-radius: 16px;
    margin: 16px;
  }

  .modal-header {
    padding: 16px 16px 0;
    gap: 12px;
  }

  .modal-icon-wrap {
    width: 36px;
    height: 36px;
  }

  .modal-title {
    font-size: 0.95rem;
  }

  .modal-close {
    width: 28px;
    height: 28px;
  }

  .modal-body {
    padding: 16px 16px 0;
  }

  .modal-input {
    font-size: 0.9rem;
    padding: 10px 14px;
  }

  .modal-actions {
    padding: 16px 16px;
    gap: 8px;
  }

  .btn-cancel,
  .btn-confirm {
    padding: 8px 14px;
    font-size: 0.8rem;
    flex: 1;
  }

  .btn-cancel,
  .btn-confirm svg {
    height: 14px;
    width: 14px;
  }
}
</style> -->
