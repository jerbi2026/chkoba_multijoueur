








/*const { Server } = require('socket.io');
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = new Server(http);

const publicPath = path.join(__dirname, 'public');
const htmlFilePath = path.join(publicPath, 'home', 'index.html');
const htmlFilePathjeu = path.join(publicPath, 'jeu', 'deux_joueurs.html');


app.use(express.static(publicPath));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client/dist'));


app.get('/', (req, res) => {
    res.sendFile(htmlFilePath);
});
app.get('/jeu/deux_joueurs', (req, res) => {
    res.sendFile(htmlFilePathjeu);
});

const rooms = new Map();



io.on('connection', (socket) => {
    console.log(`Nouvelle connexion ${socket.id}`);

    socket.on('createRoom', ({ username }) => {
        const roomId = generateRoomId();
        const room = {
            id: roomId,
            players: [{ socketId: socket.id, username }],
            code: generateRoomCode(), 
            commonCards:[]

        };
        rooms.set(roomId, room);
        socket.join(roomId);
        io.to(socket.id).emit('roomCreated', room.code);
    });
    

    socket.on('joinRoom', ({ code, username }) => {
        console.log('Tentative de rejoindre la salle avec le code :', code);
        const roomId = findRoomIdByCode(code);
        
        if (roomId) {
            const room = rooms.get(roomId);
    
            if (room && room.players.length < 2) {
                const player = { socketId: socket.id, username, playerCards: [] };
    
                room.players.push(player);
                socket.join(roomId);
    
                io.to(roomId).emit('startGame', roomId);
    
                io.to(socket.id).emit('updateCommonCards', room.commonCards);
    
                socket.on('updatePlayerCards', (kaf_joeur) => {
                    player.playerCards = kaf_joeur;
    
                    io.to(roomId).emit('updatePlayerCards', kaf_joeur);

    
                    socket.to(roomId).emit('updateOtherPlayerCards', { playerId: socket.id, playerCards: kaf_joeur });
                });
    
                socket.on('updateCommonCards', (hbout) => {
                    room.commonCards = hbout;
                    console.log(room.commonCards);
                
                    io.to(roomId).emit('updateCommonCards', hbout);
                });
            } else {
                io.to(socket.id).emit('invalidRoom');
            }
        } else {
            io.to(socket.id).emit('invalidRoom');
        }
    });
    
    

    socket.on('disconnect', () => {
        const roomId = findRoomIdBySocketId(socket.id);
        if (roomId) {
            const room = rooms.get(roomId);
            if (room) {
                room.players = room.players.filter(player => player.socketId !== socket.id);
                if (room.players.length === 0) {
                    rooms.delete(roomId);
                }
            }
        }
    });
});




function generateRoomId() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

function generateRoomCode() {
    
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    console.log('Nouveau code de salle généré :', code);
    return code;
}

function findRoomIdByCode(code) {
    for (const [roomId, room] of rooms) {
        if (room.code === code) {
            return roomId;
        }
    }
    return null;
}

function findRoomIdBySocketId(socketId) {
    for (const [roomId, room] of rooms.entries()) {
        const player = room.players.find(player => player.socketId === socketId);
        if (player) {
            return roomId;
        }
    }
    return null;
}

http.listen(3000, () => {
    console.log('Serveur écoutant sur le port 3000');
});*/



const { Server } = require('socket.io');
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = new Server(http);

const publicPath = path.join(__dirname, 'public');
const htmlFilePath = path.join(publicPath, 'home', 'index.html');
const htmlFilePathjeu = path.join(publicPath, 'jeu', 'deux_joueurs.html');

app.use(express.static(publicPath));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client/dist'));

app.get('/', (req, res) => {
    res.sendFile(htmlFilePath);
});

app.get('/jeu/deux_joueurs', (req, res) => {
    res.sendFile(htmlFilePathjeu);
});

const rooms = new Map();

io.on('connection', (socket) => {
    console.log(`Nouvelle connexion ${socket.id}`);

    socket.on('createRoom', ({ username }) => {
        const roomId = generateRoomId();
        const room = {
            id: roomId,
            players: [{ socketId: socket.id, username }],
            code: generateRoomCode(),
            commonCards: []
        };
        rooms.set(roomId, room);
        socket.join(roomId);
        io.to(socket.id).emit('roomCreated', room.code);
    });

    socket.on('joinRoom', ({ code, username }) => {
        console.log('Tentative de rejoindre la salle avec le code :', code);
        const roomId = findRoomIdByCode(code);

        if (roomId) {
            const room = rooms.get(roomId);

            if (room && room.players.length < 2) {
                const player = { socketId: socket.id, username, playerCards: [] };

                room.players.push(player);
                socket.join(roomId);

                io.to(roomId).emit('startGame', roomId);

                io.to(socket.id).emit('updateCommonCards', room.commonCards);

                socket.on('updatePlayerCards', (kaf_joeur) => {
                    player.playerCards = kaf_joeur;

                    io.to(socket.id).emit('updatePlayerCards', player.playerCards);

                    socket.to(roomId).emit('updateOtherPlayerCards', { playerId: socket.id, playerCards: kaf_joeur });
                });

                socket.on('updateCommonCards', (hbout) => {
                    room.commonCards = hbout;
                    console.log(room.commonCards);

                    io.to(roomId).emit('updateCommonCards', hbout);
                });
            } else {
                io.to(socket.id).emit('invalidRoom');
            }
        } else {
            io.to(socket.id).emit('invalidRoom');
        }
    });

    socket.on('disconnect', () => {
        const roomId = findRoomIdBySocketId(socket.id);
        if (roomId) {
            const room = rooms.get(roomId);
            if (room) {
                room.players = room.players.filter(player => player.socketId !== socket.id);
                if (room.players.length === 0) {
                    rooms.delete(roomId);
                }
            }
        }
    });
});

function generateRoomId() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

function generateRoomCode() {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    console.log('Nouveau code de salle généré :', code);
    return code;
}

function findRoomIdByCode(code) {
    for (const [roomId, room] of rooms) {
        if (room.code === code) {
            return roomId;
        }
    }
    return null;
}

function findRoomIdBySocketId(socketId) {
    for (const [roomId, room] of rooms.entries()) {
        const player = room.players.find(player => player.socketId === socketId);
        if (player) {
            return roomId;
        }
    }
    return null;
}

http.listen(3000, () => {
    console.log('Serveur écoutant sur le port 3000');
});









