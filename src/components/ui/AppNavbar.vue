<template>
  <header class="navbar">
    <div class="navbar-inner">
      <button 
        class="menu-btn" 
        aria-label="Toggle menu"
        @click="$emit('toggle-sidebar')"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div class="brand">
        <div class="logo">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="url(#logo-grad)"/>
            <path d="M8 16h6v6H8v-6zm10 0h6v6h-6v-6zm-5-10h6v6h-6V6z" fill="#fff" fill-opacity="0.9"/>
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stop-color="#3b82f6"/>
                <stop offset="1" stop-color="#2563eb"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="brand-text">
          <h1>Momentum</h1>
          <p>Turn plans into progress</p>
        </div>
      </div>

      <!-- <button class="dark-mode-btn" aria-label="Toggle dark mode" @click="toggleDarkMode">
        <Sun :size="22" class="icon-sun" />
        <Moon :size="22" class="icon-moon" />
      </button> -->
    </div>
  </header>
</template>

<script setup>
import { Sun, Moon } from 'lucide-vue-next'
import { useDarkMode } from '@/composables/useDarkMode'
import '@/assets/scss/components/Navbar.scss'
const { toggleDarkMode } = useDarkMode()

defineEmits(['toggle-sidebar'])
</script>

<!-- <style lang="scss" scoped>
.navbar {
  height: 72px;
  background: var(--bg-sidebar, #f8fafc);
  border-bottom: 1px solid var(--border-color, #e2e8f0);
  display: flex;
  align-items: center;
  padding: 0 28px;

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: #4a5568;
    transition: all 0.2s ease;
    padding: 8px;
    margin-right: 12px;

    &:hover {
      color: #6366f1;
    }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 16px;

    .logo {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      box-shadow: 0 6px 18px rgba(99, 102, 241, 0.35);
      transition: all 0.25s ease;
      flex-shrink: 0;

      svg {
        width: 26px;
        height: 26px;
      }
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      justify-content: center;

      h1 {
        margin: 0;
        font-size: 1.6rem;
        font-weight: 800;
        letter-spacing: -0.04em;
        line-height: 1.1;
        color: #0f172a;
      }

      p {
        margin: 4px 0 0;
        font-size: 0.9rem;
        font-weight: 500;
        color: #64748b;
        letter-spacing: 0.02em;
      }
    }
  }

  .dark-mode-btn {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: var(--bg-card, #f1f5f9);
    border: 1px solid var(--border-color, #e2e8f0);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: #3b82f6;
      border-color: #3b82f6;

      svg {
        color: #fff;
      }
    }

    svg {
      width: 22px;
      height: 22px;
      color: var(--text-secondary, #475569);
    }

    .icon-sun { display: block; }
    .icon-moon { display: none; }
  }
}

/* Dark mode */
html.dark {
  .dark-mode-btn {
    .icon-sun { display: none; }
    .icon-moon { display: block; }
  }
}

/* Tablet */
@media (max-width: 1024px) {
  .navbar {
    height: 64px;
    padding: 0 16px;

    .menu-btn { display: block; }

    .logo {
      width: 44px;
      height: 44px;

      svg { width: 24px; height: 24px; }
    }

    .brand-text {
      h1 { font-size: 1.4rem; }
      p { font-size: 0.8rem; }
    }
  }
}

/* Mobile */
@media (max-width: 768px) {
  .navbar {
    height: 56px;
    padding: 0 12px;

    .menu-btn { display: block; }

    .logo {
      width: 40px;
      height: 40px;

      svg { width: 22px; height: 22px; }
    }

    .brand-text {
      h1 { font-size: 1.2rem; }
      p { font-size: 0.75rem; }
    }
  }
}
</style> -->
