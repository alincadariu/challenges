import { Tetrimino } from "./Tetriminos/Tetrimino";
import { CELL_SIZE, PADDING, ROWS, COLUMNS } from './Constants';
export class Game {

    public board;
    public tetrimino: Tetrimino;
    public lines: number;


    constructor(private _canvas: HTMLCanvasElement) {
        this.start();
        this._canvas.width = (CELL_SIZE * COLUMNS) - PADDING;
        this._canvas.height = (CELL_SIZE * ROWS) - PADDING;
    }

    public start() {
        this.addTetrimino();
        this.board = this.emptyBoard;
        this.lines = 0;
        this.updateLines();
    }

    public addTetrimino() {
        this.tetrimino = new Tetrimino();
    }

    public isAboveFloor(tetrimino) {
        let distanceBottom = this._distanceBottom(tetrimino);
        return tetrimino.y + distanceBottom < ROWS;
    };

    public isAvailable(x, y) { return this.board[y][x] === 0; };

    public isValidPos(tetrimino) {
        return tetrimino.shape.every((row, rowIndex) => {
            return row.every((value, colIndex) => {
                let x = tetrimino.x + colIndex;
                let y = tetrimino.y + rowIndex;
                return (
                    value === 0 || (this.isAboveFloor(tetrimino) && this.isAvailable(x, y))
                );
            });
        });

    }
    public isOutside(nextState) {
        let left = this._distanceLeft(nextState);
        let right = this._distanceRight(nextState);
        return nextState.x + left < 0 || nextState.x + right >= 10;
    }

    public shiftPiece(nextState) {
        let piece;
        if (nextState.x < 0) {
            let left = this._distanceLeft(nextState);
            piece = { ...nextState, x: nextState.x = -left };
        }
        else {
            let right = this._distanceRight(nextState);
            piece = { ...nextState, x: nextState.x = ((COLUMNS - 1) - right) };
        }
        return piece;
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


    public hasPiece(tetrimino) {
        let distanceRight = this._distanceRight(tetrimino);
        let distanceBottom = this._distanceBottom(tetrimino);
        return this.board[tetrimino.y][tetrimino.x] > 0 || this.board[tetrimino.y][tetrimino.x + distanceRight] > 0;

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
            length: Math.round(this._canvas.height / CELL_SIZE)
        }, () => Array.from({
            length: Math.round(this._canvas.width / CELL_SIZE)
        }).fill(0));
    }

    private _distanceLeft(nextState) {
        let distanceToLeft = 100;
        nextState.shape.forEach((row) => {
            row.forEach((value, columnIndex) => {
                if (value > 0) {
                    distanceToLeft = Math.min(distanceToLeft, columnIndex);
                }
            });
        });
        return distanceToLeft;
    }

    private _distanceBottom(nextState) {
        let distanceToBottom = 0;
        nextState.shape.forEach((row, rowIndex) => {
            row.forEach((value) => {
                if (value > 0) {
                    distanceToBottom = Math.max(distanceToBottom, rowIndex);
                }
            });
        });
        return distanceToBottom;
    }


    private _distanceRight(nextState) {
        let distanceToRight = 0;
        nextState.shape.forEach((row) => {
            row.forEach((value, columnIndex) => {
                if (value > 0) {
                    distanceToRight = Math.max(distanceToRight, columnIndex);
                }
            });
        });
        return distanceToRight;
    }
}