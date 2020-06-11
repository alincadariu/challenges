import { TetrisBoard } from './TetrisBoard';
import { TetrisRenderer } from './TetrisRenderer';
import { GameLoop } from './GameLoop';
import { Tetrimino } from './Tetrimino';
import { CELL_SIZE } from './constants';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 24;

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
        this._tetrimino.down();
    }

    private _keyBindings = (ev: KeyboardEvent) => {
        if (this.isPaused) { return; }

        switch (ev.key) {
            case 'ArrowLeft':
                if (this._board.isAbleToMoveLeft(this._tetrimino)) {
                    this._tetrimino.left();
                }
                break;
            case 'ArrowRight':
                if (this._board.isAbleToMoveRight(this._tetrimino)) {
                    this._tetrimino.right();
                }
                break;
            case 'ArrowDown':
                this._tetrimino.down();
                break;
            case 'ArrowUp':
                this._tetrimino.rotate();
                while (this._board.isOverflowingRight(this._tetrimino)) {
                    this._tetrimino.left()
                }
                break;
            default: break;
        }
    }
}