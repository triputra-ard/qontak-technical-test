export default function () {
  const { $socket } = useNuxtApp();
  const messageStore = messageData();
  const activeChats = useState("activeChats", () => []);
  const currentChat = useState("currentChat", () => null);
  const { user, isAdmin } = useAuth();
  const uploading = ref(false);

  const addMessage = (message) => {
    messageStore.messageList.push(message);
    updateActiveChats(message);
  };

  const updateActiveChats = (message) => {
    if (message.userId === "system") return;

    const existingChat = activeChats.value.find(
      (chat) => chat.userId === message.userId
    );

    if (existingChat) {
      existingChat.lastMessage = message.content;
      existingChat.timestamp = message.timestamp;
      existingChat.unread =
        user.id !== message.userId &&
        (!currentChat.value || currentChat.value.userId !== message.userId);
    } else if (message.userId !== user.id) {
      activeChats.value.push({
        userId: message.userId,
        username: message.username,
        lastMessage: message.content,
        timestamp: message.timestamp,
        unread: true,
      });
    }
  };

  const createMessage = (
    content: object,
    userId = user.id,
    username = user.username
  ) => {
    return {
      id: Date.now(),
      content,
      userId,
      username,
      timestamp: new Date().toISOString(),
      type: isAdmin.value ? "admin" : "user",
    };
  };

  const sendMessage = async (content, attachments = []) => {
    if (!user) return;
    const messageCreate = createMessage(content);
    if (attachments.length > 0) {
      Object.assign(messageCreate, { attachments: attachments });
    }
    const { response, isAdminRequest } =
      AutoReplyEngine.processMessage(content);

    if (isAdminRequest) {
      Object.assign(messageCreate, {
        requestType: "admin",
      });

      $socket.emit("request-admin", messageCreate);
      // Send system message about admin connection
      const systemMessage = createMessage(
        response || "Connecting you with an admin. Please wait...",
        "system",
        "System"
      );
      $socket.emit("message", systemMessage);
    } else {
      // // // Send user message
      if (currentChat.value) {
        messageCreate.toUserId = currentChat.value.userId;
      }

      $socket.emit("message", messageCreate);
      // // If there's an auto-reply and we're not in admin chat
      if (response && (!currentChat.value || !isAdmin.value)) {
        setTimeout(() => {
          const autoReplyMessage = createMessage(
            response,
            "system",
            "System Assistant"
          );
          $socket.emit("message", autoReplyMessage);
        }, 1000);
      }
    }
  };

  const setCurrentChat = (chat) => {
    currentChat.value = chat;
    const chatIndex = activeChats.value.findIndex(
      (c) => c.userId === chat.userId
    );
    if (chatIndex !== -1) {
      activeChats.value[chatIndex].unread = false;
    }
  };

  onMounted(() => {
    $socket.on("disconnect", () => {
      console.log("Disconnected");
    });
    $socket.on("message", (message) => {
      addMessage(message);
    });
    $socket.on("admin-request", (request) => {
      if (isAdmin.value) {
        addMessage({
          id: Date.now(),
          content: `User ${request.username} requests admin support`,
          userId: "system",
          username: "System",
          timestamp: new Date().toISOString(),
          requestingUserId: request.userId,
        });
      }
    });
  });

  const uploadFile = async (file) => {
    try {
      uploading.value = true;
      const formData = new FormData();
      formData.append("file", file);

      const response = await $fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      uploading.value = false;
      return response.url;
    } catch (error) {
      console.error("Upload failed:", error);
      uploading.value = false;
      throw error;
    }
  };

  return {
    activeChats,
    currentChat,
    sendMessage,
    setCurrentChat,
    uploadFile,
    uploading,
  };
}
