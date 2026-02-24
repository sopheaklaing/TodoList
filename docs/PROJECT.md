# Everyplan – Project Documentation

## Overview

**Everyplan** is a Vue 3 todo application that lets users organize tasks into plans (e.g. Work, School, Dream). Each plan has its own todo list with items that have a name and a done checkbox. Data is persisted in the browser using LocalStorage.

The app is built for production with a clear layered architecture, separation of concerns, and extensibility in mind.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Vue 3 | UI framework |
| Vue Router | Routing |
| Vite | Build tool |
| Lucide Vue Next | Icons |

**Node:** ^20.19.0 or >= 22.12.0

---

## Project Structure

```
src/
├── config/
│   └── constants.js         # Storage keys, default values
├── services/
│   └── storageService.js    # LocalStorage abstraction
├── repositories/
│   └── plansRepository.js   # Plan/todo data access
├── composables/
│   └── usePlans.js          # Application state
├── components/ui/
│   ├── AppNavbar.vue        # Header (logo, brand, dark mode)
│   ├── PlansSidebar.vue     # Plans list + Create button
│   ├── TodoListPanel.vue    # Todo list for selected plan
│   └── PromptModal.vue      # Reusable input modal
├── layouts/
│   └── MainLayout.vue       # App layout
├── app/router/
│   └── index.js             # Route definitions
├── utils/
│   └── id.js                # ID generation
├── App.vue
├── main.js
└── assets/
```

---

## Architecture

### Layered Design

```
┌─────────────────────────────────────────────────────────┐
│  UI Layer (Components)                                  │
│  AppNavbar, PlansSidebar, TodoListPanel, PromptModal    │
└─────────────────────┬───────────────────────────────────┘
                      │ props / events
┌─────────────────────▼───────────────────────────────────┐
│  State Layer (Composables)                              │
│  usePlans – reactive state, connects UI ↔ repository   │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│  Data Layer (Repository + Storage)                      │
│  plansRepository – CRUD                                 │
│  storageService – LocalStorage                          │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

1. **UI** – User actions (create plan, add todo, toggle) emit events.
2. **Composable** – `usePlans` handles events and calls the repository.
3. **Repository** – Mutates data and saves to LocalStorage.
4. **State** – Reactive state updates trigger UI re-renders.

---

## Layers

### 1. Config (`src/config/constants.js`)

Central place for:

- **STORAGE_KEYS** – LocalStorage keys (`everyplan_plans`, `everyplan_selected_plan_id`)
- **DEFAULTS** – Default names for plans and todos

### 2. Storage Service (`src/services/storageService.js`)

- `getItem(key, defaultValue)` – Read and parse JSON
- `setItem(key, value)` – Serialize and write to LocalStorage

This layer can be replaced with an API client without changing the rest of the app.

### 3. Plans Repository (`src/repositories/plansRepository.js`)

Pure functions that operate on plans:

| Function | Description |
|----------|-------------|
| `loadPlans()` | Load plans from LocalStorage, or return defaults |
| `savePlans(plans)` | Persist plans |
| `loadSelectedPlanId(plans)` | Restore selected plan ID |
| `saveSelectedPlanId(planId)` | Persist selected plan ID |
| `createPlan(plans, name)` | Add a new plan |
| `addTodo(plans, planId, name)` | Add todo to a plan |
| `toggleTodo(plans, planId, todoId)` | Toggle todo done state |

### 4. Composable (`src/composables/usePlans.js`)

- Holds `plans` and `selectedPlanId`
- Loads data on first use
- Exposes `selectedPlan` (computed)
- Exposes `createPlan`, `selectPlan`, `addTodo`, `toggleTodo`
- Persists selected plan ID when it changes

### 5. Components

| Component | Role |
|-----------|------|
| **AppNavbar** | Logo, title "Everyplan", tagline, dark mode button |
| **PlansSidebar** | Create plan, list plans, highlight selected plan |
| **TodoListPanel** | Show selected plan’s todos, add todo, toggle done |
| **PromptModal** | Modal with input for plan/todo names |
| **MainLayout** | Header + sidebar + content layout |

---

## Data Model

### Plan

```js
{
  id: string,
  name: string,
  todos: Todo[]
}
```

### Todo

```js
{
  id: string,
  name: string,
  checked: boolean
}
```

---

## LocalStorage Keys

| Key | Content |
|-----|---------|
| `everyplan_plans` | Array of plans |
| `everyplan_selected_plan_id` | ID of selected plan |

---

## Features

- Create plans with custom names
- Switch plans via sidebar
- Add todos to the selected plan
- Mark todos done via checkbox
- All changes saved to LocalStorage
- Selected plan restored on reload
- Modal dialogs for creating plans and todos
- Icons via Lucide Vue Next

---

## Getting Started

### Install Dependencies

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

---

## Extending the Project

### Add Delete Plan

1. Add `deletePlan(plans, planId)` in `plansRepository.js`.
2. Expose `deletePlan` in `usePlans.js`.
3. Add delete button/action in `PlansSidebar.vue` and emit a delete event.

### Add Edit Todo

1. Add `updateTodo(plans, planId, todoId, updates)` in `plansRepository.js`.
2. Expose it in `usePlans.js`.
3. Add inline edit or edit modal in `TodoListPanel.vue`.

### Replace LocalStorage with API

1. Implement `loadPlans`, `savePlans`, etc. with fetch/axios in `storageService.js` or a new API service.
2. Adjust `plansRepository.js` to call the API instead of LocalStorage.
3. Handle loading and error states in the composable or components.

### Dark Mode

1. Add dark mode state (e.g. in a composable or provide/inject).
2. Toggle class on `html` or `body` (e.g. `dark`).
3. Use CSS variables or Tailwind for dark theme styles.

---

## Styling

- Light theme with white/gray backgrounds
- Blue accents (`#3b82f6`) for primary actions and focus
- Black/slate text
- Borders and subtle shadows for hierarchy
- Scoped styles in Vue components

---

## File Reference

| Path | Purpose |
|------|---------|
| `src/main.js` | App bootstrap, router |
| `src/App.vue` | Root component, router-view |
| `src/index.css` | Global styles |
| `src/assets/base.css` | Base/reset styles |
| `src/assets/main.css` | Additional global styles |
| `jsconfig.json` | `@/` path alias |
| `vite.config.js` | Vite configuration |
