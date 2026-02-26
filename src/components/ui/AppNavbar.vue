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

      <!-- Dark mode toggle removed -->
    </div>
  </header>
</template>

<script setup>
import '@/assets/scss/components/Navbar.scss'

defineEmits(['toggle-sidebar'])
</script>

