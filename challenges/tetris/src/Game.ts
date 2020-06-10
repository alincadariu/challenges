import { Tetrimino } from "./Tetriminos/Tetrimino";

const ROWS = 20;
const COLUMNS = 10;

export class Game {

    public board;
    public tetrimino;
    public lines: number;

    constructor(private _canvas: HTMLCanvasElement) {
        this.reset();
        this._canvas.width = this.tetrimino.cellSize * COLUMNS;
        this._canvas.height = this.tetrimino.cellSize * ROWS;
    }

    public reset() {
        this.addTetrimino();
        this.board = this.emptyBoard;
    }

    public addTetrimino() {
        this.tetrimino = new Tetrimino();
    }

    public isAboveFloor(y: number) { return y <= ROWS - 1 };
    public isAvailable(x, y) { return this.board[y][x] === 0; };

    public isValid(tetrimino) {

        return tetrimino.shape.every((row, rowIndex) => {
            return row.every((value, colIndex) => {
                let x = tetrimino.x + colIndex;
                let y = tetrimino.y + rowIndex;
                return (
                    value === 0 || (this.isAboveFloor(y) && this.isAvailable(x, y))
                );
            });
        });

    }

    get canvas() {
        return this._canvas;
    }

    public freeze(tetrimino) {
        tetrimino.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.board[y + this.tetrimino.y][x + this.tetrimino.x] = value;
                }
            });
        });
    }

    public rotate(tetrimino) {
        let piece = { ...tetrimino };
        this._transpose(piece);
        piece.shape.forEach(row => row.reverse());
        return piece;
    }

    private _transpose(piece) {
        for (let y = 0; y < piece.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [piece.shape[x][y], piece.shape[y][x]] = [piece.shape[y][x], piece.shape[x][y]];
            }
        }
    }

    public updateLines() {

        this.board.forEach((row, rowIndex) => {
            if (row.every(value => value > 0)) {
                this.lines++;
                this.board.splice(rowIndex, 1);
                this.board.unshift(Array(COLUMNS).fill(0));
            }
        });
        document.getElementById("textLines").textContent = `Lines: ${this.lines}`;

    }

    get emptyBoard() {
        return Array.from({
            length: Math.round(this._canvas.height / this.tetrimino.cellSize)
        }, () => Array.from({
            length: Math.round(this._canvas.width / this.tetrimino.cellSize)
        }).fill(0));
    }
}