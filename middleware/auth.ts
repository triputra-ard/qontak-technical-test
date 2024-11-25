export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = await authData();
  if (!authStore.isAuthenticated && to.path !== "/auth/login") {
    return navigateTo("/auth/login"); // Redirect to login page if not authenticated
  } else if (!authStore.isAuthenticated && to.path !== "/auth/login") {
    return navigateTo("/auth/login");
  }
});
