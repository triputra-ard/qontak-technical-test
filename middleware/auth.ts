export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = authData();
  if (!authStore.isAuthenticated) {
    return navigateTo("/auth/login");
  }
});
