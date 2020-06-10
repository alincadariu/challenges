import { TetrisBoard } from './TetrisBoard';
import { TetrisRenderer } from './TetrisRenderer';
import { GameLoop } from './GameLoop';
import { Tetrimino } from './Tetrimino';
import { CELL_SIZE } from './constants';

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 30;

export class Tetris {
    public get isPaused() {
        return this._loop.isStopped;
    }

    private _board = new TetrisBoard(BOARD_WIDTH, BOARD_HEIGHT);
    private _loop = new GameLoop();

    private _tetrimino: Tetrimino;
    private _renderer: TetrisRenderer;

    constructor(
        canvas: HTMLCanvasElement,
    ) {
        canvas.width = CELL_SIZE * BOARD_WIDTH;
        canvas.height = CELL_SIZE * BOARD_HEIGHT;
        canvas.style.setProperty('border', '5px solid #efefef');

        this._renderer = new TetrisRenderer(canvas);
        window.addEventListener('keydown', this._keyBindings);

        this._loop.addEvent({
            id: 'painter',
            fps: 120,
            action: this._painter,
        });

        this._loop.addEvent({
            id: 'stepper',
            fps: 1,
            action: this._step,
        });
    }

    public start() {
        this._tetrimino = new Tetrimino();
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
        this._renderer.clear();
        this._renderer.drawTetrimino(this._tetrimino);
        this._renderer.drawBoard(this._board);

        if (this._board.isReadyToAdd(this._tetrimino)) {
            this._board.addTetrimino(this._tetrimino);

            if (this._board.isGameOver) {
                this._loop.stop();
                return;
            }

            this._tetrimino = new Tetrimino();
        }
    }

    private _step = () => {
        this._tetrimino.down(this._board.height);
    }

    private _keyBindings = (ev: KeyboardEvent) => {
        if (this.isPaused) { return; }

        // FIXME: remove once properly clamping left / right movements 😛
        const isReadyToAdd = this._board.isReadyToAdd(this._tetrimino);

        switch (ev.key) {
            case 'ArrowLeft':
                this._tetrimino.left(0);
                // FIXME: do a proper check (eg: determine the correct left limit given the current position)
                if (!isReadyToAdd && this._board.isReadyToAdd(this._tetrimino)) {
                    this._tetrimino.right(this._board.width);
                }
                break;
            case 'ArrowRight':
                this._tetrimino.right(this._board.width);
                // FIXME: do a proper check (eg: determine the correct right limit given the current position)
                if (!isReadyToAdd && this._board.isReadyToAdd(this._tetrimino)) {
                    this._tetrimino.left(0);
                }
                break;
            case 'ArrowDown':
                this._tetrimino.down(this._board.height);
                break;
            case 'ArrowUp':
                // FIXME: can overflow when at the right extremity, check board when rotating and shift if needed
                this._tetrimino.rotate();
                break;
            default: break;
        }
    }
}