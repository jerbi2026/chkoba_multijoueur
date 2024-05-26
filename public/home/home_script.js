


const player = {
    host: false,
    playedCell: "",
    roomId: null,
    username: "",
    socketId: "",
    turn: false,
    playerCards: []
};

const socket = io();

const usernameInput = document.getElementById('email');
const codeinput = document.getElementById('code');
let roomId;

socket.on('roomCreated', (createdRoomId) => {
    player.username = usernameInput.value;
    player.roomId = createdRoomId;
    player.host = true;
    player.turn = true;
    player.socketId = socket.id;
    roomId = createdRoomId;
    socket.emit('playerData', player);
    openDialog(`Votre code de salle est : ${createdRoomId}`);
});

socket.on('startGame', (roomId) => {
    console.log('Le jeu commence!');
    window.location.href = `/jeu/deux_joueurs.html?room=${roomId}`;
});

socket.on('invalidRoom', () => {
    console.log('La salle est invalide, veuillez réessayer.');
});

function createRoom() {
    socket.emit('createRoom', { username: usernameInput.value });
}

function joinRoom() {
    const code = codeinput.value;
    console.log("code est " + code);
    if (code) {
        socket.emit('joinRoom', { code, username: usernameInput.value });
    } else {
        console.log('Veuillez entrer un code de salle valide.');
    }
}

function openDialog(message) {
    const dialog = document.getElementById('dialog');
    const lien = document.getElementById('lien');

    lien.textContent = message;
    dialog.style.display = 'block';
}

function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}
