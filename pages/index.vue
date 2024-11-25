<template>
  <home></home>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    useHead({
      title: "Qontak Technical Assesment - Home",
    });
    definePageMeta({
      layout: "default",
      middleware: "auth",
    });
  },
});
</script>
