const io = require("socket.io")(3000, {
    cors: {
        origin: "*",
    },
});

const users = {}

io.on('connection', soket => {
    soket.on('new-user', name => {
        users[soket.id] = name
        soket.broadcast.emit('user-connected', name)
    })

    soket.on('send-chat-message', message => {
        soket.broadcast.emit('chat-message', { message: message, name: users[soket.id] })
    })

    soket.on('disconnect', name => {
        soket.broadcast.emit('user-disconnected', users[soket.id])
        delete users[soket.id]
    })
})