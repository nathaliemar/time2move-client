<template>
  <div class="p-4 border rounded-xl border-gray-200 m-4">
    <div class="font-semibold text-lg mb-0.5">
      {{ session.workout.name }}
    </div>
    <div v-if="session.notes" class="text-gray-600 text-sm">
      ℹ️ <span class="opacity-80">{{ session.notes }}</span>
    </div>
    <div class="text-sm mt-1">📅 {{ formattedDate }}</div>
    <div class="text-sm mt-1">🕒 {{ formattedTime }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Session } from "../types/models";
import { formatSessionTime } from "../utils/dateTimeUtils";

export default defineComponent({
  name: "SessionListItem",
  props: {
    session: {
      type: Object as PropType<Session>,
      required: true,
    },
  },
  computed: {
    formattedDate(): string {
      const date = new Date(this.session.date);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
    },
    formattedTime(): string {
      return formatSessionTime(
        this.session.date,
        this.session.workout.duration || 0,
      );
    },
  },
});
</script>
