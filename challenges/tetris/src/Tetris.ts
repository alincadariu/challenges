import { TetrisBoard } from './TetrisBoard';
import { TetrisRenderer } from './TetrisRenderer';
import { GameLoop } from './GameLoop';
import { Tetrimino } from './Tetrimino';
import { CELL_SIZE } from './constants';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 24;

const PAINT_EVENT_ID = 'paint';
const STEP_EVENT_ID = 'step';
const DROP_EVENT_ID = 'drop';

export class Tetris {
    public get isPaused() {
        return this._loop.isStopped;
    }

    public get onLineClear() {
        return this._board.onLineClear;
    };

    private _board = new TetrisBoard(BOARD_WIDTH, BOARD_HEIGHT);
    private _loop = new GameLoop();

    private _tetrimino: Tetrimino | null;
    private _renderer: TetrisRenderer;

    private _onGameOver = () => { }

    constructor(
        canvas: HTMLCanvasElement,
    ) {
        canvas.width = CELL_SIZE * BOARD_WIDTH;
        canvas.height = CELL_SIZE * BOARD_HEIGHT;
        canvas.style.setProperty('border', '5px solid #efefef');

        this._renderer = new TetrisRenderer(canvas);
        window.addEventListener('keydown', this._keyBindings);

        this._loop.addEvent({
            id: PAINT_EVENT_ID,
            fps: 120,
            action: this._painter,
        });

        this._loop.addEvent({
            id: STEP_EVENT_ID,
            fps: 1,
            action: this._step,
        });

        this._board.onGameOver(this._gameOver);
    }

    public onGameOver = (callback: () => void) =>
        this._onGameOver = callback;

    public start() {
        this._board.clear();
        this.resume();
    }

    public pause() {
        this._loop.stop();
    }

    public resume() {
        this._loop.start();
    }

    public destroy() {
        this.pause();
        this._renderer.clear();
        window.removeEventListener('keydown', this._keyBindings)
    }

    private _painter = () => {
        this._tetrimino = this._tetrimino ?? this._newTetrimino();
        this._renderer.clear();
        this._renderer.drawTetrimino(this._tetrimino);
        this._renderer.drawBoard(this._board);

        this._addToBoard();
    }

    private _addToBoard() {
        if (!this._board.isAddable(this._tetrimino)) { return; }

        this._board.addTetrimino(this._tetrimino);
        this._tetrimino = null;
    }

    private _newTetrimino = () => {
        const tetrimino = new Tetrimino();
        tetrimino.x = Math.floor(this._board.width / 2) -
            Math.floor(tetrimino.width / 2);

        return tetrimino;
    }

    private _gameOver = () => {
        this._board.onGameOver(() => {
            this._onGameOver();
            this._renderer.drawGameOver();
            this._loop.stop();
        });
    }

    private _step = () => {
        if (!this._tetrimino) { return; }

        this._tetrimino.down();
    }

    private _drop = () => {
        if (this._tetrimino) {
            this._tetrimino.down();
            this._painter();
        } else {
            this._loop.removeEvent(DROP_EVENT_ID);
            this._loop.resumeEvent(PAINT_EVENT_ID);
            this._loop.resumeEvent(STEP_EVENT_ID);
        }
    }

    private _keyBindings = (ev: KeyboardEvent) => {
        if (this.isPaused || !this._tetrimino) { return; }

        if (['ArrowUp', 'KeyW'].includes(ev.code)) {
            this._actionUp();
        }

        if (['ArrowLeft', 'KeyA'].includes(ev.code)) {
            this._actionLeft();
        }

        if (['ArrowDown', 'KeyS'].includes(ev.code)) {
            this._actionDown();
        }

        if (['ArrowRight', 'KeyD'].includes(ev.code)) {
            this._actionRight();
        }

        if (['Space'].includes(ev.code)) {
            this._actionDrop();
        }
    }

    private _actionDrop = () => {
        this._loop.pauseEvent(PAINT_EVENT_ID);
        this._loop.pauseEvent(STEP_EVENT_ID);
        this._loop.addEvent({
            id: DROP_EVENT_ID,
            action: this._drop,
            fps: 240,
        });
    }

    private _actionDown = () => {
        this._tetrimino.down();
    }

    private _actionUp = () => {
        this._tetrimino.rotate();

        while (this._board.isOverflowingRight(this._tetrimino)) {
            this._tetrimino.left()
        }
    }

    private _actionRight = () => {
        if (!this._board.isAbleToMoveRight(this._tetrimino)) { return; }

        this._tetrimino.right();
    }

    private _actionLeft = () => {
        if (!this._board.isAbleToMoveLeft(this._tetrimino)) { return; }

        this._tetrimino.left();
    }
}