<template>
  <header class="navbar">
    <div class="navbar-inner">
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
          <h1>Everyplan</h1>
          <p>Set up your play</p>
        </div>
      </div>

      <button class="dark-mode-btn" aria-label="Toggle dark mode">
        <Sun :size="22" class="icon-sun" />
        <Moon :size="22" class="icon-moon" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { Sun, Moon } from 'lucide-vue-next'
</script>

<style scoped>
.navbar {
  height: 72px;
  background: linear-gradient(180deg, #f8fafc 0%, #fff 100%);
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  padding: 0 28px;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.brand {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  width: 44px;
  height: 44px;
}

.logo svg {
  width: 100%;
  height: 100%;
}

.brand-text h1 {
  color: #0f172a;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.brand-text p {
  color: #64748b;
  font-size: 0.85rem;
  margin-top: 2px;
}

.dark-mode-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.dark-mode-btn:hover {
  background: #3b82f6;
  border-color: #3b82f6;
}

.dark-mode-btn svg {
  width: 22px;
  height: 22px;
  color: #475569;
}

.dark-mode-btn:hover svg {
  color: #fff;
}

.dark-mode-btn .icon-moon {
  display: none;
}
</style>