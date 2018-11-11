const express = require('express');
const app = express();
const socket = require('socket.io');
const port = 3000;

const server = app.listen(port, () => console.log(`app listening on port ${port}!`));
// static files
app.use(express.static('public'));

const io = socket(server);

io.on('connection', socket => {
    console.log("made socket connection", socket.id);
    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data);
    });
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });
});
