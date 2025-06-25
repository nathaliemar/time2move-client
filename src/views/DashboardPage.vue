<template>
  <div class="flex flex-col justify-center">
    <div>
      <h1 class="text-xl font-semibold">Dashboard</h1>
    </div>
    <div>
      <SessionList :sessions="sessions" />
    </div>
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
        const response = await api.get("/sessions");
        this.sessions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
