<template>
  <v-app-bar class="border" scroll-behavior="elevate">
    <template #prepend>
      <div class="pa-2 d-flex flex-row flex-wrap">
        <v-img
          width="3rem"
          src="/icon/qontak_q.png"
          alt="Qontak logo with blue color and q"
        />
        <h4 class="ms-4 mt-2">Qontak Chat Room</h4>
      </div>
    </template>
    <template #append>
      <v-btn
        class="text-capitalize fw-jakarta-bold"
        @click="logout"
        role="button"
        color="red-darken-3"
        ><v-icon class="ms-2 me-2" icon="mdi-logout-variant"></v-icon>
        <span class="mb-1">Keluar</span>
        <v-tooltip activator="parent" location="bottom">
          <span>Tutup chat dan keluar</span>
        </v-tooltip>
      </v-btn>
      <v-app-bar-nav-icon
        v-if="isAdmin"
        @click="toggleMenu"
      ></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
</template>
<script lang="ts" setup>
const { logout, isAdmin } = useAuth();
const { toggleMenu } = menuBar();
</script>
