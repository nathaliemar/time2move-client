<template>
  <div class="flex flex-col justify-center max-w-xl w-full mx-auto">
    <div class="flex justify-center p-2">
      <h1 class="text-xl font-semibold">Manage workouts</h1>
    </div>
    <div>
      <div class="flex justify-end mb-2">
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-xl cursor-pointer"
          @click="openModal()"
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
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          @click="closeModal"
        >
          &times;
        </button>
        <WorkoutForm @submit="handleNewWorkoutSubmit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import WorkoutForm from "../components/WorkoutForm.vue";
import WorkoutListItem from "../components/WorkoutListItem.vue";
import { api } from "../services/api";
import type { Workout } from "../types/models";

export default {
  name: "WorkoutListPage",
  components: { WorkoutListItem, WorkoutForm },
  data(): { workouts: Workout[]; showModal: boolean } {
    return {
      workouts: [],
      showModal: false,
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
    async handleNewWorkoutSubmit(formData: object) {
      console.log(formData);
      try {
        await api.post("/workouts", formData);
        this.closeModal();
        this.fetchAllWorkouts();
      } catch (error) {
        console.log(error);
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
