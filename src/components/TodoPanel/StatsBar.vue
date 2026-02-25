<template>
  <div class="stats-bar" v-if="plan.todos.length">
    <div class="stat"><span class="stat-num">{{ plan.todos.length }}</span><span class="stat-label">Total</span></div>
    <div class="stat-divider"></div>
    <div class="stat"><span class="stat-num done-num">{{ doneTodos }}</span><span class="stat-label">Done</span></div>
    <div class="stat-divider"></div>
    <div class="stat"><span class="stat-num pending-num">{{ pendingTodos }}</span><span class="stat-label">Pending</span></div>
    <div class="progress-wrap">
      <div class="progress-bar"><div class="progress-fill" :style="{ width: progress + '%' }"></div></div>
      <span class="progress-pct">{{ progress }}%</span>
    </div>
  </div>
</template>

<script setup>
import '@/assets/scss/components/StatsBar.scss';
const props = defineProps({ plan: Object, doneTodos: Number, pendingTodos: Number, progress: Number })
</script>

