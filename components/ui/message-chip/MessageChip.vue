<template>
  <div :class="classValidator">
    <div
      :class="message.attachments?.length ? 'd-flex flex-column' : 'd-block'"
    >
      <v-chip :color="messageColor" class="mb-2 pa-6">
        <div class="d-flex flex-column flex-wrap">
          <div class="d-flex align-center">
            <strong>{{ message.username }}</strong>
            <span class="text-caption ml-2">{{
              convertTime(message.timestamp)
            }}</span>
          </div>
          <p class="mt-1">{{ message.content }}</p>
        </div>
      </v-chip>
      <!-- Attachments -->
      <div v-if="message.attachments?.length" class="mt-2 mb-2">
        <template v-for="attachment in message.attachments">
          <FilePreview :url="attachment.url" :file-name="attachment.fileName" />
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { cM } from "~/utils/classMerge";
export default defineComponent({
  setup() {
    const authStore = authData();
    return { authStore };
  },
  props: {
    class: { type: String, required: false },
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isAdminMessage(): boolean {
      return this.message.type === "admin";
    },
    isSystemMessage(): boolean {
      return this.message.userId === "system";
    },
    isUserMessage(): boolean {
      return this.message.userId === this.authStore.getUser.id;
    },
    classValidator(): string {
      return cM("d-flex message", {
        "message--system": this.isSystemMessage,
        "message--user": this.isUserMessage,
        "message--other": !this.isSystemMessage && !this.isUserMessage,
        "justify-start": !this.isUserMessage,
        "justify-end": this.isUserMessage,
      });
    },
    messageColor() {
      if (this.isSystemMessage) return "info";
      if (this.isUserMessage) return "primary";
      if (this.isAdminMessage) return "green-darken-3";
      return "grey";
    },
  },
  mounted() {},
});
</script>
