const express = require("express");
const app = express();
const http = require("http");
const { Server, Socket } = require("socket.io");
const cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running!");
});
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    // socket.to(data.room).emit("receive_message", data);
    socket.broadcast.emit("receive_message", data);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
