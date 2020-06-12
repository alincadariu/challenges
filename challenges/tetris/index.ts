import { Tetris } from './src/Tetris';
import { BOARD_HEIGHT } from './src/constants';

const board = document.querySelector<HTMLCanvasElement>('#board');
if (!board) { throw new Error('Could not find the canvas element!'); }

const preview = document.querySelector<HTMLCanvasElement>('#preview');
if (!preview) { throw new Error('Could not find the canvas element!'); }

const tetris = new Tetris(board, preview);

const playButton = document.querySelector<HTMLButtonElement>('#playButton');
playButton.addEventListener('keydown', ev => ev.stopPropagation());
playButton.addEventListener('click', () => {
    tetris.start();
    pauseButton.disabled = false;

    playButton.blur();
});

const pauseButton = document.querySelector<HTMLButtonElement>('#pauseButton');
pauseButton.addEventListener('keydown', ev => ev.stopPropagation());
pauseButton.addEventListener('click', (ev) => {
    if (tetris.isPaused) {
        pauseButton.innerText = 'Pause';
        tetris.resume();
        pauseButton.blur();
    } else {
        pauseButton.innerText = 'Resume';
        tetris.pause();
    }
});

const lineToScore = (count: number) => {
    switch (count) {
        case 1: return 40;
        case 2: return 100;
        case 3: return 300;
        case 4: return 1000;
    }
};

const score = document.querySelector<HTMLSpanElement>('#score');
const lines = document.querySelector<HTMLSpanElement>('#lines');
board.addEventListener('linebreak', ({ detail: { count } }: CustomEvent) => {
    const totalLineCount = parseInt(lines.innerText, 10) + count;
    lines.innerText = `${totalLineCount}`;

    const totalScore = parseInt(score.innerText, 10) + lineToScore(count);
    score.innerText = `${totalScore}`;
});

board.addEventListener('gameover', () => {
    score.innerText = '0';
    lines.innerText = '0';
    pauseButton.disabled = true;
});

const resize = () => {
    const { height } = board.parentElement.getBoundingClientRect();
    const cellSize = Math.floor(height / BOARD_HEIGHT);
    tetris.cellSize = cellSize;
};
window.addEventListener('resize', resize);
resize();