<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-center p-2">
      <h1 class="text-xl font-semibold">Dashboard</h1>
    </div>
    <div class="max-w-xl w-full mx-auto">
      <h3 class="text-center mb-2">Your upcoming workouts</h3>
      <div class="flex justify-end mb-2">
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-xl cursor-pointer"
          @click="openModal()"
        >
          Add new session
        </button>
      </div>
      <SessionListItem
        v-for="session in sessions"
        :key="session.id"
        :session="session"
        @click="openEditModal(session)"
      />
    </div>
    <BaseModal v-if="showModal" @close="closeModal">
      <SessionForm
        v-if="selectedSession"
        :session="selectedSession"
        :workouts="workouts"
        @submit="handleEditSessionSubmit"
        @delete="handleDeleteSession"
      />
      <SessionForm
        v-else
        :workouts="workouts"
        @submit="handleNewSessionSubmit"
      />
    </BaseModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { api } from "../services/api";
import SessionListItem from "../components/SessionListItem.vue";
import type { Session, Workout } from "../types/models";
import BaseModal from "../components/BaseModal.vue";
import SessionForm from "../components/SessionForm.vue";
import type { RouteLocationNormalized } from "vue-router";

export default defineComponent({
  name: "DashboardPage",
  components: {
    SessionListItem,
    BaseModal,
    SessionForm,
  },
  data(): {
    sessions: Session[];
    showModal: boolean;
    workouts: Workout[];
    selectedSession: Session | null;
  } {
    return {
      sessions: [],
      showModal: false,
      workouts: [],
      selectedSession: null,
    };
  },
  //watch route to open/close modal accordingly
  //to = new route object, to is naming convention
  watch: {
    $route(to: RouteLocationNormalized) {
      if (to.name === "EditSessionModal") {
        const sessionId = to.params.sessionId;
        this.selectedSession =
          this.sessions.find((s: Session) => s.id === sessionId) ?? null;
      }
    },
    //watch Session changes
    sessions: {
      handler(newSessions) {
        if (this.$route.name === "EditSessionModal") {
          const sessionId = this.$route.params.sessionId;
          this.selectedSession =
            newSessions.find((s: Session) => s.id === sessionId) ?? null;
        }
      },
      immediate: false,
    },
  },
  mounted() {
    this.fetchAllSessions();
    this.fetchAllWorkouts();
    if (this.$route.name === "EditSessionModal") {
      const sessionId = this.$route.params.sessionId;
      this.selectedSession =
        this.sessions.find((s: Session) => s.id === sessionId) ?? null;
      this.showModal = true;
    }
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
    async fetchAllWorkouts() {
      try {
        const response = await api.get("/workouts");
        this.workouts = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async handleNewSessionSubmit(formData: object) {
      try {
        await api.post("/sessions", formData);
        this.closeModal();
        this.fetchAllSessions();
      } catch (error) {
        console.log(error);
      }
    },
    async handleEditSessionSubmit(formData: object) {
      if (!this.selectedSession) return;
      try {
        await api.put(`/sessions/${this.selectedSession.id}`, formData);
        this.closeModal();
        this.fetchAllSessions();
      } catch (error) {
        console.log(error);
      }
    },
    async handleDeleteSession() {
      if (!this.selectedSession) return;
      try {
        await api.delete(`/sessions/${this.selectedSession.id}`);
        this.closeModal();
        this.fetchAllSessions();
      } catch (error) {
        console.log(error);
      }
    },
    openModal() {
      this.showModal = true;
    },
    openEditModal(session: Session) {
      this.selectedSession = session;
      this.showModal = true;
      this.$router.push(`/sessions/${session.id}`);
    },
    closeModal() {
      this.showModal = false;
      this.selectedSession = null;
      this.$router.push("/");
    },
  },
});
</script>
