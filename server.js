const io = require("socket.io")();

io.on("connection", client => {
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
    } else {
      client.join(roomId);
      client.to(roomId).emit("requestGame");
    }
  });
  client.on("joinRoom", roomId => {
    console.log(`Player ${client.id} is joining a new Room ${roomId}`);
    client.join(roomId);
  });
  client.on("sendSetup", data => {
    const roomId = data.gameCode;
    console.log(`Requesting room ${roomId} for setup data `);
    client.to(roomId).emit("setupGame", data);
  });
  client.on("gameMove", req => {
    // const room = io.sockets.adapter.rooms[client.id];
    const { room, data } = req;
    client.to(room).emit("turnData", data);
    console.log("Player made a move ", room, data);
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
