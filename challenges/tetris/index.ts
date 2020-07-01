import { Game } from './src/Game';

const gameButton = document.getElementById('gameButton');
const pauseButton = document.getElementById('pauseButton');
const canvas = document.createElement('canvas');
const canvasDiv = document.getElementById('canvas');
const game = new Game(canvas);
canvasDiv.append(canvas);

let requestId: number;
let start: number;

gameButton.addEventListener('click', play);

pauseButton.addEventListener('click', () => {
    if (!requestId) {
        document.getElementById("pauseButton").textContent = `Pause`;
        animate();
        return;
    }
    document.getElementById("pauseButton").textContent = `Resume`;
    cancelAnimationFrame(requestId);
    requestId = null;
});


function destroyEvents() {
    document.removeEventListener('click', play);
    //document.removeEventListener('click', ;
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