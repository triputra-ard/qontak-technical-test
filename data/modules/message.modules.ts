const state = () => ({
  messageList: [],
  activeChats: [],
  currentChat: null,
  underChatWithAdmin: false,
});

const getters = {
  getMessages(state) {
    return state.messageList;
  },
  getActiveChats(state) {
    return state.activeChats;
  },
};

const actions = {};

const persist = {
  pick: ["messageList", "activeChats", "currentChat"],
  storage: piniaPluginPersistedstate.localStorage(),
};

export const messageData = defineStore("message-store", {
  state,
  getters,
  actions,
  persist,
});
