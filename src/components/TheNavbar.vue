<template>
  <nav
    class="sticky top-0 w-full bg-white text-gray-900 flex items-center justify-between px-8 py-2 border-b border-gray-200 shadow-sm z-50"
  >
    <router-link
      to="/"
      class="text-xl font-semibold tracking-tight text-orange-500 hover:text-orange-600 transition-colors duration-150"
    >
      time2move
    </router-link>
    <div class="flex gap-5">
      <router-link
        to="/"
        class="relative text-gray-700 hover:text-orange-500 transition-colors duration-150 text-base px-1 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-orange-400 after:transition-all after:duration-200 hover:after:w-full after:mt-1"
      >
        Home
      </router-link>
      <router-link
        to="/workouts"
        class="relative text-gray-700 hover:text-orange-500 transition-colors duration-150 text-base px-1 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-orange-400 after:transition-all after:duration-200 hover:after:w-full after:mt-1"
      >
        Workouts
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheNavbar",
});
</script>
