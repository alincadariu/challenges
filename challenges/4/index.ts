import { Square, CanvasPosition } from './src/Square';

const CANVAS_STYLE = `border: 1px solid`;

const speed = 10;

const canvas = document.createElement('canvas');
canvas.setAttribute('style', CANVAS_STYLE);
canvas.width = 400;
canvas.height = 400;
document.body.style.setProperty('text-align', 'center');
document.body.append(canvas);

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

const square = new Square(canvas);

const position: CanvasPosition = {
    x: 0,
    y: 0,
};

const moveUp = () => {
    position.y <= 0 ? position.y = 0 : position.y -= speed;
};

const moveDown = () => {
    if (square.getSquareSize.height + position.y >= canvas.height) {
        position.y = canvas.height - square.getSquareSize.height;
    } else position.y += speed;
}

const moveLeft = () => {
    position.x <= 0 ? position.x = canvas.width - speed : position.x -= speed;
};

const moveRight = () => {
    position.x >= canvas.width - speed ? position.x = 0 : position.x += speed;
};

const keys = new Array();

function destroyEvents() {
    document.removeEventListener('keydown', keyPressed);
    document.removeEventListener('keyup', keyReleased);
}

function keyPressed(ev: KeyboardEvent) {

    if (position.y >= canvas.height - square.getSquareSize.height) {
        destroyEvents();
    }

    keys[ev.key] = true;

    if (keys['s'] || keys['ArrowDown']) { moveDown(); }

    if (keys['w'] || keys['ArrowUp']) { moveUp(); }

    if (keys['a'] || keys['ArrowLeft']) { moveLeft(); }

    if (keys['d'] || keys['ArrowRight']) { moveRight(); }

    square.update(position);
}

function keyReleased(ev: KeyboardEvent) {
    keys[ev.key] = false;
}

square.update(position);

const handle = setInterval(() => {

    position.y += 30;
    if (position.y >= canvas.height - square.getSquareSize.height) {
        position.y = canvas.height - square.getSquareSize.height;
        destroyEvents();
        clearInterval(handle);
    }
    square.update(position);

}, 1000);

