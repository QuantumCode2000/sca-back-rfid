const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let rfidCode = "";

app.post("/api/rfid", (req, res) => {
  rfidCode = req.body.rfid;
  console.log(`Received RFID code: ${rfidCode}`);
  io.emit("rfid", rfidCode); // Emitir evento de código RFID
  res.send("RFID code received");
});

app.get("/api/rfid", (req, res) => {
  res.send(rfidCode);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
