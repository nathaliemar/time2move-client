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
        @click="openEditModal(workout)"
      />
    </div>
    <BaseModal v-if="showModal" @close="closeModal">
      <WorkoutForm
        v-if="selectedWorkout"
        :workout="selectedWorkout"
        @submit="handleEditWorkoutSubmit"
      />
      <WorkoutForm v-else @submit="handleNewWorkoutSubmit" />
    </BaseModal>
  </div>
</template>

<script lang="ts">
import type { RouteLocationNormalized } from "vue-router";
import BaseModal from "../components/BaseModal.vue";
import WorkoutForm from "../components/WorkoutForm.vue";
import WorkoutListItem from "../components/WorkoutListItem.vue";
import { api } from "../services/api";
import type { Workout } from "../types/models";

export default {
  name: "WorkoutListPage",
  components: { WorkoutListItem, WorkoutForm, BaseModal },
  data(): {
    workouts: Workout[];
    showModal: boolean;
    selectedWorkout: Workout | null;
  } {
    return {
      workouts: [],
      showModal: false,
      selectedWorkout: null,
    };
  },

  //watch route to open/close modal accordingly
  //to = new route object, to is naming convention
  watch: {
    $route(to: RouteLocationNormalized) {
      if (to.name === "EditWorkoutModal") {
        const workoutId = to.params.workoutId;
        this.selectedWorkout =
          this.workouts.find((w: Workout) => w.id === workoutId) ?? null;
        this.showModal = true;
      } else {
        this.showModal = false;
        this.selectedWorkout = null;
      }
    },
  },
  mounted() {
    this.fetchAllWorkouts();
    if (this.$route.name === "EditWorkoutModal") {
      const workoutId = this.$route.params.workoutId;
      this.selectedWorkout =
        this.workouts.find((w: Workout) => w.id === workoutId) ?? null;
      this.showModal = true;
    }
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
    async handleEditWorkoutSubmit(formData: object) {
      if (!this.selectedWorkout) return;
      try {
        await api.put(`/workouts/${this.selectedWorkout.id}`, formData);
        this.closeModal();
        this.fetchAllWorkouts();
      } catch (error) {
        console.log(error);
      }
    },

    openModal() {
      this.showModal = true;
    },
    openEditModal(workout: Workout) {
      this.selectedWorkout = workout;
      this.showModal = true;
      this.$router.push(`/workouts/${workout.id}`);
    },
    closeModal() {
      this.showModal = false;
      this.selectedWorkout = null;
      this.$router.push("/workouts");
    },
  },
};
</script>
