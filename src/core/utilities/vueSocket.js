export class VueSocket {
    constructor(port) {
        const portServer = port || 1337;
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        
        this.connection = new WebSocket(`wss://websock.ngrok.io`);
        
        this.connection.onopen = function () {
            console.log("Connexion is ready");
        };
        
        this.connection.onerror = function (error) {
            console.log("Connexion failure", error);
        };
    }

    sendMessage(message) {
        this.connection.send(JSON.stringify(message));
    }

    onMessage(callback) {
        this.connection.onmessage = function (message) {
            let json;
            json = JSON.parse(message.data);
            console.log("vueSocket", json)

            try {
                if (callback) callback(json);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', message.data);
                return;
            }
        };
    }

    _actionMessage(message) {
        switch(message.type) {
            case "message":
                console.log("message")
        }
    }
}