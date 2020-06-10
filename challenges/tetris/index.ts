import { TetrisRenderer } from './src/TetrisRenderer';
import { TetrisBoard } from './src/TetrisBoard';
import { CELL_SIZE } from './src/constants';
import { Tetrimino } from './src/Tetrimino';
import { GameLoop } from './src/GameLoop';

// TODO: Extract this logic to TetrisEngine
const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 30;

const canvas = document.createElement('canvas');
canvas.width = CELL_SIZE * BOARD_WIDTH;
canvas.height = CELL_SIZE * BOARD_HEIGHT;
canvas.style.setProperty('border', '1px solid salmon');
document.body.appendChild(canvas);

let tetrimino = new Tetrimino();

const board = new TetrisBoard(BOARD_WIDTH, BOARD_HEIGHT);
const renderer = new TetrisRenderer(canvas);
const loop = new GameLoop();

window.addEventListener('keydown', (ev) => {
    switch (ev.key) {
        case 'ArrowLeft':
            tetrimino.left(0);
            break;
        case 'ArrowRight':
            tetrimino.right(board.width);
            break;
        case 'ArrowDown':
            tetrimino.down(board.height);
            break;
        case 'ArrowUp':
            tetrimino.rotate();
            break;
        default: break;
    }
});

loop.addPainter(() => {
    renderer.clear();
    renderer.drawTetrimino(tetrimino);
    renderer.drawBoard(board);

    if (board.isReadyToAdd(tetrimino)) {
        board.addTetrimino(tetrimino);
        if (board.isOverlowing) {
            // TODO: GAME OVER 😢
            loop.stop();
            return;
        }
        tetrimino = new Tetrimino();
    }
});

loop.start();