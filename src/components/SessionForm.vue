<template>
  <form
    class="flex flex-col gap-4 p-4 bg-white rounded shadow"
    @submit.prevent="submitForm"
  >
    <div class="flex flex-col gap-2">
      <label for="notes" class="font-semibold text-gray-700">Notes</label>
      <input
        id="notes"
        v-model="notes"
        type="text"
        name="notes"
        placeholder="Any notes for this session..."
        class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label for="date" class="font-semibold text-gray-700">Date & Time</label>
      <input
        id="date"
        v-model="date"
        type="datetime-local"
        name="date"
        class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <label for="workout" class="font-semibold text-gray-700">Workout</label>
      <select
        id="workout"
        v-model="selectedWorkoutId"
        name="workout"
        class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      >
        <option value="" disabled>Select a workout</option>
        <option
          v-for="workout in workouts"
          :key="workout.id"
          :value="workout.id"
        >
          {{ workout.name }}
        </option>
      </select>
    </div>
    <button
      type="submit"
      class="self-end bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
    >
      Save
    </button>
    <button
      v-if="session"
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

//To display the date+time in the datepicker (from Isostring)
function toDatetimeLocal(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  // Pad with zeros for month, day, hour, minute
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );
}

export default defineComponent({
  name: "SessionForm",
  props: {
    workouts: {
      type: Array as () => Workout[],
      required: true,
    },
    session: {
      type: Object,
      default: null,
    },
  },
  emits: ["submit", "delete"],
  data() {
    return {
      notes: this.session ? this.session.notes : "",
      date: this.session ? toDatetimeLocal(this.session.date) : "",
      selectedWorkoutId: this.session ? this.session.workoutId : "",
    };
  },
  watch: {
    session: {
      handler(newSession) {
        this.notes = newSession ? newSession.notes : "";
        this.date = newSession ? toDatetimeLocal(newSession.date) : "";
        this.selectedWorkoutId = newSession ? newSession.workoutId : "";
      },
      immediate: true,
    },
  },
  methods: {
    submitForm() {
      this.$emit("submit", {
        notes: this.notes,
        date: this.date ? new Date(this.date).toISOString() : "",
        workoutId: this.selectedWorkoutId,
      });
      //If time: Reset form properly
    },
    handleDelete() {
      this.$emit("delete");
    },
  },
});
</script>
