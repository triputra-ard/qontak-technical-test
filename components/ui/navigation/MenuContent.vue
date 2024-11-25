<template>
  <v-navigation-drawer
    location="right"
    temporary
    v-model="uiStore.menuBar.show"
  >
    <v-list class="pa-2">
      <v-list-item>
        <v-list-item-title class="text-center fw-jakarta-bold"
          >Percakapan Admin
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <template v-for="chatItem in messageStore.getActiveChats">
        <v-list-item
          :active="messageStore.currentChat?.userId === chatItem.userId"
          @click="setCurrentChat(chatItem)"
        >
          <v-list-item-title>{{ chatItem.username }}</v-list-item-title>
          <v-list-item-subtitle class="text-truncate">
            {{ chatItem.lastMessage }}
          </v-list-item-subtitle>
          <template v-slot:append>
            <v-badge v-if="chatItem.unread" color="error" dot />
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
const uiStore = uiData();
const messageStore = messageData();
const { toggleMenu } = menuBar();
const { setCurrentChat } = useMessage();
</script>
