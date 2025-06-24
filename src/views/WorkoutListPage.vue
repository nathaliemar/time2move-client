<template>
  <div class="flex flex-col justify-center">
    <div>
      <h1 class="text-xl font-semibold">Manage workouts</h1>
    </div>
    <div>
      <p v-text="workouts"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { api } from "../services/api";

export default {
  name: "WorkoutListPage",
  data() {
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
