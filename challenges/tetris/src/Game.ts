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
        console.log(ev.key);

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

    public get board() {
        return this._board;
    }

    public get tetrimino() {
        return this._tetrimino;
    }

    public start() {

        this._board = new GameBoard(ROWS, COLUMNS);
        this._renderer = new GameRenderer(this._canvas);
        this._seconds = 0;
        document.getElementById("textTime").textContent = `Time: ${this._seconds}`;
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
        this.tetrimino.right();
    }

    public moveLeft() {
        if (!this._tetrimino.canMoveLeft(this._board)) {
            return;
        }
        this.tetrimino.left();
    }

    public moveDown() {
        this.tetrimino.down();
    }

    public rotate() {
        this.tetrimino.rotate();
    }

    public isValidPos() {
        let isValid = true;
        this.tetrimino.shape.forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                const y = this.tetrimino.y + rowIndex;
                const x = this.tetrimino.x + colIndex;

                const lineBelow = this.board.state[y + 1];

                //  if (!lineBelow) { return isValid = false; }

                if (value !== 0 && lineBelow[x] !== 0) { return isValid = false; }

            });
        });
        return isValid;
    }

    public updateMove() {

        if (!this._tetrimino.isAboveFloor() || !this.isValidPos()) {
            this._board.freeze(this.tetrimino);
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
        document.getElementById("textTime").textContent = `Time: ${this._seconds}`;
        this.updateMove();
    }

    public drawGameOver() {
        this._renderer.drawGameOver();
    }

    public draw() {
        this._renderer.updateTetrimino(this.tetrimino);
        this._renderer.drawBoard(this.board);
    }

}
