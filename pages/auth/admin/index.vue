<template>
  <section
    class="d-flex flex-row flex-wrap justify-lg-center align-center h-100"
  >
    <v-col class="mt-4 mt-lg-0" cols="12" lg="5">
      <v-card elevation="3">
        <v-card-text class="pa-5 d-flex flex-column flex-wrap">
          <v-img
            class="mb-5 mt-5"
            height="5rem"
            src="/icon/qontak_q.png"
          ></v-img>
          <h3 class="text-center">Admin Qontak</h3>
          <v-form class="mt-6" @submit.prevent="loginToServer">
            <v-text-field
              class="mb-4"
              rounded="xl"
              variant="outlined"
              density="compact"
              placeholder="Masukkan username anda"
              aria-labelledby="Username"
              v-model="username"
              :rules="rules"
              type="text"
            ></v-text-field>
            <v-text-field
              class="mb-4"
              rounded="xl"
              variant="outlined"
              density="compact"
              placeholder="Masukkan passkey admin"
              aria-labelledby="Passkey"
              v-model="passkey"
              :rules="rules"
              :type="uiPasskey.type"
            >
              <template #append-inner>
                <v-icon :icon="uiPasskey.icon" @click="togglePassword"></v-icon>
              </template>
            </v-text-field>
            <v-btn
              :loading="uiStore.loadingAuthentication"
              :disabled="uiStore.loadingAuthentication"
              elevation="0"
              type="submit"
              class="text-capitalize"
              role="button"
              block
              color="primary"
              >Masuk admin</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </section>
</template>
<script lang="ts" setup>
import { useToast } from "vue-toast-notification";

definePageMeta({
  layout: "blank",
});
const uiStore = uiData();
const $toast = useToast();
const username = ref("");
const passkey = ref("");
const rules = ref([
  (value) => {
    if (value) {
      return true;
    }
    return "Input harus diisi";
  },
]);
const uiPasskey = ref({
  type: "password",
  icon: "mdi-eye",
});

const { login } = useAuth();

async function loginToServer(event) {
  const validator = await event;
  const userData = {
    username: username.value,
    passkey: passkey.value,
  };
  if (validator.valid) {
    uiStore.loadingAuthentication = true;
    login(userData);
  } else {
    $toast.error("Input harus diisi", {
      position: "top",
    });
  }
}
function togglePassword() {
  if (uiPasskey.value.type === "password") {
    uiPasskey.value.type = "text";
    uiPasskey.value.icon = "mdi-eye-off";
  } else {
    uiPasskey.value.type = "password";
    uiPasskey.value.icon = "mdi-eye";
  }
}
onMounted(() => {
  uiStore.loadingAuthentication = false;
});
</script>
