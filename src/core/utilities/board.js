const DIRECTION = {
    ArrowRight: "ArrowRight",
    ArrowLeft: "ArrowLeft",
    ArrowUp: "ArrowUp",
    ArrowDown: "ArrowDown",
};

export class Board {
    constructor(elementClass, userColor, userBoard) {
        this.posX = window.outerWidth/2;
        this.posY = window.outerHeight/2;
        this.context = null;
        this.canvas = null;
        this.userBoard = userBoard;
        this.elementClass = elementClass;
        this.userColor = userColor;
        this.direction = DIRECTION.ArrowLeft;
        this.speed = 6;

        this._bindEventKeyBoard();
        this._createBoard();
    }

    _bindEventKeyBoard() {
        document.addEventListener("keydown", (event) => {
            this.direction = event.code;
        });
    }

    _createBoard() {
        this.canvas = document.querySelector(this.elementClass);

        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = this.userBoard;
        this.canvas.width = window.outerWidth;
        this.canvas.height = window.outerHeight;

        this._animation();
    }

    _setDirection(x, y) {
        // Curvy has only two controls (left, right)
        switch(this.direction) {
            case DIRECTION.ArrowUp:
                return { clientX: x || 0, clientY: y - this.speed };
            case DIRECTION.ArrowDown:
                return { clientX: x || 0, clientY: y + this.speed };
            case DIRECTION.ArrowLeft:
                return { clientX: this._loopX(x - this.speed), clientY: y || 0 };
            case DIRECTION.ArrowRight:
                return { clientX: this._loopX(x + this.speed), clientY: y || 0 };
        }
    }

    _loopX(position) {
        if (position >= window.outerWidth) {
            this.direction = DIRECTION.ArrowRight;
            return 0;
        } else if (position <= 0) {
            this.direction = DIRECTION.ArrowLeft;
            return window.outerWidth;
        }

        return position;
    }

    _animation() {
        this._draw(this._setDirection(this.posX, this.posY));
        requestAnimationFrame(this._animation.bind(this))
    }

    _draw(position) {
        let message = {
            oldX: this.posX,
            oldY: this.posY,
            x: position.clientX,
            y: position.clientY
        };
        
        this._drawEvent(message)
    
        // connection.send(JSON.stringify({ movement: message, type: "movement" }));
    
        this.posX = position.clientX;
        this.posY = position.clientY;
    }
    
    _drawEvent(position) {
        this.context.moveTo(position.oldX, position.oldY);
        this.context.lineWidth = 8;
        this.context.strokeStyle = this.userColor;
        this.context.lineCap = "round";
        this.context.lineTo(position.x, position.y);
        this.context.stroke();
    }
}