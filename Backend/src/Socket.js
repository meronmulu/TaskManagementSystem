const { Server } = require("socket.io");

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        // console.log(`User connected: ${socket.id}`);

        socket.on("joinRoom", (userId) => {
            console.log(`User ${userId} joined room`);
            socket.join(`user_${userId}`);
        });

        socket.on("disconnect", () => {
            // console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
};

module.exports = setupSocket;
