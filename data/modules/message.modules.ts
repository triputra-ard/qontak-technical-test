const state = () => ({
  messageList: [],
});

const getters = {
  getMessages(state) {
    return state.messageList;
  },
};

const actions = {};

const persist = {
  pick: ["messageList"],
  storage: piniaPluginPersistedstate.localStorage(),
};

export const messageData = defineStore("message-store", {
  state,
  getters,
  actions,
  persist,
});
