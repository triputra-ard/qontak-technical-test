import { Server } from "socket.io";

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Allow all origins
      methods: ["GET", "POST"], // Allow specific HTTP methods
    },
  });

  // // Increase max payload size for file transfers
  io.maxHttpBufferSize = 1e7; // 10 MB

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("message", (message) => {
      io.emit("message", message);

      console.log("Message received:", {
        userId: message.userId,
        username: message.username,
        content: message.content,
        type: message.type,
      });
    });

    socket.on("request-admin", (request) => {
      console.log("Admin request received:", request);
      io.emit("admin-request", request);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
