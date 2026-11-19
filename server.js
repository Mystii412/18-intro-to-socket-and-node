const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3001;
const messages = []
 
app.get("/", (req, res) => {
    
  res.sendFile(__dirname + "/pages/index.html");
});
 
app.get("/fortnitepiratetoken", (req, res) => {
  res.send("<h1>fortnite pirate token</h1>");
});
 
io.on("connection", (socket) => {
  console.log(`a user connected`);
 for (let message of messages){
    socket.emit("message", message)
 }
    socket.on("set username", (uname)=>{
        socket.name = uname
        

    // Source - https://stackoverflow.com/a/59479502
// Posted by Marcos Casagrande, modified by community. See post 'Timeline' for change history
// Retrieved 2026-11-19, License - CC BY-SA 4.0
    socket.on("base64 file", function (msg) {
        console.log("received base64 file from server: " + msg.fileName);
        socket.username = msg.username;
        io.emit(
            "base64 image", //exclude sender
            // io.sockets.emit(
            //   "base64 file", //include sender

            {
                file: msg.file,
                fileName: msg.fileName,
            },
        );
    });
    })


  socket.on("chat message", (msg) => {
    let messageObj = { user: socket.name, text: msg };
    messages.push(messageObj);
    io.emit("message", messageObj);
  });


  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
 
server.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

