import { TetrisBoard } from './TetrisBoard';
import { Tetrimino } from './Tetrimino';
import { TETRIMIN_COLOR_MAP } from './TetriminoType';
import { matrixForEach } from './utils';

export class TetrisRenderer {
    public set cellSize(value: number) {
        this._cellSize = value;
    }

    private get _padding() {
        return this._cellSize / 20;
    }

    private _cellSize = 0;
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

            const x = this._cellSize * valueX;
            const y = this._cellSize * valueY;

            this._context.fillRect(x, y, this._cellSize - this._padding, this._cellSize - this._padding)
        });
    }

    public drawGameOver() {
        this._context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);

        const x = this._context.canvas.width / 2;
        const y = this._context.canvas.height / 2;

        this._context.font = 'bold 30px monospace';
        this._context.textAlign = 'center';
        this._context.fillStyle = '#333';
        this._context.fillText('Game Over!', x, y);
    }

    public drawTetrimino(tetrimino: Tetrimino) {
        this._context.fillStyle = tetrimino.color;

        matrixForEach(tetrimino.shape, (value, valueY, valueX) => {
            if (value === 0) { return; }

            const shiftX = tetrimino.x * this._cellSize;
            const shiftY = tetrimino.y * this._cellSize;
            const x = this._cellSize * valueX + shiftX;
            const y = this._cellSize * valueY + shiftY;

            this._context.fillRect(x, y, this._cellSize - this._padding, this._cellSize - this._padding);
        });
    }

    public drawPreview(tetrimino: Tetrimino) {
        this._context.globalAlpha = 0.1;
        this.drawTetrimino(tetrimino);
        this._context.globalAlpha = 1;
    }
}