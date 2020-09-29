const http = require("http");
var webSocketServer = require('websocket').server;

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';

// Configuration
const webSocketsServerPort = 1337;

const TYPE_MESSAGE = {
    JOIN: "JOIN",
    CREATE: "CREATE",
    ERROR: "ERROR",
    HELP: "HELP",
}

/**
 * HTTP server
 */
const server = http.createServer(function (request, response) {
});
server.listen(webSocketsServerPort, function () {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
const wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

/**
 *
 * @type {{
 *     roomId: string;
 *     username: string;
 *     identity: object;
 * }[]}
 */
const clients = [];

/**
 *
 * @type {{
 *     roomId: string;
 *     indexGame: number;
 *     collection: Array
 * }[]}
 */
const rooms = []

wsServer.on('request', function (request) {

    const connection = request.accept();

    let indexUser = clients.push({
        identity: connection,
        roomId: null
    }) - 1;

    connection.on('message', function (message) {
        if (message.type === 'utf8') { // accept only text
            let clientMessage = JSON.parse(message.utf8Data);

            switch (clientMessage.type) {
                case "NEXT":
                    nextCardInCollection(indexUser, clientMessage.roomId);
                    break;
                case "RESET":
                    resetCollection(indexUser, clientMessage.roomId);
                    break;
                case "HELP":
                    askHelp(indexUser, clientMessage.roomId);
                case "CREATE":
                    createRoom(indexUser, clientMessage.roomId, clientMessage.username, clientMessage.collection);
                    break;
                case "JOIN":
                    joinRoom(indexUser, clientMessage.roomId);
                    break;
            }
        }
    });

    // user disconnected
    connection.on('close', function (connection) {
        console.log((new Date()) + " Peer "
            + connection.remoteAddress + " disconnected.");
        // remove user from the list of connected clients
        clients.splice(indexUser, 1);
    });
});

function joinRoom(indexCurrentUser, roomId) {
    if (clients[indexCurrentUser].roomId === null) {
        console.log("somebody seems rejoin")
        clients[indexCurrentUser].roomId = roomId;
    }

    const usersConnected = clients.filter(x => x.roomId === roomId);
    const room = rooms.find(x => x.roomId === roomId);

    // If user join but there is not game, create this game
    console.log(room);
    if (!room) {
        const errorMessage = JSON.stringify({
            type: TYPE_MESSAGE.ERROR,
        });

        clients[indexCurrentUser].identity.sendUTF(errorMessage);

        return;
    };

    const json = JSON.stringify({
        type: TYPE_MESSAGE.JOIN,
        members: usersConnected.length,
        indexGame: room.indexGame,
        collection: room.collection,
    });

    // Broadcast
    clients
        .filter(x => x.roomId === roomId)
        .forEach(client => {
            client.identity.sendUTF(json);
        });
}

function createRoom(indexCurrentUser, roomId, username, collection) {
    clients[indexCurrentUser].roomId = roomId;
    clients[indexCurrentUser].username = username;

    rooms.push({
        indexGame: 0,
        roomId: roomId,
        collection: collection,
    });
}

function resetCollection(indexCurrentUser, roomId) {
    const roomIdUser = clients[indexCurrentUser].roomId;
    console.log(roomIdUser, clients[indexCurrentUser].roomId);
    if (roomIdUser === null || clients[indexCurrentUser].roomId !== roomId) return;

    const usersConnected = clients.filter(x => x.roomId === roomIdUser);
    const roomIndex = rooms.findIndex(x => x.roomId === roomIdUser);

    rooms[roomIndex].indexGame = 0;

    const json = JSON.stringify({
        members: usersConnected.length,
        indexGame: rooms[roomIndex].indexGame,
        collection: rooms[roomIndex].collection
    });

    // Broadcast
    clients
        .filter(x => x.roomId === roomIdUser)
        .forEach(client => {
            client.identity.sendUTF(json);
        });
}

function askHelp(indexCurrentUser, roomId) {
    const roomIdUser = clients[indexCurrentUser].roomId;
    console.log(roomIdUser, clients[indexCurrentUser].roomId);
    if (roomIdUser === null || clients[indexCurrentUser].roomId !== roomId) return;

    const usersConnected = clients.filter(x => x.roomId === roomIdUser);
    const roomIndex = rooms.findIndex(x => x.roomId === roomIdUser);


    const json = JSON.stringify({
        type: TYPE_MESSAGE.HELP,
        username: clients[indexCurrentUser].username,
    });

    // Broadcast
    clients
        .filter(x => x.roomId === roomIdUser)
        .forEach(client => {
            client.identity.sendUTF(json);
        });
}

function nextCardInCollection(indexCurrentUser, roomId) {
    const roomIdUser = clients[indexCurrentUser].roomId;
    console.log(roomIdUser, clients[indexCurrentUser].roomId);
    if (roomIdUser === null || clients[indexCurrentUser].roomId !== roomId) return;

    const usersConnected = clients.filter(x => x.roomId === roomIdUser);
    const roomIndex = rooms.findIndex(x => x.roomId === roomIdUser);

    if (rooms[roomIndex].indexGame + 1 >= rooms[roomIndex].collection.length) return;

    rooms[roomIndex].indexGame = rooms[roomIndex].indexGame + 1;

    const json = JSON.stringify({
        members: usersConnected.length,
        indexGame: rooms[roomIndex].indexGame,
        collection: rooms[roomIndex].collection
    });

    // Broadcast
    clients
        .filter(x => x.roomId === roomIdUser)
        .forEach(client => {
            client.identity.sendUTF(json);
        });
}




