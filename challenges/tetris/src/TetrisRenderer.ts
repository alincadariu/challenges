import { TetrisBoard } from './TetrisBoard';
import { CELL_SIZE, TETRIMINO_PADDING } from './constants';
import { Tetrimino } from './Tetrimino';
import { TETRIMIN_COLOR_MAP } from './TetriminoType';
import { matrixForEach } from './utils';

export class TetrisRenderer {
    private _context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement | CanvasRenderingContext2D) {
        this._context = canvas instanceof HTMLCanvasElement
            ? canvas.getContext('2d')
            : canvas;
    }

    public clear() {
        this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    }

    public drawBoard(board: TetrisBoard) {
        matrixForEach(board.state, (value, valueY, valueX) => {
            if (value === 0) { return; }

            const color = TETRIMIN_COLOR_MAP[value];
            this._context.fillStyle = color;

            const x = CELL_SIZE * valueX;
            const y = CELL_SIZE * valueY;

            this._context.fillRect(x, y, CELL_SIZE - TETRIMINO_PADDING, CELL_SIZE - TETRIMINO_PADDING)
        });
    }

    public drawTetrimino(tetrimino: Tetrimino) {
        this._context.fillStyle = tetrimino.color;

        matrixForEach(tetrimino.shape, (value, valueY, valueX) => {
            if (value === 0) { return; }

            const shiftX = tetrimino.x * CELL_SIZE;
            const shiftY = tetrimino.y * CELL_SIZE;
            const x = CELL_SIZE * valueX + shiftX;
            const y = CELL_SIZE * valueY + shiftY;

            this._context.fillRect(x, y, CELL_SIZE - TETRIMINO_PADDING, CELL_SIZE - TETRIMINO_PADDING);
        });
    }
}