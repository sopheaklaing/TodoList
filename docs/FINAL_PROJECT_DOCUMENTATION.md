# My Todo — Project Documentation

## Project Overview

A lightweight Vue 3 todo application that organizes todos into plans. This project is focused on clarity, modular components, and responsive design across desktop, tablet, and mobile. It uses the Composition API and small, focused components for maintainability.

## Tech Stack

- **Vue 3** — Composition API with `<script setup>` syntax
- **Vite** — Fast dev server and optimized build
- **SCSS** — Styles with variables and nesting support (`sass` package included)
- **SweetAlert2** — Beautiful modals and confirmations
- **Lucide Vue Next** — Icon library
- **LocalStorage** — Persistence via `storageService.js`


## Key Features
- Multiple plans with separate todo lists
- Add/complete/delete todos
- Bulk-selection actions (complete/delete)
- Responsive layout (desktop/tablet/mobile)
- Slide-in sidebar for mobile with hamburger toggle
- Sheet-style modal on mobile, centered modal on desktop

Notes: this project uses Vite; if you see a compile error referencing malformed CSS, check components that recently received style edits (e.g., AppNavbar.vue, EmptyState.vue).

## Project Structure

```
my-todo/
├── index.html
├── package.json
├── vite.config.js             (SCSS preprocessor configured with variables)
├── docs/
│   └── FINAL_PROJECT_DOCUMENTATION.md
├── public/
└── src/
    ├── main.js
    ├── App.vue
    ├── assets/
    │   ├── base.css
    │   ├── main.css
    │   └── scss/
    │       ├── _variables.scss         (shared color, spacing, font vars)
    │       └── components/
    │           ├── Navbar.scss         (AppNavbar styles)
    │           ├── BulkBar.scss        (BulkBar styles)
    │           ├── EmptyState.scss     (EmptyState styles)
    │           └── TodoPanel.scss      (TodoListPanel + SweetAlert2 styles)
    ├── components/
    │   ├── ui/
    │   │   ├── AppNavbar.vue          (imports Navbar.scss)
    │   │   ├── PlansSidebar.vue
    │   │   ├── PromptModal.vue        (imports PromptModal.scss)
    │   │   └── TodoListPanel.vue      (imports TodoPanel.scss + sweetAlertHelpers)
    │   └── TodoPanel/
    │       ├── Header.vue
    │       ├── StatsBar.vue
    │       ├── BulkBar.vue
    │       ├── TodoList.vue           (has scrolling with thin scrollbars)
    │       └── EmptyState.vue
    ├── composables/
    │   ├── useDarkMode.js
    │   └── usePlans.js
    ├── services/
    │   └── storageService.js
    ├── repositories/
    │   └── plansRepository.js
    ├── utils/
    │   ├── id.js
    │   └── sweetAlertHelpers.js       (SweetAlert2 reusable functions)
    ├── layouts/
    │   └── MainLayout.vue             (sidebar toggle, overlay)
    └── views/
```


## Component Reference (short)

- `AppNavbar.vue` — Top navigation bar with branding and hamburger toggle (responsive heights: 72 → 64 → 56px).
- `PlansSidebar.vue` — Plan list + Create button; on mobile slides in via transform and uses `:data-open` attribute for state.
- `TodoListPanel.vue` — Main panel containing Header, StatsBar, BulkBar, TodoList, EmptyState and the PromptModal for adding todos. Manages modal state, selection state, and emits actions to parent handlers.
- `Header.vue` — Displays current plan name and Add/Select buttons.
- `StatsBar.vue` — Shows total/done/pending counts and progress bar.
- `BulkBar.vue` — Appears when select mode is active; provides bulk complete/delete/cancel actions.
- `TodoList.vue` — Renders todos; supports single-select vs bulk-select, row actions via modal, and now provides scrolling when list is long.
- `EmptyState.vue` — Helpful empty views for "no plan selected" and "nothing here yet".
- `PromptModal.vue` — Reusable modal (teleported to body) for creating plans/todos; becomes a bottom sheet on mobile.
- `MainLayout.vue` — Root layout managing sidebar state, overlay, and navbar. Handles mobile menu toggle and auto-close.

## Accessibility & UX Considerations

- **Semantic HTML**: Buttons with `aria-label` attributes (e.g., hamburger menu: `aria-label="Toggle menu"`)
- **Clear Actions**: Destructive actions (delete) use warning dialogs with confirmation
- **Keyboard Support**: Modal inputs respond to `Enter` (confirm) and `Esc` (cancel)
- **Touch Targets**: Mobile buttons have larger padding; bulk actions stack vertically for easier tapping
- **Color Contrast**: All text meets WCAG AA standards with proper foreground/background ratios
- **Focus Management**: Modals auto-focus input field when opened
- **Loading States**: Future: add spinner/disabled state during async operations


## State & Event Flow

### Data Flow

```
App.vue (provides usePlans composable)
  ↓
MainLayout.vue (manages sidebar toggle, passes plans to components)
  ├─ AppNavbar (emits 'toggle-sidebar')
  ├─ PlansSidebar (emits 'select' plan, 'create' plan)
  └─ TodoListPanel (emits 'add-todo', 'toggle-todo', 'delete-todo', 'set-todos-checked')
      ├─ Header (emits up via ui prop)
      ├─ StatsBar (receives computed stats)
      ├─ BulkBar (emits via ui prop)
      ├─ TodoList (emits via ui prop)
      └─ EmptyState (emits 'add-todo')
```

### Plan Selection & Persistence

- `usePlans()` composable handles all state logic
- Data stored in localStorage under key `plans` via `plansRepository.js`
- Every action (create/modify/delete) auto-saves
- App loads persisted plans on first launch

### TodoListPanel Events

`TodoListPanel.vue` emits to parent to update state:
- `add-todo` (planId, todoName)
- `toggle-todo` (planId, todoId)
- `delete-todo` (planId, [todoIds])
- `set-todos-checked` (planId, [todoIds], isChecked)

## Styling & Responsive Design

### SCSS Variables & Organization

All SCSS uses a centralized variables file at `src/assets/scss/_variables.scss`:

```scss
// Colors
$primary, $secondary              // #6366f1, #8b5cf6
$color-primary, $color-success, $color-danger
$color-gray, $color-gray-light, $color-gray-dark
$color-white, $color-border, $color-bg, $color-bg-alt

// Typography
$font-family: 'DM Sans', sans-serif
$font-size-sm, $font-size-md, $font-size-lg

// Spacing & Radius
$border-radius, $bulk-bar-radius, $empty-icon-radius

// Transitions & Shadows
$transition-fast, $transition-medium
$box-shadow-light, $box-shadow-hover

// Gradients
$gradient-primary, $gradient-alt, $gradient-success
```

**Vite Configuration:** `vite.config.js` uses `additionalData` to prepend `@use "@/assets/scss/_variables.scss" as *;` to all SCSS files, so all components automatically have access to variables without needing local imports.

### Component Styles

- **`src/assets/scss/components/Navbar.scss`** — AppNavbar styling with responsive heights
- **`src/assets/scss/components/BulkBar.scss`** — Bulk action bar with transitions
- **`src/assets/scss/components/EmptyState.scss`** — Empty state illustrations and text
- **`src/assets/scss/components/TodoPanel.scss`** — TodoListPanel layout + SweetAlert2 theme

### Responsive Breakpoints

All components follow consistent breakpoints:
- **Desktop**: >= 1024px (full layout)
- **Tablet**: 768px - 1024px (slightly reduced sizes)
- **Mobile**: < 768px (stacked, optimized for touch)

Key examples:
- `TodoListPanel` height: `calc(100vh - 72px)` → `calc(100vh - 64px)` → `calc(100vh - 56px)`
- `PlansSidebar` on mobile: fixed position with `transform: translateX(-100%)` sliding in
- `PromptModal` on mobile: sheet-style modal anchored to bottom
- `TodoList` overflow: auto with custom thin scrollbars


## SweetAlert2 Helpers

To reduce code duplication and ensure consistent styling, all SweetAlert2 modals are now managed through `src/utils/sweetAlertHelpers.js`.

### Available Helpers

```javascript
import {
  showTodoActionModal,           // Single todo: complete or delete
  showBulkActionModal,           // Multiple todos: complete all or delete all
  showDeleteTodoConfirm,         // Warning before deleting single todo
  showDeleteMultipleTodosConfirm,// Warning before deleting multiple todos
  showAlert,                     // Generic alert with custom options
  showSuccessToast,              // Auto-dismissing success notification
  showErrorToast                 // Auto-dismissing error notification
} from '@/utils/sweetAlertHelpers'
```

### Usage Example

In `TodoListPanel.vue`:

```javascript
// Before: ~40 lines of inline Swal.fire() config
// Now:    3 lines using helpers
showTodoActionModal(
  todo,
  () => { emit('set-todos-checked', props.plan.id, [todo.id], true) },
  () => { showDeleteTodoConfirm(() => { emit('delete-todo', ...) }) }
)
```

### Styling

All modals use the same custom CSS classes defined in `src/assets/scss/components/TodoPanel.scss`:
- `.swal-todo-popup` — Modal container styling
- `.swal-confirm-btn` — Gradient confirm button
- `.swal-deny-btn` — Red deny button
- `.swal-danger-btn` — Dark red delete button
- `.swal-cancel-btn` — Gray cancel button

Colors pulled from SCSS variables for consistency.

## State Management

### Plan Selection & Persistence

- Handled by `usePlans()` composable + `plansRepository.js`
- Stores/retrieves plans from localStorage under key `plans`
- Auto-saves on every action

### Component State

- `TodoListPanel.vue`: Manages modal visibility, selection mode, selected IDs
- `MainLayout.vue`: Manages sidebar open/close state
- Sidebar automatically closes after plan selection on mobile

## Known Issues & Troubleshooting

### SCSS Compilation

- If you see Sass deprecation warnings about `@import`, ensure `vite.config.js` has:
  ```javascript
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/_variables.scss" as *;`
      }
    }
  }
  ```
- All `@use` rules must appear before other rules. Vite's `additionalData` injects `@use` at the top of each file.

### Modal Issues

- If modals don't open, confirm `showModal` ref is being toggled in `TodoListPanel.vue`
- If modal styling is off, check that `TodoPanel.scss` is imported in `TodoListPanel.vue`
- SweetAlert2 styles depend on global CSS classes being available (not scoped)

### Scrolling

- `TodoList` scrollbars only visible when content exceeds container height
- Scrollbar styling customized via CSS (`::-webkit-scrollbar` for Chromium, `scrollbar-width` for Firefox)
- Issue: Scrollbar may not work if `TodoListPanel` height is `min-height` instead of `height`





---