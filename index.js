const ws = require("nodejs-websocket");

// function* getMessage() {
//   yield "DEBUG-MESSAGE-1";
//   yield "DEBUG-MESSAGE-2";
//   yield "DEBUG-MESSAGE-3";
//   yield "DEBUG-MESSAGE-4";
// }

const textEvent = (str, conn) => {
  console.log("Received", str);

  const payload = {
    connectionId: "DEBUG-CNN-ID-123",
    event: {
      eventType: "applicationEvent",
      message: "DEBUG-MESSAGE",
      offer: "999",
      applicantJWT: "JWT Token (From Websocket)",
    },
  };

  console.log("Sending", payload.message);

  setTimeout(() => conn.sendText(JSON.stringify(payload)), 3000);
};

const closeEvent = (code, reason) => {
  console.log("Connection closed");
};

const serverFn = (conn) => {
  console.log("New connection");
  conn.on("text", (str) => textEvent(str, conn));
  conn.on("close", closeEvent);
};

const server = ws.createServer(serverFn);
const port = process.env.PORT || 8001;

const serverCallback = async () => {
  console.log("Server running at port", port);
};

server.listen(port, serverCallback);
