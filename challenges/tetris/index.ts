import { GameRenderer } from './src/GameRenderer';
import { Game } from './src/Game';

const gameButton = document.getElementById('gameButton');
const pauseButton = document.getElementById('pauseButton');
const canvasDiv = document.getElementById('canvas');
const canvas = document.createElement('canvas');
const game = new Game(canvas);
const renderer = new GameRenderer(canvas);
const keys = new Array();
canvasDiv.append(canvas);

let seconds;
let requestId;
let isGameOver;
let start;
let nextState;

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyReleased);
gameButton.addEventListener('click', play);
pauseButton.addEventListener('click', pause);


function destroyEvents() {
    document.removeEventListener('keydown', keyDown);
    document.removeEventListener('keyup', keyReleased);
    document.removeEventListener('click', play);
    document.removeEventListener('click', pause);
}

function keyDown(ev: KeyboardEvent) {

    keys[ev.key] = true;

    if (keys['e']) {
        hardDrop();
    }

    if (keys['s'] || keys['ArrowDown']) {
        nextState = {
            ...game.tetrimino, x: game.tetrimino.x, y: game.tetrimino.y + 1
        };
        updateMove();
    }

    if (keys['a'] || keys['ArrowLeft']) {
        nextState = {
            ...game.tetrimino, x: game.tetrimino.x - 1, y: game.tetrimino.y
        };
        updateMove();
    }

    if (keys['d'] || keys['ArrowRight']) {
        nextState = {
            ...game.tetrimino, x: game.tetrimino.x + 1, y: game.tetrimino.y
        };
        updateMove();
    }

    if (keys['w'] || keys['ArrowUp']) {
        nextState = game.rotate();
        updateMove();
    }

}

function updateGame() {
    game.freeze(game.tetrimino);
    game.updateLines();
    if (game.tetrimino.y === 0) {
        isGameOver = true;
        return;
    }
    else {
        game.addTetrimino();
    }

}

function hardDrop() {
    while (game.isValidPos(game.tetrimino)) {
        game.tetrimino.y += 1;
    }
    game.tetrimino.y -= 1;
    updateGame();
}

function keyReleased(ev: KeyboardEvent) {
    keys[ev.key] = false;
}

function updateMove() {

    if (game.isOutside(nextState)) {
        nextState = game.shiftPiece(nextState);
    }

    if (game.isValidPos(nextState)) {
        game.tetrimino = nextState;
    }
    else {
        updateGame();
    }
}

function play() {
    game.reset();
    seconds = 0;
    document.getElementById("textTime").textContent = `Time: ${seconds}`;
    isGameOver = false;
    start = performance.now();
    if (requestId) {
        cancelAnimationFrame(requestId);
    }
    animate();
}

function animate() {
    let elapsed = performance.now() - start;

    if (isGameOver) {
        renderer.gameOver();
        cancelAnimationFrame(requestId);
        return;
    }

    if (elapsed > 1000) {
        start = performance.now();
        seconds++;
        document.getElementById("textTime").textContent = `Time: ${seconds}`;

        nextState = {
            ...game.tetrimino, x: game.tetrimino.x, y: game.tetrimino.y + 1
        };
        updateMove();
    }

    renderer.updateTetrimino(game.tetrimino);
    renderer.drawBoard(game.board, game.tetrimino);

    requestId = requestAnimationFrame(animate);
}

function pause() {
    if (!requestId) {
        animate();
        document.getElementById("pauseButton").textContent = `Pause`;
        return;
    }
    document.getElementById("pauseButton").textContent = `Resume`;
    cancelAnimationFrame(requestId);
    requestId = null;
}

play();



