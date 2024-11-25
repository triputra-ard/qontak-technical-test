export default function () {
  const { $socket } = useNuxtApp();
  const messageStore = messageData();
  const { user, isAdmin } = useAuth();
  const uploading = ref(false);

  const addMessage = (message) => {
    messageStore.messageList.push(message);
    updateActiveChats(message);
  };

  const updateActiveChats = (message) => {
    if (message.userId === "system") return;

    if (
      !messageStore.activeChats.find((chat) => chat.userId === message.userId)
    ) {
      messageStore.activeChats.push({
        userId: message.userId,
        username: message.username,
        lastMessage: message.content,
        timestamp: message.timestamp,
        unread: user.value?.id !== message.userId,
      });
    } else {
      // Update existing chat
      const chatIndex = messageStore.activeChats.findIndex(
        (chat) => chat.userId === message.userId
      );
      if (chatIndex !== -1) {
        messageStore.activeChats[chatIndex] = {
          ...messageStore.activeChats[chatIndex],
          lastMessage: message.content,
          timestamp: message.timestamp,
          unread: user.value?.id !== message.userId,
        };
      }
    }
  };

  const createMessage = (
    content: string,
    userId = user.id,
    username = user.username
  ) => {
    return {
      id: Date.now(),
      content: content,
      userId,
      username,
      timestamp: new Date().toISOString(),
      type: isAdmin.value ? "admin" : "user",
    } as InfMessage;
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
        "System Assistant"
      );
      messageStore.underChatWithAdmin = true;
      $socket.emit("message", systemMessage);
    } else if (user.role === "user" && !messageStore.underChatWithAdmin) {
      $socket.emit("message", messageCreate);
      // // If there's an auto-reply and we're not in admin chat
      if (response && (!messageStore.currentChat || !isAdmin)) {
        setTimeout(() => {
          const autoReplyMessage = createMessage(
            response,
            "system",
            "System Assistant"
          );
          $socket.emit("message", autoReplyMessage);
        }, 1000);
      }
    } else if (user.role === "admin") {
      // // // Send user message
      if (messageStore.currentChat) {
        messageCreate.toUserId = messageStore.currentChat.userId;
      }

      $socket.emit("message", messageCreate);
    } else if (user.role === "user" && messageStore.underChatWithAdmin) {
      $socket.emit("message", messageCreate);
    }
  };

  const setCurrentChat = (chat) => {
    messageStore.currentChat = chat;
    const chatIndex = messageStore.activeChats.findIndex(
      (item) => item.userId === chat.userId
    );
    if (chatIndex !== -1) {
      messageStore.activeChats[chatIndex].unread = false;
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
    sendMessage,
    setCurrentChat,
    uploadFile,
    uploading,
  };
}
