import { GameRenderer } from './src/GameRenderer';
import { Game } from './src/Game';
import { Tetrimino } from './src/Tetriminos/Tetrimino';


const CANVAS_STYLE = `border: 2px solid;
border-radius: 3px;`;

const BUTTON_STYLE = `display:inline-block;
padding:10px 20px;
border-radius:5px;
font-weight: 500;
box-sizing: border-box;
text-decoration:none;
font-family: Sans-serif;
color:#FFFFFF;
text-align:center;
background-color: #f14e4e;
`;

const BODY_STYLE = `display: grid;
grid-template-columns: auto auto;
grid-item: 
`;

const TEXT_STYLE = `
font-family: Sans-serif;
font-weight: 600;
font-size: 30px;
`;

const gameButton = document.getElementById('gameButton');
const pauseButton = document.getElementById('pauseButton');
const textLine = document.getElementById('textLines');
const textTime = document.getElementById('textTime');
const controls = document.getElementById('canvas');
const canvas = document.createElement('canvas');
const game = new Game(canvas);;
const renderer = new GameRenderer(canvas);

let seconds;
let requestId;
let isGameOver;
let start;


canvas.setAttribute('style', CANVAS_STYLE);
document.body.setAttribute('style', BODY_STYLE);
gameButton.setAttribute('style', BUTTON_STYLE);
pauseButton.setAttribute('style', BUTTON_STYLE);
textLine.setAttribute('style', TEXT_STYLE);
textTime.setAttribute('style', TEXT_STYLE);

controls.append(canvas);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyReleased);
gameButton.addEventListener('click', play);
pauseButton.addEventListener('click', pause);

const keys = new Array();

function destroyEvents() {
    document.removeEventListener('keydown', keyDown);
    document.removeEventListener('keyup', keyReleased);
}

let nextState: Tetrimino;

function keyDown(ev: KeyboardEvent) {

    keys[ev.key] = true;

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
        nextState = game.rotate(game.tetrimino);
        updateMove();
    }

}

function keyReleased(ev: KeyboardEvent) {
    keys[ev.key] = false;
}



function updateMove() {

    if (game.isValid(nextState)) {
        game.tetrimino = nextState;
    }
    else if (nextState.x + game.tetrimino.distanceLeft < 0 || nextState.x + game.tetrimino.distanceRight >= 10) {
        return;
    }
    else {
        game.freeze(game.tetrimino);
        game.updateLines();
        if (game.tetrimino.y === 0) {
            isGameOver = true;
            return;
        }
        game.addTetrimino();
    }
    renderer.updateTetrimino(game.tetrimino);
    renderer.drawBoard(game.board, game.tetrimino);
}

function play() {
    game.reset();
    seconds = 0;
    game.lines = 0;
    game.updateLines();
    isGameOver = false;
    renderer.updateTetrimino(game.tetrimino);
    renderer.drawBoard(game.board, game.tetrimino);
    start = performance.now();
    if (requestId) {
        cancelAnimationFrame(requestId);
    }
    animate();
}

function animate(now = 0) {
    let elapsed = now - start;

    if (isGameOver) {
        renderer.gameOver();
        cancelAnimationFrame(requestId);
        return;
    }

    if (elapsed > 1000) {
        start = now;
        seconds++;

        nextState = {
            ...game.tetrimino, x: game.tetrimino.x, y: game.tetrimino.y + 1
        };

        updateMove();
    }

    game.updateLines;
    document.getElementById("textTime").textContent = `Time: ${seconds}`;
    requestId = requestAnimationFrame(animate);
}

function pause() {
    if (!requestId) {
        animate();
        return;
    }
    cancelAnimationFrame(requestId);
    requestId = null;
}

play();



