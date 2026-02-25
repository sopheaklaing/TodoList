# My Todo — Project Summary

## Overview
- Vue 3 todo app with multiple plans
- Modular, responsive, and maintainable
- Uses Composition API, SCSS, and SweetAlert2

## Tech Stack
- Vue 3 + `<script setup>`
- Vite
- SCSS (variables + nesting)
- SweetAlert2 for modals
- LocalStorage for persistence
- Lucide Vue Next for icons

## Key Features
- Add, complete, delete todos
- Bulk selection actions (complete/delete)
- Multiple plans support
- Responsive design: desktop, tablet, mobile
- Mobile sheet-style modals and sidebar

## Components
- **TodoListPanel.vue** — Main panel with header, stats, list, bulk actions, empty state, and modal
- **Header.vue** — Displays plan name + add/select buttons
- **StatsBar.vue** — Todo counts + progress
- **BulkBar.vue** — Bulk actions when select mode active
- **TodoList.vue** — Todo rows with single/bulk selection
- **EmptyState.vue** — Shown when no plan or empty list
- **PromptModal.vue** — Reusable modal for creating todos/plans
- **MainLayout.vue** — Handles sidebar toggle, overlay, and navbar

## State & Data Flow
- `usePlans()` manages plan/todo state
- LocalStorage persists data under key `plans`
- `TodoListPanel.vue` emits:
  - `add-todo`
  - `toggle-todo`
  - `delete-todo`
  - `set-todos-checked`

## Styling
- Central SCSS variables in `_variables.scss`
- Component styles in `src/assets/scss/components/`
- SweetAlert2 buttons and popup styled globally (`TodoPanel.scss`)
- Responsive breakpoints: Desktop ≥1024px, Tablet 768–1024px, Mobile <768px

## SweetAlert2 Helpers
- Centralized helpers in `sweetAlertHelpers.js`
- Functions: `showTodoActionModal`, `showBulkActionModal`, `showDeleteTodoConfirm`, `showAlert`, `showSuccessToast`, `showErrorToast`
- Ensures consistent modal styling across the app

## Important Notes
- Sidebar auto-closes on mobile after plan selection
- `TodoList` scrolls with custom thin scrollbars
- SCSS compiled via Vite `additionalData` to inject variables globally
- SweetAlert2 styles **must be global**, not scoped
