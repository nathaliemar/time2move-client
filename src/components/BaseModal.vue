<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        @click="$emit('close')"
      >
        &times;
      </button>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseModal",
  //emits: Things the parent component needs to listen for
  emits: ["close"], // no need to pass through "submit", thanks to "slot"
});
</script>
