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

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const square = new Square({
    position: {
        x: 0,
        y: 0,
    },
    size: 50,
    canvas,
});

const squareRenderer = new SquareRenderer(canvas);

const KEY_STATE_MAP: Record<string, boolean> = {};

function destroyEvents() {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
}

function handleKeyDown(ev: KeyboardEvent) {
    KEY_STATE_MAP[ev.key] = true;

    if (KEY_STATE_MAP['s'] || KEY_STATE_MAP['ArrowDown']) { square.moveDown(speed); }

    if (KEY_STATE_MAP['w'] || KEY_STATE_MAP['ArrowUp']) { square.moveUp(speed); }

    if (KEY_STATE_MAP['a'] || KEY_STATE_MAP['ArrowLeft']) { square.moveLeft(speed); }

    if (KEY_STATE_MAP['d'] || KEY_STATE_MAP['ArrowRight']) { square.moveRight(speed); }
}

function handleKeyUp(ev: KeyboardEvent) {
    KEY_STATE_MAP[ev.key] = false;
}

let requestId = 0;

const stopAnimation = () => {
    destroyEvents();
    cancelAnimationFrame(requestId);
}

let lastDrawTimestamp = performance.now();
const FPS = 60;

function animate() {
    const elapsed = performance.now() - lastDrawTimestamp;

    // const isAnyKeyPressed = Object
    //     .values(KEY_STATE_MAP)
    //     .includes(true);

    // if (elapsed >= 1000 && !isAnyKeyPressed) {
    //     lastDrawTimestamp = tick;
    //     square.moveDown(30);
    // }

    if (!square.isAtBottom) {
        requestId = requestAnimationFrame(animate);
    }
    else {
        stopAnimation();
        square.setY(canvas.height - square.size);
    }

    if (elapsed >= 1000 / FPS) {
        lastDrawTimestamp = performance.now();
        squareRenderer.update(square);
    }
}

requestAnimationFrame(animate);
