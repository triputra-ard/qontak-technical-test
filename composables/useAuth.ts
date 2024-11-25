import { useToast } from "vue-toast-notification";

export default function () {
  const { $socket } = useNuxtApp();
  const authStore = authData();
  const uiStore = uiData();
  const messageStore = messageData();
  const $toast = useToast();
  const user = authStore.getUser;
  const isAuthenticated = authStore.isAuthenticated;
  const isAdmin = computed(() => authStore.getUser.role === "admin");

  const login = async (userData) => {
    try {
      const request: any = await $fetch("/api/auth/login", {
        method: "POST",
        body: userData as InfRequestUser,
      });
      authStore.isAuthenticated = true;
      authStore.user = request.data;
      setTimeout(() => {
        uiStore.loadingAuthentication = false;
      }, 1500);
      $socket.connect();
      navigateTo("/");
    } catch (error: any) {
      console.log("error:", error);
      $toast.error(error, {
        position: "top",
      });
      setTimeout(() => {
        uiStore.loadingAuthentication = false;
      }, 1500);
    }
  };

  const logout = () => {
    authStore.isAuthenticated = false;
    authStore.user = {};
    messageStore.messageList = [];

    $socket.off("message");
    $socket.off("request-admin");
    $socket.disconnect();
    navigateTo("/auth/login");
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
  };
}
