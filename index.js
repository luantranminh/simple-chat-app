const app = require("./config/express");
const User = require("./api/models/User");
const Chat = require("./api/models/Chat");
const userFunc = require("./api/controllers/UserController");
const server = require("http").Server(app);
var io = require("socket.io")(server);

// Create table if not exists
User.sync();
Chat.sync();

server.listen(80);
io.sockets.on("connection", function(socket) {
  socket.on("set user", function(username) {
    userFunc.setSocketID({ socketid: socket.id, username: username });
  });

  socket.on("send to user", function(receiver, sender, msg) {
    userFunc
      .getSocketID({ username: receiver })
      .then(r => {
        socket.broadcast
          .to(r.socketid)
          .emit("my message", { sender: sender, text: msg });
      })
      .catch(() => {});
  });

  socket.on("reading", function(receiver) {
    userFunc
      .getSocketID({ username: receiver })
      .then(r => {
        socket.broadcast.to(r.socketid).emit("read msg", { server: true });
      })
      .catch(() => {});
  });
});

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => {
  console.log(`Running on localhost:${port}`);
});
module.exports = app;
