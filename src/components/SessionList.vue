<template>
  <div class="max-w-xl w-full mx-auto">
    <h3 class="text-center">Your upcoming workouts</h3>
    <SessionListItem
      v-for="session in sessions"
      :key="session.id"
      :session="session"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Session } from "../types/models";
import SessionListItem from "./SessionListItem.vue";

export default defineComponent({
  name: "SessionList",
  components: {
    SessionListItem,
  },
  //"Register" received props in order to use them
  props: {
    sessions: {
      type: Array as PropType<Session[]>,
      required: true,
    },
  },
});
</script>
