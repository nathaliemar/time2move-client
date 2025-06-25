<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-center p-2">
      <h1 class="text-xl font-semibold">Dashboard</h1>
    </div>
    <SessionList :sessions="sessions" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SessionList from "../components/SessionList.vue";
import { api } from "../services/api";

export default defineComponent({
  name: "DashboardPage",
  components: {
    SessionList,
  },
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
        const response = await api.get("/sessions/upcoming");
        this.sessions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
