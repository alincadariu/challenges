import { Game } from './src/Game';
import { fdatasync } from 'fs';

const gameButton = document.getElementById('gameButton');
const pauseButton = document.getElementById('pauseButton');
const canvas = document.getElementById('canvas');
const game = new Game(canvas as HTMLCanvasElement);
document.body.append(canvas);

let requestId: number;
let start: number;

gameButton.addEventListener('click', play);
pauseButton.addEventListener('click', pause);

function pause() {
    if (!requestId) {
        document.getElementById("pauseButton").textContent = `Pause`;
        animate();
        return;
    }
    document.getElementById("pauseButton").textContent = `Resume`;
    cancelAnimationFrame(requestId);
    requestId = null;

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

    game.updateMove();

    if (game.isGameOver) {
        cancelAnimationFrame(requestId);
        game.drawGameOver();
        game.destroyEvents();
        return;
    }

    if (elapsed > 1000) {
        start = performance.now();
        game.step();
    }

    requestId = requestAnimationFrame(animate);
}
play();