<template>
  <div class="flex flex-col justify-center max-w-xl w-full mx-auto">
    <div class="flex justify-center p-2">
      <h1 class="text-xl font-semibold">Manage workouts</h1>
    </div>
    <div>
      <div class="flex justify-end mb-2">
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-xl"
        >
          Add new workout type
        </button>
      </div>
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
