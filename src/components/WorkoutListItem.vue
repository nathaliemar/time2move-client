<template>
  <li class="p-4 border-b border-gray-200 flex flex-col gap-1">
    <span class="font-semibold text-lg text-gray-800">{{ workout.name }}</span>
    <span v-if="workout.description" class="text-gray-600">{{
      workout.description
    }}</span>
    <span v-if="workout.duration" class="text-sm text-gray-500"
      >Duration: {{ workout.duration }} min</span
    >
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Workout } from "../types/models";

export default defineComponent({
  name: "WorkoutListItem",
  props: {
    workout: {
      type: Object as PropType<Workout>,
      required: true,
    },
  },
});
</script>
