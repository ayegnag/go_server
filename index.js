const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

io.on("connection", client => {
  console.log("Got WS connection", client.id);

  client.on("createGane", roomId => {
    console.log("Client is creating a new game room ", client.id, roomId);
    client.join(roomId);
  });
  client.on("joinGame", roomId => {
    console.log(`Player ${client.id} is joining a new Game  ${roomId}`);
    const roomInfo = io.sockets.adapter.rooms[roomId];
    console.log("TCL: roomInfo", roomInfo);
    if (roomInfo === undefined) {
      client.emit("wrongCode");
    } else if (roomInfo.sockets.length >= 2) {
      client.emit("roomFull");
    } else {
      client.join(roomId);
      client.to(roomId).emit("requestGame");
    }
  });
  client.on("joinRoom", roomId => {
    console.log(`Player ${client.id} is Creating a new Room ${roomId}`);
    client.join(roomId);
  });
  client.on("sendSetup", data => {
    const roomId = data.gameCode;
    console.log(`Requesting room ${roomId} for setup data `);
    client.to(roomId).emit("setupGame", data);
  });
  client.on("sendShout", data => {
    const roomId = data.gameCode;
    console.log(`Sending shout to room ${roomId}`);
    client.to(roomId).emit("gotShout", data.shout);
  });
  client.on("gameMove", req => {
    // const room = io.sockets.adapter.rooms[client.id];
    const { room, data } = req;
    client.to(room).emit("turnData", data);
    console.log("Player made a move ", room);
  });
  client.on("chatMsg", req => {
    const { roomId, msg } = req;
    client.to(roomId).emit("gotChat", msg);
    console.log("Player sent msg ", msg);
  });
  client.on("typing", roomId => {
    client.to(roomId).emit("typing");
    console.log(`Player ${client.id} is typing... `);
  });
  client.on("notTyping", roomId => {
    client.to(roomId).emit("stopTyping");
    console.log(`Player ${client.id} is Not typing. `);
  });
  // client.on("disconnect", () => {
  //   const rooms = Object.keys(client.rooms);
  //   console.log("TCL: rooms", rooms);
  //   // client.to(roomId).emit("gotChat", msg);
  //   // console.log("Player sent msg ", msg);
  // });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Express server is running on localhost: ${PORT}`)
);
