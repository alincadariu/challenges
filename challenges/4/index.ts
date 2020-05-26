import { SquareRenderer } from './src/SquareRenderer';
import { Square } from './src/Square';

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

const square: Square = {
    position: {
        x: 0,
        y: 0,
    },
    size: 50,
};

const squareRenderer = new SquareRenderer(canvas);

const moveUp = () => {
    square.position.y = square.position.y <= 0 ? 0 : square.position.y -= speed;
}

const moveLeft = () => {
    square.position.x = square.position.x <= 0 ? canvas.width - speed : square.position.x -= speed;
}

const moveRight = () => {
    square.position.x = square.position.x >= canvas.width - speed ? 0 : square.position.x += speed;
}

const moveDown = () => {
    if (square.size + square.position.y >= canvas.height) {
        square.position.y = canvas.height - square.size;
    } else {
        square.position.y += speed;
    }
}

const keys = new Array();

function destroyEvents() {
    document.removeEventListener('keydown', keyPressed);
    document.removeEventListener('keyup', keyReleased);
}

function keyPressed(ev: KeyboardEvent) {

    keys[ev.key] = true;

    if (keys['s'] || keys['ArrowDown']) { moveDown(); }

    if (keys['w'] || keys['ArrowUp']) { moveUp(); }

    if (keys['a'] || keys['ArrowLeft']) { moveLeft(); }

    if (keys['d'] || keys['ArrowRight']) { moveRight(); }

}

function keyReleased(ev: KeyboardEvent) {
    keys[ev.key] = false;
}

const loop = setInterval(() => {
    square.position.y += 30;
}, 1000);

let requestId = 0;
let squareAtBottom = false;

const stopAnimation = () => {
    destroyEvents();
    clearInterval(loop);
    cancelAnimationFrame(requestId);
}

function animate() {

    squareAtBottom = square.position.y >= canvas.height - square.size;
    if (!squareAtBottom) {
        setTimeout(() => {
            requestId = requestAnimationFrame(animate);
        }, 1000 / 60);
    }
    else {
        stopAnimation;
        square.position.y = canvas.height - square.size;
    }
    squareRenderer.update(square);
}

animate();
