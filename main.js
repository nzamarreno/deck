"use strict";

const portServer = 1337;
window.WebSocket = window.WebSocket || window.MozWebSocket;

var connection = new WebSocket(`ws://localhost:${portServer}`);

connection.onopen = function () {
    console.log("Connexion is ready");
};

connection.onerror = function (error) {
    console.log("Connexion failure", error);
};

// Receive server response
connection.onmessage = function (message) {
    let json;
    try {
        json = JSON.parse(message.data);
    } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
    }

    if (json) {
        if (json.type === "message") {
            console.log("your response here", json);
            var node = document.createElement("li");
            const textnode = document.createTextNode(json.data.message);
            node.appendChild(textnode);
            document.querySelector("ul").appendChild(node);
        } 
        else if (json.type === "movement") {
            drawEvent(json.data.movement);
        }
        
    }
};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

// Send data
const $button = document.querySelector(".send");
$button.addEventListener("click", function () {
    const $input = document.querySelector(".input");

    connection.send(JSON.stringify({ message: $input.value, type: "message" }));
})


let x = 0;
let y = 0;
let canvas;
let context;
let direction = "ArrowUp";

function createCanvas() {
    canvas = document.querySelector("canvas");

    context = canvas.getContext("2d");
    context.strokeStyle = "#000000";
    context.lineWidth = 10;
    context.fillStyle = "#222222";

    canvas.width = 300;
    canvas.height = 300;

    canvas.addEventListener("mousedown", mouseClick)
    canvas.addEventListener("mouseup", mouseUp)
}

function mouseUp(event) {
    canvas.removeEventListener("mousemove", draw);
}

document.addEventListener("keydown", function(event) {
    direction = event.code;
})

function animation() {
    draw(setDirection(x, y));
    requestAnimationFrame(animation)
}

function mouseClick(event) {
    requestAnimationFrame(animation)
    x = event.clientX;
    y = event.clientY;
    canvas.addEventListener("mousemove", draw);
}

function setDirection(x, y) {
    // Curvy has only two controls (left, right)
    switch(direction) {
        case "ArrowUp":
            return { clientX: x, clientY: y - 1 };
        case "ArrowDown":
            return { clientX: x, clientY: y + 1 };
        case "ArrowLeft":
            return { clientX: x - 1, clientY: y };
        case "ArrowRight":
            return { clientX: x + 1, clientY: y };
    }
}

function draw(event) {
    let message = {
        oldX: x,
        oldY: y,
        x: event.clientX,
        y: event.clientY
    };

    drawEvent(message)

    connection.send(JSON.stringify({ movement: message, type: "movement" }));

    x = event.clientX;
    y = event.clientY;
}

function drawEvent(position) {
    context.moveTo(position.oldX, position.oldY);
    context.lineTo(position.x, position.y);
    context.stroke();
}

createCanvas();
