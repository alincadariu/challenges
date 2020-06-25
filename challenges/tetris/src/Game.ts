import { Tetrimino } from "./Tetriminos/Tetrimino";
import { CELL_SIZE, PADDING, ROWS, COLUMNS } from './constants';
import { GameBoard } from './GameBoard';
import { GameRenderer } from "./GameRenderer";
export class Game {

    private _board: GameBoard;
    private _tetrimino: Tetrimino | null;
    private _renderer: GameRenderer;
    private _seconds: number;
    private _keys: Record<string, boolean> = {};

    constructor(private _canvas: HTMLCanvasElement) {
        this.start();
        this._canvas.width = (CELL_SIZE * COLUMNS) - PADDING;
        this._canvas.height = (CELL_SIZE * ROWS) - PADDING;
        this.attachEvents();
    }

    public get board() {
        return this._board;
    }

    public attachEvents() {
        document.addEventListener('keydown', this._keyDown);
        document.addEventListener('keyup', this._keyReleased);
    }

    public destroyEvents() {
        document.removeEventListener('keydown', this._keyDown);
        document.removeEventListener('keyup', this._keyReleased);
    }
    private _keyReleased = (ev: KeyboardEvent) => {
        this._keys[ev.key] = false;
    }

    private _keyDown = (ev: KeyboardEvent) => {

        this._keys[ev.key] = true;

        if (this._keys[' ']) {
            this.hardDrop();
        }

        if (this._keys['s'] || this._keys['ArrowDown']) {
            this.moveDown();
        }

        if (this._keys['a'] || this._keys['ArrowLeft']) {
            this.moveLeft();
        }

        if (this._keys['d'] || this._keys['ArrowRight']) {
            this.moveRight();
        }

        if (this._keys['w'] || this._keys['ArrowUp']) {
            this.rotate();
        }
        this.updateMove();
    }

    public start() {

        this._board = new GameBoard(ROWS, COLUMNS);
        this._renderer = new GameRenderer(this._canvas);
        this._seconds = 0;
        document.getElementById("textTime").textContent = `TIME: ${this._seconds}`;
        this.addTetrimino();
        this.draw();
    }

    public addTetrimino() {
        this._tetrimino = new Tetrimino();
    }

    public moveRight() {
        if (!this._tetrimino.canMoveRight(this._board)) {
            return;
        }
        this._tetrimino.right();
    }

    public moveLeft() {
        if (!this._tetrimino.canMoveLeft(this._board)) {
            return;
        }
        this._tetrimino.left();
    }

    public moveDown() {
        this._tetrimino.down();
    }

    public rotate() {
        this._tetrimino.rotate();
    }

    public isValidPos() {
        let isValid = true;
        this._tetrimino.shape.forEach((row, rowIndex) => {
            return row.forEach((value, colIndex) => {
                const y = this._tetrimino.y + rowIndex;
                const x = this._tetrimino.x + colIndex;

                const lineBelow = this._board.state[y + 1];

                if (value !== 0 && lineBelow[x] !== 0) { return isValid = false; }
            });
        });
        return isValid;
    }

    public updateMove() {

        if (!this._tetrimino.isAboveFloor() || !this.isValidPos()) {
            this._board.freeze(this._tetrimino);
            this._board.checkCompletedLines();
            this.addTetrimino();
        }
        this.draw();
    }

    public hardDrop() {
        while (this._tetrimino.isAboveFloor() && this.isValidPos()) {
            this.moveDown();
        }
        this.updateMove();
    }

    public step() {
        this.moveDown();
        this._seconds++;
        document.getElementById("textTime").textContent = `TIME: ${this._seconds}`;
        this.updateMove();
    }

    public drawGameOver() {
        this._renderer.drawGameOver();
    }

    public draw() {
        this._renderer.updateTetrimino(this._tetrimino);
        this._renderer.drawBoard(this._board);
    }

}
