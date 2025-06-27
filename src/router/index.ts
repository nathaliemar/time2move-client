import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import DashboardPage from "../views/DashboardPage.vue";
import WorkoutListPage from "../views/WorkoutListPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "DashboardPage",
    component: DashboardPage,
  },
  {
    path: "/workouts/:workoutId",
    name: "EditWorkoutModal",
    component: WorkoutListPage,
  },
  {
    path: "/workouts",
    name: "WorkoutListPage",
    component: WorkoutListPage,
  },
  {
    path: "/sessions/:sessionId",
    name: "EditSessionModal",
    component: DashboardPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
