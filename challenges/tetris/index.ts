import { Game } from './src/Game';

const gameButton = document.getElementById('gameButton');
const pauseButton = document.getElementById('pauseButton');
const canvas = document.createElement('canvas');
const canvasDiv = document.getElementById('canvas');
const game = new Game(canvas);
const keys: string[] = new Array();
canvasDiv.append(canvas);

let requestId: number;
let start: number;

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyReleased);
gameButton.addEventListener('click', play);
//pauseButton.addEventListener('click', game.pause());


function destroyEvents() {
    document.removeEventListener('keydown', keyDown);
    document.removeEventListener('keyup', keyReleased);
    document.removeEventListener('click', play);
    //document.removeEventListener('click', pause);
}

function keyDown(ev: KeyboardEvent) {

    keys[ev.key] = true;

    if (keys['e']) {
        game.hardDrop();
    }

    if (keys['s'] || keys['ArrowDown']) {
        game.moveDown();
    }

    if (keys['a'] || keys['ArrowLeft']) {
        game.moveLeft();
    }

    if (keys['d'] || keys['ArrowRight']) {
        game.moveRight();
    }

    if (keys['w'] || keys['ArrowUp']) {
        game.rotate();
    }
    game.updateMove();
}

function keyReleased(ev: KeyboardEvent) {
    keys[ev.key] = false;
}

function play() {
    game.start();
    start = performance.now();
    if (requestId) {
        cancelAnimationFrame(requestId);
    }
    animate();
}

function animate() {
    let elapsed = performance.now() - start;

    if (game.board.isGameOver) {
        game.drawGameOver();
        cancelAnimationFrame(requestId);
        destroyEvents();
        return;
    }

    if (elapsed > 1000) {
        start = performance.now();
        game.step();
    }
    game.draw();
    requestId = requestAnimationFrame(animate);
}
play();