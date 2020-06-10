import { Tetris } from './src/Tetris';

// TODO: Extract this logic to TetrisEngine
const canvas = document.querySelector<HTMLCanvasElement>('#board');

if (!canvas) { throw new Error('Could not find the canvas element!'); }

const tetris = new Tetris(canvas);

const playButton = document.querySelector<HTMLButtonElement>('#playButton');
playButton.addEventListener('click', () => {
    tetris.start();
    pauseButton.disabled = false;
});

const pauseButton = document.querySelector<HTMLButtonElement>('#pauseButton');
pauseButton.addEventListener('click', () => {
    if (tetris.isPaused) {
        pauseButton.innerText = 'Pause';
        tetris.resume();
    } else {
        pauseButton.innerText = 'Resume';
        tetris.pause();
    }
});