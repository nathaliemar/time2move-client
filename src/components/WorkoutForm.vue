<template>
  <form
    class="flex flex-col gap-4 p-4 bg-white rounded shadow"
    @submit.prevent="submitForm"
  >
    <div class="flex flex-col gap-2">
      <label for="name" class="font-semibold text-gray-700">Workout name</label>
      <input
        id="name"
        v-model="name"
        type="text"
        name="name"
        placeholder="Volleyball, Weightlifting, ..."
        class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <label for="description" class="font-semibold text-gray-700"
        >Description</label
      >
      <input
        id="description"
        v-model="description"
        type="text"
        name="description"
        placeholder="Location, name of coach, ..."
        class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <label for="duration" class="font-semibold text-gray-700">Duration</label>
      <input
        id="duration"
        v-model="duration"
        type="number"
        name="duration"
        class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <small class="text-gray-500">Enter the workout duration in minutes</small>
    </div>
    <button
      type="submit"
      class="self-end bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
    >
      Save
    </button>
    <button
      v-if="workout"
      type="button"
      class="self-end bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors cursor-pointer mt-2"
      @click="handleDelete"
    >
      Delete
    </button>
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { Workout } from "../types/models";

export default defineComponent({
  name: "WorkoutForm",
  props: {
    workout: {
      type: Object as () => Workout | null,
      default: null,
    },
  },
  //define which events the child can pass to parent:
  emits: ["submit", "delete"],
  data() {
    return {
      name: this.workout ? this.workout.name : "",
      description: this.workout ? this.workout.description : "",
      duration: this.workout ? this.workout.duration : null,
    };
  },
  watch: {
    workout: {
      handler: "handleWorkoutPropChange",
      immediate: true,
    },
  },
  methods: {
    submitForm() {
      //Emit form data to parent
      this.$emit("submit", {
        name: this.name,
        description: this.description,
        duration: this.duration,
      });
      //Reset form
      this.name = "";
      this.description = "";
      this.duration = null;
    },
    handleDelete() {
      this.$emit("delete");
    },
    handleWorkoutPropChange(newWorkout: Workout | null) {
      this.name = newWorkout ? newWorkout.name : "";
      this.description = newWorkout ? newWorkout.description : "";
      this.duration = newWorkout ? newWorkout.duration : null;
    },
  },
});
</script>
