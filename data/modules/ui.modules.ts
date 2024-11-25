const state = () => ({
  data: "Hello world",
  loadingAuthentication: false,
  menuBar: {
    show: false,
  },
});

const getters = {};

const actions = {};

const persist = {};

export const uiData = defineStore("ui-store", {
  state,
  getters,
  actions,
  persist,
});
