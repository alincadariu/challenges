import { CELL_SIZE, PADDING, COLORS } from './Constants';
export class GameRenderer {

    private _context: CanvasRenderingContext2D;

    constructor(private _canvas: HTMLCanvasElement) {
        this._context = this._canvas.getContext('2d');
    }

    public updateTetrimino(tetrimino) {
        this._clearCanvas();
        this._drawTetrimino(tetrimino);
    }

    private _drawTetrimino(tetrimino) {

        tetrimino.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this._context.fillStyle = COLORS[value - 1];
                    this._context.fillRect(
                        (x + tetrimino.x) * CELL_SIZE,
                        (y + tetrimino.y) * CELL_SIZE,
                        CELL_SIZE - PADDING,
                        CELL_SIZE - PADDING);
                }
            });
        });
    }

    public drawBoard(board, tetrimino) {
        board.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this._context.fillStyle = COLORS[value - 1];
                    this._context.fillRect(
                        x * (CELL_SIZE),
                        y * CELL_SIZE,
                        CELL_SIZE - PADDING,
                        CELL_SIZE - PADDING);
                }
            });
        });
    }

    private _clearCanvas() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    public drawGameOver() {
        this._context.font = '35px Sans-serif';
        this._context.fillStyle = 'black';
        this._context.fillText('GAME OVER', 50, 50);
    }
}