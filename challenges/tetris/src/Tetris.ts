import { TetrisBoard } from './TetrisBoard';
import { TetrisRenderer } from './TetrisRenderer';
import { GameLoop } from './GameLoop';
import { Tetrimino } from './Tetrimino';
import {
    isOverlapping,
    isFreeToMoveRight,
    isOverflowingRight,
    isReadyToMerge,
    isFreeToMoveLeft,
} from './utils';
import {
    BOARD_WIDTH,
    BOARD_HEIGHT,
    PREVIEW_WIDTH,
    PREVIEW_HEIGHT,
} from './constants';

const PAINT_EVENT_ID = 'paint';
const STEP_EVENT_ID = 'step';
const DROP_EVENT_ID = 'drop';

export class Tetris {
    public get isPaused() {
        return this._loop.isStopped;
    }

    public set cellSize(cellSize) {
        const previewCellSize = cellSize / 2;
        this._next.width = previewCellSize * PREVIEW_WIDTH;
        this._next.height = previewCellSize * PREVIEW_HEIGHT;
        this._next.style.width = `${this._next.width}px`;
        this._next.style.height = `${this._next.height}px`;
        this._nextRenderer.cellSize = previewCellSize;

        this._canvas.width = cellSize * BOARD_WIDTH;
        this._canvas.height = cellSize * BOARD_HEIGHT;
        this._canvas.style.width = `${this._canvas.width}px`;
        this._canvas.style.height = `${this._canvas.height}px`;
        this._renderer.cellSize = cellSize;

        if (this._tetrimino) {
            this._drawNextTetrimino();
        }
    }

    private _board = new TetrisBoard(BOARD_WIDTH, BOARD_HEIGHT);
    private _loop = new GameLoop();

    private _tetrimino: Tetrimino | null;
    private _nextTetrimino = new Tetrimino();
    private _renderer: TetrisRenderer;
    private _nextRenderer: TetrisRenderer;

    constructor(
        private _canvas: HTMLCanvasElement,
        private _next: HTMLCanvasElement,
    ) {
        this._canvas.style.setProperty('border', '5px solid #efefef');
        this._next.style.setProperty('border', '5px solid #efefef');

        this._renderer = new TetrisRenderer(this._canvas);
        this._nextRenderer = new TetrisRenderer(this._next);
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
    }

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
        this._tetrimino = this._tetrimino ?? this._getNextTetrimino();

        this._renderer.clear();
        this._renderer.drawTetrimino(this._tetrimino);
        this._renderer.drawBoard(this._board);

        const preview = this._tetrimino.clone();
        while (!isReadyToMerge(preview, this._board)) {
            preview.down();
        }
        this._renderer.drawPreview(preview);

        this._addToBoard();
    }

    private _addToBoard() {
        if (!isReadyToMerge(this._tetrimino, this._board)) { return; }

        this._board.merge(this._tetrimino);
        const count = this._board.clearFilledRows();

        if (count) {
            this._canvas.dispatchEvent(new CustomEvent('linebreak', {
                detail: {
                    count,
                }
            }));
        }

        if (this._board.isGameOver) {
            this._canvas.dispatchEvent(new CustomEvent('gameover'));
            this._renderer.drawGameOver();
            this._loop.stop();
        }
        this._tetrimino = null;
    }

    private _getNextTetrimino = () => {
        const tetrimino = this._nextTetrimino;
        tetrimino.x = Math.floor(this._board.width / 2) -
            Math.floor(tetrimino.width / 2);
        tetrimino.y = 0;

        this._nextTetrimino = new Tetrimino();
        this._nextTetrimino.x = PREVIEW_WIDTH / 2 - this._nextTetrimino.width / 2;
        this._nextTetrimino.y = PREVIEW_HEIGHT / 2 - this._nextTetrimino.height / 2;

        this._drawNextTetrimino();

        return tetrimino;
    }

    private _drawNextTetrimino = () => {
        this._nextRenderer.clear();
        this._nextRenderer.drawTetrimino(this._nextTetrimino);
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

        let leftAdjustment = 0;
        while (isOverflowingRight(this._tetrimino, this._board)) {
            this._tetrimino.left()
            leftAdjustment++;
        }

        if (isOverlapping(this._tetrimino, this._board)) {
            this._tetrimino.rotate(-90);
            while (leftAdjustment-- > 0) {
                this._tetrimino.right();
            }
        }
    }

    private _actionRight = () => {
        if (!isFreeToMoveRight(this._tetrimino, this._board)) { return; }

        this._tetrimino.right();
    }

    private _actionLeft = () => {
        if (!isFreeToMoveLeft(this._tetrimino, this._board)) { return; }

        this._tetrimino.left();
    }
}