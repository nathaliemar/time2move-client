import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import DashboardPage from "../views/DashboardPage.vue";
import WorkoutListPage from "../views/WorkoutListPage.vue";
import SessionDetailsPage from "../views/SessionDetailsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "DashboardPage",
    component: DashboardPage,
  },
  {
    path: "/workouts",
    name: "WorkoutListPage",
    component: WorkoutListPage,
  },
  {
    path: "/sessions/:sessionId",
    name: "SessionDetailsPage",
    component: SessionDetailsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
