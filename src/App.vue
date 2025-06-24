<script lang="ts">
import { defineComponent } from "vue";
import TheNavbar from "./components/TheNavbar.vue";

export default defineComponent({
  name: "App",
  components: { TheNavbar },
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <TheNavbar class="fixed top-0 left-0 w-full z-50 shadow bg-white" />
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
