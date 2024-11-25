<template>
  <v-container>
    <v-card elevation="3" height="30rem">
      <v-card-title>
        <div class="d-flex flex-row justify-space-between">
          <span
            >Ruang chat
            <template v-if="messageStore.underChatWithAdmin">
              <v-chip color="green-darken-3">Admin online</v-chip>
            </template>
          </span>
          <span class="fw-jakarta-bold"
            >Halo, {{ authStore.getUser.username }}</span
          >
        </div></v-card-title
      >
      <v-card-text class="chat-wrapper">
        <template v-for="messageItem in messageStore.getMessages">
          <message-chip :message="messageItem"></message-chip>
        </template>
      </v-card-text>
      <v-card-actions class="d-flex flex-row flex-wrap">
        <v-text-field
          v-model="chat.message"
          label="Ketik pesan anda"
          variant="solo"
          rounded="xl"
          @keydown.enter="sendChat"
        >
          <template #append>
            <v-icon
              @click="attachFile"
              class="ms-2 me-2"
              icon="mdi-paperclip"
            ></v-icon>
            <input
              @change="onFileSelected"
              ref="file-input"
              type="file"
              class="d-none"
              accept="image/*, .pdf, .docx"
            />
          </template>
          <template #append-inner>
            <v-icon
              color="light-blue-darken-4"
              class="ms-2 me-2"
              icon="mdi-send"
              @click="sendChat"
            ></v-icon>
          </template>
          <template #details>
            <template v-if="chat.attachment">
              Berkas dilampirkan :
              <span class="fw-jakarta-bold">
                {{ attachment.name }}
              </span>
            </template>
          </template>
        </v-text-field>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
const { sendMessage, uploadFile, uploading } = useMessage();

const messageStore = messageData();
const authStore = authData();

const fileInput: any = useTemplateRef("file-input");

const chat = ref({
  message: "",
  attachment: null,
});
const attachment = ref({
  name: null,
});

function attachFile() {
  // Simulate file upload and append the file to the message content
  fileInput.value.click();
}
function onFileSelected(event) {
  const file = event.target.files[0];
  if (file) {
    chat.value.attachment = file;
    attachment.value.name = file.name;
  }
}
async function sendChat() {
  try {
    // Upload files first
    const attachments = [];
    if (chat.value.attachment) {
      const url = await uploadFile(chat.value.attachment);
      attachments.push({
        url,
        fileName: chat.value.attachment.name,
        type: chat.value.attachment.type,
      });
    }
    await sendMessage(chat.value.message.trim(), attachments);

    chat.value.message = "";
    chat.value.attachment = null;
  } catch (error) {
    console.error("Failed to send message:", error);
  }
}
</script>

<style lang="scss">
.chat-wrapper {
  padding: 1rem !important;
  height: 20rem;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
