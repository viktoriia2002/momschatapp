const express = require("express");
const path = require("path");
const messenger = require("socket.io")();

const app = express();
app.use(express.static("public"));

const port = process.env.PORT || 5050;
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const server = app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

messenger.attach(server);

messenger.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);

    socket.emit('connected', { socketID: `${socket.id}`, message: 'a new connection' });

    socket.on('chatmessage', function(message) {
        console.log(message);
        messenger.emit('message', { id: socket.id, message: message })
    });

    socket.on("disconnect", () => {
        console.log("a user has disconnected");
    })
});