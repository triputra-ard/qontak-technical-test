<template>
  <v-app class="with-navbar">
    <navigation-menu-bar></navigation-menu-bar>
    <template v-if="isAdmin">
      <navigation-menu-content></navigation-menu-content>
    </template>

    <v-main class="pa-0 pa-lg-5">
      <slot></slot>
    </v-main>
  </v-app>
</template>
<script lang="ts" setup>
const { isAdmin } = useAuth();
const { menuActive } = menuBar();
</script>

<style lang="scss">
.v-application {
  &.with-navbar {
    .v-main {
      margin-top: 5rem;
    }
  }
}
</style>
