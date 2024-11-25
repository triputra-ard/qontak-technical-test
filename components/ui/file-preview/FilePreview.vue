<template>
  <div class="file-preview">
    <div v-if="isImage" class="image-preview">
      <v-img
        :src="url"
        :max-height="200"
        :max-width="300"
        contain
        @click="openFullSize"
      />
    </div>
    <div v-else class="file-link">
      <v-btn
        variant="text"
        :href="url"
        target="_blank"
        prepend-icon="mdi-file-download"
      >
        {{ fileName }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const isImage = computed(() => {
  const ext = props.fileName.split(".").pop()?.toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
});

const openFullSize = () => {
  window.open(props.url, "_blank");
};
</script>
