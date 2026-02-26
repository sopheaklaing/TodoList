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
  validate: {
    type: Function,
    default: null,
  },
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

  if (typeof props.validate === 'function' && !props.validate(value)) {
    return
  }

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


