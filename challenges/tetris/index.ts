import { GameRenderer } from './src/GameRenderer';
import { Game } from './src/Game';
import { Tetrimino } from './src/Tetriminos/Tetrimino';

const gameButton = document.getElementById('gameButton');
const pauseButton = document.getElementById('pauseButton');
const canvas = document.createElement('canvas');
const canvasDiv = document.getElementById('canvas') || canvas;
const game = new Game(canvas);
const renderer = new GameRenderer(canvas);
const keys: string[] = new Array();
canvasDiv.append(canvas);

let seconds: number;
let requestId: number;
let start: number;
let nextState: Tetrimino;

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyReleased);
gameButton.addEventListener('click', play);
//pauseButton.addEventListener('click', game.pause());


function destroyEvents() {
    document.removeEventListener('keydown', keyDown);
    document.removeEventListener('keyup', keyReleased);
    document.removeEventListener('click', play);
    // document.removeEventListener('click', pause);
}

function keyDown(ev: KeyboardEvent) {

    keys[ev.key] = true;

    if (keys['e']) {
        //hardDrop();
    }

    if (keys['s'] || keys['ArrowDown']) {

    }

    if (keys['a'] || keys['ArrowLeft']) {

    }

    if (keys['d'] || keys['ArrowRight']) {
        game.tetrimino.moveRight();
    }

    if (keys['w'] || keys['ArrowUp']) {
        game.tetrimino.rotate();
        // updateMove();
    }

}




function keyReleased(ev: KeyboardEvent) {
    keys[ev.key] = false;
}



function play() {
    game.start();
    seconds = 0;
    document.getElementById("textTime").textContent = `Time: ${seconds}`;
    document.getElementById("pauseButton").textContent = `Pause`;
    //isGameOver = false;
    start = performance.now();
    if (requestId) {
        cancelAnimationFrame(requestId);
    }
    animate();
}

function animate() {
    let elapsed = performance.now() - start;

    if (game.isGameOver) {
        renderer.drawGameOver();
        cancelAnimationFrame(requestId);
        return;
    }

    if (elapsed > 1000) {
        start = performance.now();
        seconds++;
        document.getElementById("textTime").textContent = `Time: ${seconds}`;


    }

    renderer.updateTetrimino(game.tetrimino);
    renderer.drawBoard(game.board, game.tetrimino);

    requestId = requestAnimationFrame(animate);
}



play();