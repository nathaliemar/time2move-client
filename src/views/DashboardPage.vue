<template>
  <div class="flex flex-col justify-center">
    <div>
      <h1 class="text-xl font-semibold">Dashboard</h1>
    </div>
    <div>
      <p v-text="sessions"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { api } from "../services/api";

export default {
  name: "DashboardPage",
  data() {
    return {
      sessions: [],
    };
  },
  mounted() {
    this.fetchAllSessions();
  },
  methods: {
    async fetchAllSessions() {
      try {
        const response = await api.get("/sessions");
        this.sessions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
