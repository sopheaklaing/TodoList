<template>
  <transition name="slide-bar">
    <div class="bulk-bar" v-if="ui.selectMode">
      <span class="bulk-count"><CheckCircle2 :size="15" /> {{ ui.selectedIds.size }} selected</span>
      <div class="bulk-actions">
        <button class="bulk-complete" @click="ui.bulkComplete" :disabled="!ui.selectedIds.size"><CheckCheck :size="14" /> Complete</button>
        <button class="bulk-delete" @click="ui.bulkDelete" :disabled="!ui.selectedIds.size"><Trash2 :size="14" /> Delete</button>
        <button class="bulk-cancel" @click="ui.cancelSelection"><X :size="14" /> Cancel</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { CheckCircle2, CheckCheck, Trash2, X } from 'lucide-vue-next'
import '@/assets/scss/components/BulkBar.scss'
const props = defineProps({ ui: Object })
</script>
