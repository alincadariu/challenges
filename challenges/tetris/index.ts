import { TetrisRenderer } from './src/TetrisRenderer';
import { TetrisBoard } from './src/TetrisBoard';
import { CELL_SIZE } from './src/constants';
import { Tetrimino } from './src/Tetrimino';

// TODO: Extract this logic to TetrisEngine
const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 30;

const canvas = document.createElement('canvas');
canvas.width = CELL_SIZE * BOARD_WIDTH;
canvas.height = CELL_SIZE * BOARD_HEIGHT;
canvas.style.setProperty('border', '1px solid salmon');
document.body.appendChild(canvas);

let tetrimino = new Tetrimino();

const tetris = new TetrisBoard(BOARD_WIDTH, BOARD_HEIGHT);
const renderer = new TetrisRenderer(canvas);

window.addEventListener('keydown', (ev) => {
    switch (ev.key) {
        case 'ArrowLeft':
            tetrimino.left(0);
            break;
        case 'ArrowRight':
            tetrimino.right(tetris.width);
            break;
        case 'ArrowDown':
            tetrimino.down(tetris.height);
            break;
        case 'ArrowUp':
            tetrimino.rotate();
            break;
        default: break;
    }
});

setInterval(() => {
    renderer.clear();
    renderer.drawTetrimino(tetrimino);
    renderer.drawBoard(tetris);
    const isAtBottom = tetrimino.y + tetrimino.height === tetris.height;

    if (isAtBottom) {
        tetris.addTetrimino(tetrimino);
        tetrimino = new Tetrimino();
        console.log(tetris.board);
    }
}, 1000 / 60);