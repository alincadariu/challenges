import { Tetrimino } from './Tetrimino';
import { TetriminoType } from './TetriminoType';
import { matrixForEach } from './utils';

const emptyArray = (count: number) => Array(count).fill(0);

export class TetrisBoard {
    public state: number[][] = [];

    public get isGameOver() {
        for (let x = 0; x < this.width; x++) {
            if (this.state[0][x] !== 0) { return true; }
        }

        return false;
    }

    private _onLineCleared = (_: number) => { }

    constructor(
        public readonly width: number,
        public readonly height: number,
    ) {
        this.state = Array.from({ length: this.height }, () => emptyArray(this.width));
    }

    public onLineClear = (callback: (count: number) => void) =>
        this._onLineCleared = callback;

    public isReadyToAdd(tetrimino: Tetrimino) {
        let isReady = false;
        matrixForEach(tetrimino.shape, (value, valueY, valueX) => {
            const y = tetrimino.y + valueY;
            const x = tetrimino.x + valueX;

            const lineBelow = this.state[y + 1];

            if (!lineBelow) { return isReady = true; }

            if (value !== 0 && lineBelow[x] !== 0) { return isReady = true; }
        });

        return isReady;
    }

    public addTetrimino(tetrimino: Tetrimino) {
        tetrimino.shape.forEach((line, y) => {
            line.forEach((column, x) => {
                if (column === 0) { return; }
                this.state[y + tetrimino.y][x + tetrimino.x] = TetriminoType[tetrimino.name];
            });
        });

        this._clearFilled();
    }

    public isAbleToMoveLeft(tetrimino: Tetrimino) {
        let isAllowed = true;

        const x = 0;
        for (let y = 0; y < tetrimino.height; y++) {
            if (tetrimino.shape[y][x] === 0) { continue; }

            const boardY = tetrimino.y + y;
            const boardX = tetrimino.x + x - 1;

            isAllowed = isAllowed && this.state[boardY][boardX] === 0;
        }

        return isAllowed;
    }

    public isAbleToMoveRight(tetrimino: Tetrimino) {
        if (this.isOverflowingRight(tetrimino)) { return false; }

        let isAllowed = true;

        const x = tetrimino.width - 1;
        for (let y = 0; y < tetrimino.height; y++) {
            if (tetrimino.shape[y][x] === 0) { continue; }

            const boardY = tetrimino.y + y;
            const boardX = tetrimino.x + x + 1;

            isAllowed = isAllowed && this.state[boardY][boardX] === 0;
        }

        return isAllowed;
    }

    public isOverflowingRight(tetrimino: Tetrimino) {
        return tetrimino.x + tetrimino.width > this.width;
    }

    public isOverflowingLeft(tetrimino: Tetrimino) {
        return tetrimino.x < 0;
    }

    private _clearFilled() {
        const filledRowIds = [];

        this.state.forEach((line, y) => {
            if (line.some(value => !value)) { return; }

            filledRowIds.push(y);
        });

        filledRowIds.forEach((y) => {
            this.state.splice(y, 1);
            this.state.unshift(emptyArray(this.width));
        });

        const count = filledRowIds.length;

        if (!count) { return; }

        this._onLineCleared(filledRowIds.length);
    }
}