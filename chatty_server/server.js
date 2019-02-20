const express = require("express");
const SocketServer = require("ws").Server;
const uuid = require("uuid");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

//deals with number of users
userCount = ws => {
  const users = {
    type: "incomingCount"
  };
  users.count = wss.clients.size;
  wss.clients.forEach(client => {
    client.send(JSON.stringify(users));
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client connected");
  userCount(ws);
  ws.on("message", function incoming(message) {
    message = JSON.parse(message);
    message.id = uuid();

    console.log(
      "type",
      message.type,
      "User",
      message.username,
      "said:",
      message.content
    );

    message.type = "incomingMessage";
    newMessage = JSON.stringify(message);
    console.log(newMessage);

    wss.clients.forEach(client => {
      client.send(newMessage);
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
    userCount(ws);
  });
});
