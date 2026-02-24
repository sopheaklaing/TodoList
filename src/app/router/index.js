import { createRouter, createWebHashHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
