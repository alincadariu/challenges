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
    private _isGameOver: boolean;

    constructor(private _canvas: HTMLCanvasElement) {
        this.start();
        this._canvas.width = (CELL_SIZE * COLUMNS) - PADDING;
        this._canvas.height = (CELL_SIZE * ROWS) - PADDING;
    }

    private _addTetrimino() {
        if (this.isGameOver) { return; }
        this._tetrimino = new Tetrimino();
    }

    public start() {
        this._board = new GameBoard(ROWS, COLUMNS);
        this._renderer = new GameRenderer(this._canvas);

        this.attachEvents();

        this._isGameOver = false;
        this._seconds = 0;

        document.getElementById("textTime").textContent = `TIME: ${this._seconds}`;
        document.getElementById("pauseButton").textContent = `Pause`;

        this._addTetrimino();
        this._draw();
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
        this._keys[ev.code] = false;
    }

    private _keyDown = (ev: KeyboardEvent) => {

        this._keys[ev.code] = true;

        if (this._keys['Space']) {
            this._hardDrop();
        }

        if (this._keys['KeyS'] || this._keys['ArrowDown']) {
            this._moveDown();
        }

        if (this._keys['KeyA'] || this._keys['ArrowLeft']) {
            this._moveLeft();
        }

        if (this._keys['KeyD'] || this._keys['ArrowRight']) {
            this._moveRight();
        }

        if (this._keys['KeyW'] || this._keys['ArrowUp']) {
            this._rotate();
        }
        this.updateMove();
    }

    private _moveRight() {
        if (!this._tetrimino.canMoveRight(this._board)) {
            return;
        }
        this._tetrimino.right();
    }

    private _moveLeft() {
        if (!this._tetrimino.canMoveLeft(this._board)) {
            return;
        }
        this._tetrimino.left();
    }

    private _moveDown() {
        this._tetrimino.down();
    }

    private _rotate() {
        this._tetrimino.rotated();
        if (!this._isValidPos()) {
            this._tetrimino.rotated();
        }
        while (!this._isValidPos()) {
            this._tetrimino.right();
        }
    }

    private _hardDrop() {
        while (this._tetrimino.isAboveFloor() && this._isValidPos()) {
            this._moveDown();
        }
        this.updateMove();
    }

    private _isValidPos() {
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

    public get isGameOver() {
        return this._isGameOver;
    }

    public checkGameOver() {
        this._isGameOver = this._tetrimino.y === 0;
    }

    public updateMove() {

        if (!this._tetrimino.isAboveFloor() || !this._isValidPos()) {
            this._board.freeze(this._tetrimino);
            this._board.checkCompletedLines();
            this.checkGameOver();
            this._addTetrimino();
        }
        this._draw();
    }

    public step() {
        this._moveDown();
        this.updateMove();
        this._seconds++;
        document.getElementById("textTime").textContent = `TIME: ${this._seconds}`;
    }

    public drawGameOver() {
        this._renderer.drawGameOver();
    }

    private _draw() {
        this._renderer.updateTetrimino(this._tetrimino);
        this._renderer.drawBoard(this._board);
    }

}
