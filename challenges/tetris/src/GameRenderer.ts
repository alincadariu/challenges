const COLORS = [
    'cyan',
    'blue',
    'orange',
    '#ffd700',
    'green',
    'purple',
    'red'
];
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
                        (x + tetrimino.x) * tetrimino.cellSize,
                        (y + tetrimino.y) * tetrimino.cellSize,
                        tetrimino.cellSize - 1,
                        tetrimino.cellSize - 1);
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
                        x * (tetrimino.cellSize),
                        y * tetrimino.cellSize,
                        tetrimino.cellSize - tetrimino.padding,
                        tetrimino.cellSize - tetrimino.padding);
                }
            });
        });
    }

    private _clearCanvas() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    public gameOver() {
        this._context.font = '35px Sans-serif';
        this._context.fillStyle = 'black';
        this._context.fillText('GAME OVER', 50, 50);
    }
}