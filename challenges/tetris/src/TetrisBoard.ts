import { Tetrimino } from './Tetrimino';
import { TetriminoType } from './TetriminoType';

const emptyArray = (count: number) => Array(count).fill(0);

export class TetrisBoard {
    public state: number[][] = [];

    public get isGameOver() {
        for (let x = 0; x < this.width; x++) {
            if (this.state[0][x] !== 0) { return true; }
        }

        return false;
    }

    constructor(
        public readonly width: number,
        public readonly height: number,
    ) {
        this.clear();
    }

    public clear() {
        this.state = Array.from({ length: this.height }, () => emptyArray(this.width));
    }

    public merge(tetrimino: Tetrimino) {
        tetrimino.shape.forEach((line, y) => {
            line.forEach((column, x) => {
                if (column === 0) { return; }
                this.state[y + tetrimino.y][x + tetrimino.x] = TetriminoType[tetrimino.name];
            });
        });
    }

    public clearFilledRows() {
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

        return count;
    }
}