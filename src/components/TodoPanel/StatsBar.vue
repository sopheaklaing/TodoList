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

<!-- <style scoped>
.stats-bar {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #fff;
  border: 1px solid #e8ecf4;
  border-radius: 14px;
  padding: 14px 22px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.stat-num {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
  font-family: 'DM Mono', monospace;
}

.done-num {
  color: #10b981;
}

.pending-num {
  color: #f59e0b;
}

.stat-label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a0aec0;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: #e8ecf4;
}

.progress-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  min-width: 160px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #edf2f7;
  border-radius: 99px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #10b981);
  border-radius: 99px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-pct {
  font-size: 0.78rem;
  font-weight: 700;
  color: #718096;
  font-family: 'DM Mono', monospace;
  min-width: 34px;
  text-align: right;
}

/* Tablet */
@media (max-width: 1024px) {
  .stats-bar {
    padding: 12px 18px;
    gap: 16px;
  }

  .stat-num {
    font-size: 1rem;
  }

  .stat-label {
    font-size: 0.65rem;
  }

  .progress-wrap {
    min-width: 140px;
  }

  .progress-pct {
    font-size: 0.7rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .stats-bar {
    padding: 10px 12px;
    gap: 12px;
  }

  .stat {
    gap: 0px;
  }

  .stat-num {
    font-size: 0.9rem;
  }

  .stat-label {
    font-size: 0.6rem;
  }

  .stat-divider {
    height: 24px;
  }

  .progress-wrap {
    margin-left: 12px;
    min-width: 100px;
  }

  .progress-bar {
    height: 4px;
  }

  .progress-pct {
    font-size: 0.65rem;
    min-width: 28px;
  }
}
</style> -->

