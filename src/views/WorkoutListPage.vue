<template>
  <div class="flex flex-col justify-center">
    <div>
      <h1 class="text-xl font-semibold">Manage workouts</h1>
    </div>
    <div>
      <WorkoutListItem
        v-for="workout in workouts"
        :key="workout.id"
        :workout="workout"
      />
    </div>
  </div>
</template>

<script lang="ts">
import WorkoutListItem from "../components/WorkoutListItem.vue";
import { api } from "../services/api";
import type { Workout } from "../types/models";

export default {
  name: "WorkoutListPage",
  components: { WorkoutListItem },
  data(): { workouts: Workout[] } {
    return {
      workouts: [],
    };
  },
  mounted() {
    this.fetchAllWorkouts();
  },
  methods: {
    async fetchAllWorkouts() {
      try {
        const response = await api.get("/workouts");
        this.workouts = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
