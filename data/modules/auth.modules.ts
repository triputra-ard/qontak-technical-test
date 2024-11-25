const state = () => ({
  isAuthenticated: false,
  user: {},
});

const getters = {
  getUser: (state) => state.user,
};

const actions = {};

const persist = {
  pick: ["isAuthenticated", "user"],
  storage: piniaPluginPersistedstate.localStorage(),
};

export const authData = defineStore("auth-store", {
  state,
  getters,
  actions,
  persist,
});
